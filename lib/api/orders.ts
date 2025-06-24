import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
type OrderStatus = "pending" | "preparing" | "ready" | "served" | "cancelled";

type OrderWithItems = Order & {
  order_items: (OrderItem & {
    menu_items: {
      id: string;
      name: string;
      price: number;
    };
  })[];
  tables: {
    id: string;
    table_number: number;
  };
};

export async function createOrder(orderData: {
  table_id: string;
  customer_name?: string;
  items: Array<{
    menu_item_id: string;
    quantity: number;
    unit_price: number;
    notes?: string;
  }>;
}): Promise<{ order: Order; items: OrderItem[] }> {
  const supabase = createClient();

  // Calculate total
  const total_amount = orderData.items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  );

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      table_id: orderData.table_id,
      customer_name: orderData.customer_name,
      total_amount,
      status: "pending",
    })
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }

  // Create order items
  const orderItems = orderData.items.map((item) => ({
    ...item,
    order_id: order.id,
  }));

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    throw itemsError;
  }

  // Update table status to occupied
  await supabase
    .from("tables")
    .update({ status: "occupied" })
    .eq("id", orderData.table_id);

  return { order, items };
}

export async function getOrders(): Promise<OrderWithItems[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        menu_items (
          id,
          name,
          price
        )
      ),
      tables (
        id,
        table_number
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  return data as OrderWithItems[];
}

export async function getOrdersByStatus(
  status: OrderStatus
): Promise<OrderWithItems[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        menu_items (
          id,
          name,
          price
        )
      ),
      tables (
        id,
        table_number
      )
    `
    )
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders by status:", error);
    throw error;
  }

  return data as OrderWithItems[];
}

export async function getOrdersByTable(
  tableId: string
): Promise<OrderWithItems[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        menu_items (
          id,
          name,
          price
        )
      ),
      tables (
        id,
        table_number
      )
    `
    )
    .eq("table_id", tableId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders by table:", error);
    throw error;
  }

  return data as OrderWithItems[];
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<Order> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error("Error updating order status:", error);
    throw error;
  }

  // If order is served, make table available
  if (status === "served") {
    await supabase
      .from("tables")
      .update({ status: "available" })
      .eq("id", data.table_id);
  }

  return data;
}

export async function getOrderStats(): Promise<{
  total: number;
  pending: number;
  preparing: number;
  ready: number;
  served: number;
  cancelled: number;
  todayRevenue: number;
}> {
  const supabase = createClient();

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("orders")
    .select("status, total_amount, created_at")
    .gte("created_at", today);

  if (error) {
    console.error("Error fetching order stats:", error);
    throw error;
  }

  const stats = {
    total: data.length,
    pending: 0,
    preparing: 0,
    ready: 0,
    served: 0,
    cancelled: 0,
    todayRevenue: 0,
  };

  data.forEach((order) => {
    stats[order.status as keyof typeof stats]++;
    if (order.status === "served") {
      stats.todayRevenue += Number(order.total_amount);
    }
  });

  return stats;
}

export async function deleteOrder(orderId: string): Promise<void> {
  const supabase = createClient();

  // Get order details first
  const { data: order } = await supabase
    .from("orders")
    .select("table_id")
    .eq("id", orderId)
    .single();

  // Delete order (order_items will be deleted automatically due to CASCADE)
  const { error } = await supabase.from("orders").delete().eq("id", orderId);

  if (error) {
    console.error("Error deleting order:", error);
    throw error;
  }

  // Make table available if it was the only order
  if (order) {
    const { data: remainingOrders } = await supabase
      .from("orders")
      .select("id")
      .eq("table_id", order.table_id)
      .in("status", ["pending", "preparing", "ready"]);

    if (!remainingOrders || remainingOrders.length === 0) {
      await supabase
        .from("tables")
        .update({ status: "available" })
        .eq("id", order.table_id);
    }
  }
}
