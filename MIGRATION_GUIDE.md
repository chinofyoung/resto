# 🚀 Supabase Migration Guide

This guide will help you set up Supabase and migrate your static data to a real database.

## 📋 Prerequisites

- Node.js and npm installed
- A Supabase account (free tier available)

## 🎯 Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign up/Login** with GitHub or email
3. **Click "New Project"**
4. **Fill in project details:**
   - **Name**: `restopos` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
5. **Click "Create new project"**
6. **Wait for setup** (takes ~2 minutes)

## 🗄️ Step 2: Set Up Database Schema

1. **Go to SQL Editor** in your Supabase dashboard
2. **Copy the entire contents** of `supabase/schema.sql`
3. **Paste it** into the SQL Editor
4. **Click "Run"** to execute the schema

This creates all tables, relationships, and sample data structure.

## 🔑 Step 3: Configure Environment Variables

1. **In Supabase dashboard**, go to **Settings** → **API**
2. **Copy your credentials:**
   - Project URL
   - anon/public key
3. **Create `.env.local`** in your project root:

```env
# Replace with your actual values
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

## 📊 Step 4: Run Data Migration

Run the migration script to transfer your static data:

```bash
npm run migrate
```

This will:

- ✅ Test your Supabase connection
- 🧹 Clear existing data (if any)
- 📂 Insert categories (Appetizers, Main Courses, etc.)
- 🪑 Insert tables (12 tables with different statuses)
- 🍽️ Insert menu items (6 items with images and details)
- 📦 Insert inventory items (8 items with stock levels)

## ✅ Step 5: Test the Connection

1. **Start your app:**

   ```bash
   npm run dev
   ```

2. **Visit the demo page:**

   ```
   http://localhost:3000/supabase-demo
   ```

3. **You should see:**
   - Connected to Supabase ✅
   - List of tables from database
   - List of menu items from database

## 🔄 Step 6: Update Your Components

Now update your pages to use the database instead of static data:

### Dashboard Page

```typescript
// Replace static tables array with:
import { getTables } from "@/lib/api/tables";

// In component:
const [tables, setTables] = useState([]);

useEffect(() => {
  async function loadTables() {
    try {
      const data = await getTables();
      setTables(data);
    } catch (error) {
      console.error("Error loading tables:", error);
    }
  }
  loadTables();
}, []);
```

### Menu Page

```typescript
// Replace static menuItems array with:
import { getMenuItems } from "@/lib/api/menu";

// In component:
const [menuItems, setMenuItems] = useState([]);

useEffect(() => {
  async function loadMenuItems() {
    try {
      const data = await getMenuItems();
      setMenuItems(data);
    } catch (error) {
      console.error("Error loading menu items:", error);
    }
  }
  loadMenuItems();
}, []);
```

### Inventory Page

```typescript
// Replace static inventoryItems array with:
import { getInventoryItems } from "@/lib/api/inventory";

// In component:
const [inventoryItems, setInventoryItems] = useState([]);

useEffect(() => {
  async function loadInventoryItems() {
    try {
      const data = await getInventoryItems();
      setInventoryItems(data);
    } catch (error) {
      console.error("Error loading inventory:", error);
    }
  }
  loadInventoryItems();
}, []);
```

## 🛠️ Available API Functions

Your app already includes these API functions:

### Menu API (`lib/api/menu.ts`)

- `getMenuItems()` - Get all menu items
- `getMenuItemsByCategory(categoryId)` - Filter by category
- `getPopularItems()` - Get popular items only
- `createMenuItem(item)` - Add new menu item
- `updateMenuItem(id, updates)` - Update existing item
- `deleteMenuItem(id)` - Remove menu item

### Tables API (`lib/api/tables.ts`)

- `getTables()` - Get all tables
- `updateTableStatus(id, status)` - Update table status
- `getTableStats()` - Get occupancy statistics

### Orders API (`lib/api/orders.ts`)

- `createOrder(orderData)` - Create new order
- `getOrders()` - Get all orders
- `updateOrderStatus(id, status)` - Update order status
- `getTodaysRevenue()` - Get daily revenue stats

### Inventory API (`lib/api/inventory.ts`)

- `getInventoryItems()` - Get all inventory
- `getLowStockItems()` - Get items with low stock
- `updateInventoryItem(id, updates)` - Update stock levels
- `searchInventoryItems(query)` - Search inventory

## 🎉 What You Get

After migration, your app will have:

- **Real Database**: PostgreSQL hosted by Supabase
- **Live Data**: No more static arrays
- **CRUD Operations**: Add, edit, delete functionality
- **Relationships**: Proper foreign keys between tables
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized queries with indexes
- **Scalability**: Ready for production use

## 🔧 Troubleshooting

### Migration Fails

- Check your `.env.local` file has correct values
- Ensure database schema was created successfully
- Verify network connection to Supabase

### Connection Issues

- Double-check your Supabase URL and key
- Make sure they're in `.env.local` (not `.env`)
- Restart your dev server after adding env vars

### Data Not Showing

- Check browser console for errors
- Verify API functions are imported correctly
- Test connection at `/supabase-demo`

## 📚 Next Steps

1. **Remove static data** from your components
2. **Add loading states** for better UX
3. **Implement error handling** for API calls
4. **Add authentication** (Supabase Auth)
5. **Set up Row Level Security** for production

## 🆘 Need Help?

- Check the `/supabase-demo` page for connection testing
- Review `SUPABASE_SETUP.md` for detailed API examples
- Visit [Supabase Documentation](https://supabase.com/docs)

---

**Ready to migrate?** Run `npm run migrate` and transform your app! 🚀
