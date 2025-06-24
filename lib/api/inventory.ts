import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

type InventoryItem = Database["public"]["Tables"]["inventory_items"]["Row"];
type InventoryCategory = "ingredients" | "beverages" | "supplies" | "equipment";

export async function getInventoryItems(): Promise<InventoryItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching inventory items:", error);
    throw error;
  }

  return data;
}

export async function getInventoryItemsByCategory(
  category: InventoryCategory
): Promise<InventoryItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .eq("category", category)
    .order("name");

  if (error) {
    console.error("Error fetching inventory items by category:", error);
    throw error;
  }

  return data;
}

export async function getLowStockItems(): Promise<InventoryItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .filter("current_stock", "lte", "min_stock")
    .order("current_stock");

  if (error) {
    console.error("Error fetching low stock items:", error);
    throw error;
  }

  return data;
}

export async function getOutOfStockItems(): Promise<InventoryItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .eq("current_stock", 0)
    .order("name");

  if (error) {
    console.error("Error fetching out of stock items:", error);
    throw error;
  }

  return data;
}

export async function updateStock(
  itemId: string,
  newStock: number
): Promise<InventoryItem> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .update({
      current_stock: newStock,
      last_restocked: new Date().toISOString(),
    })
    .eq("id", itemId)
    .select()
    .single();

  if (error) {
    console.error("Error updating stock:", error);
    throw error;
  }

  return data;
}

export async function createInventoryItem(
  item: Database["public"]["Tables"]["inventory_items"]["Insert"]
): Promise<InventoryItem> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error("Error creating inventory item:", error);
    throw error;
  }

  return data;
}

export async function updateInventoryItem(
  id: string,
  updates: Database["public"]["Tables"]["inventory_items"]["Update"]
): Promise<InventoryItem> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating inventory item:", error);
    throw error;
  }

  return data;
}

export async function deleteInventoryItem(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("inventory_items")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting inventory item:", error);
    throw error;
  }
}

export async function getInventoryStats(): Promise<{
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number;
  categories: {
    ingredients: number;
    beverages: number;
    supplies: number;
    equipment: number;
  };
}> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("category, current_stock, min_stock, unit_price");

  if (error) {
    console.error("Error fetching inventory stats:", error);
    throw error;
  }

  const stats = {
    totalItems: data.length,
    lowStockItems: 0,
    outOfStockItems: 0,
    totalValue: 0,
    categories: {
      ingredients: 0,
      beverages: 0,
      supplies: 0,
      equipment: 0,
    },
  };

  data.forEach((item) => {
    // Count items by category
    stats.categories[item.category as keyof typeof stats.categories]++;

    // Count low/out of stock
    if (item.current_stock === 0) {
      stats.outOfStockItems++;
    } else if (item.current_stock <= item.min_stock) {
      stats.lowStockItems++;
    }

    // Calculate total value
    stats.totalValue += Number(item.current_stock) * Number(item.unit_price);
  });

  return stats;
}

export async function searchInventoryItems(
  query: string
): Promise<InventoryItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .or(
      `name.ilike.%${query}%, description.ilike.%${query}%, supplier.ilike.%${query}%`
    )
    .order("name");

  if (error) {
    console.error("Error searching inventory items:", error);
    throw error;
  }

  return data;
}
