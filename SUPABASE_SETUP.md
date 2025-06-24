# Supabase Setup Guide for RestoPOS

This guide will help you set up Supabase as the database backend for your restaurant POS system.

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/Login with GitHub
4. Click "New Project"
5. Choose your organization
6. Fill in project details:
   - **Name**: `restopos` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your location
7. Click "Create new project"

### 2. Set Up Your Database

1. Wait for your project to finish setting up
2. Go to the **SQL Editor** in your Supabase dashboard
3. Copy the entire contents of `supabase/schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the schema

This will create all tables, relationships, indexes, and sample data.

### 3. Configure Environment Variables

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Test the Connection

Run your Next.js application:

```bash
npm run dev
```

The app should now connect to your Supabase database!

## 📊 Database Schema Overview

### Core Tables

- **restaurants**: Restaurant information and settings
- **categories**: Menu categories (Appetizers, Main Courses, etc.)
- **menu_items**: All menu items with pricing, images, and details
- **tables**: Restaurant table management with status tracking
- **orders**: Customer orders with status and totals
- **order_items**: Individual items within orders
- **inventory_items**: Stock management and supplier tracking

### Key Features

- ✅ **UUID Primary Keys**: Scalable and secure
- ✅ **Automatic Timestamps**: Created/updated tracking
- ✅ **Foreign Key Relationships**: Data integrity
- ✅ **Enums for Status**: Type-safe status values
- ✅ **Indexes**: Optimized for common queries
- ✅ **Row Level Security**: Ready for authentication
- ✅ **Sample Data**: Pre-populated for testing

## 🔧 API Integration Examples

### Fetching Menu Items

```typescript
// lib/api/menu.ts
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

export async function getMenuItems() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select(
      `
      *,
      categories (
        id,
        name,
        description
      )
    `
    )
    .eq("is_available", true)
    .order("name");

  if (error) throw error;
  return data;
}

export async function getMenuItemsByCategory(categoryId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_available", true)
    .order("name");

  if (error) throw error;
  return data;
}
```

### Managing Tables

```typescript
// lib/api/tables.ts
import { createClient } from "@/lib/supabase/client";

export async function getTables() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tables")
    .select("*")
    .order("table_number");

  if (error) throw error;
  return data;
}

export async function updateTableStatus(
  tableId: string,
  status: "available" | "occupied" | "reserved" | "cleaning"
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tables")
    .update({ status })
    .eq("id", tableId)
    .select();

  if (error) throw error;
  return data;
}
```

### Creating Orders

```typescript
// lib/api/orders.ts
import { createClient } from "@/lib/supabase/client";

export async function createOrder(orderData: {
  table_id: string;
  customer_name?: string;
  items: Array<{
    menu_item_id: string;
    quantity: number;
    unit_price: number;
    notes?: string;
  }>;
}) {
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

  if (orderError) throw orderError;

  // Create order items
  const orderItems = orderData.items.map((item) => ({
    ...item,
    order_id: order.id,
  }));

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();

  if (itemsError) throw itemsError;

  return { order, items };
}
```

### Inventory Management

```typescript
// lib/api/inventory.ts
import { createClient } from "@/lib/supabase/client";

export async function getInventoryItems() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .order("name");

  if (error) throw error;
  return data;
}

export async function getLowStockItems() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .select("*")
    .filter("current_stock", "lte", "min_stock")
    .order("current_stock");

  if (error) throw error;
  return data;
}

export async function updateStock(itemId: string, newStock: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inventory_items")
    .update({
      current_stock: newStock,
      last_restocked: new Date().toISOString(),
    })
    .eq("id", itemId)
    .select();

  if (error) throw error;
  return data;
}
```

## 🔄 Real-time Features

Supabase supports real-time subscriptions for live updates:

```typescript
// Real-time order updates
const supabase = createClient();

const subscription = supabase
  .channel("orders")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "orders",
    },
    (payload) => {
      console.log("Order updated:", payload);
      // Update your UI here
    }
  )
  .subscribe();

// Don't forget to unsubscribe
// subscription.unsubscribe()
```

## 🔐 Security & Authentication

The database is set up with Row Level Security (RLS) enabled. For production:

1. **Add Authentication**: Use Supabase Auth for user management
2. **Update Policies**: Restrict access based on user roles
3. **Environment Variables**: Keep your keys secure

Example policy for restaurant staff:

```sql
-- Only allow authenticated users to manage orders
CREATE POLICY "Authenticated users can manage orders"
ON orders FOR ALL
USING (auth.role() = 'authenticated');
```

## 📈 Performance Tips

1. **Use Indexes**: Already created for common queries
2. **Limit Results**: Use `.limit()` for large datasets
3. **Select Specific Columns**: Don't use `select('*')` in production
4. **Use Joins**: Fetch related data in single queries
5. **Cache Results**: Implement caching for frequently accessed data

## 🚀 Next Steps

1. **Integrate API calls** into your existing components
2. **Add real-time subscriptions** for live order updates
3. **Implement authentication** for user management
4. **Set up backup policies** for data protection
5. **Monitor performance** with Supabase analytics

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Integration Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [TypeScript Support](https://supabase.com/docs/guides/api/generating-types)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

Your restaurant POS system is now powered by a scalable, real-time database! 🎉
