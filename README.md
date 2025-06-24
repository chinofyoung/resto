# RestoPOS - Restaurant Point of Sale System

A modern, full-featured restaurant POS system built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### Core Functionality

- **Dashboard**: Table management, popular items overview, and restaurant statistics
- **Orders**: Complete ordering system with menu browsing, cart management, and kitchen orders
- **Menu Management**: Full CRUD operations for menu items with categories, pricing, and availability
- **Inventory**: Stock management with low-stock alerts and supplier tracking
- **Settings**: Restaurant configuration, theme customization, and system preferences

### Technical Features

- **Real-time Database**: Powered by Supabase PostgreSQL
- **Type Safety**: Full TypeScript implementation with generated database types
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Theme System**: Dynamic color customization with CSS custom properties
- **Performance**: Optimized with Next.js App Router and parallel data fetching

## 🏗️ Architecture

```
resto/
├── app/                    # Next.js App Router pages
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React contexts (Theme, etc.)
│   ├── dashboard/         # Dashboard page
│   ├── orders/           # Order management
│   ├── menu/             # Menu management
│   ├── inventory/        # Inventory tracking
│   └── settings/         # App settings
├── lib/                   # Utilities and API functions
│   ├── supabase/         # Supabase client configurations
│   ├── api/              # Database API functions
│   └── database.types.ts  # TypeScript database types
├── supabase/             # Database schema and migrations
└── components/           # Shared components
```

## 🗄️ Database Schema

### Tables

- **restaurants**: Restaurant information and settings
- **categories**: Menu categories (Appetizers, Main Courses, etc.)
- **menu_items**: Menu items with pricing, images, nutritional info
- **tables**: Restaurant table management with real-time status
- **orders**: Customer orders with status tracking
- **order_items**: Individual items within orders
- **inventory_items**: Stock management with supplier tracking

### Key Features

- UUID primary keys for scalability
- Foreign key relationships for data integrity
- Automatic timestamps for audit trails
- Enums for type-safe status values
- Optimized indexes for performance
- Row Level Security ready for authentication

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd resto
npm install
```

### 2. Set Up Supabase

1. **Create a Supabase Project**

   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for setup to complete

2. **Run the Database Schema**

   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `supabase/schema.sql`
   - Execute the SQL to create tables and sample data

3. **Configure Environment Variables**
   - Copy your Project URL and anon key from Settings > API
   - Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your restaurant POS system!

## 📊 API Usage Examples

### Fetching Menu Items

```typescript
import { getMenuItems, getMenuItemsByCategory } from "@/lib/api/menu";

// Get all available menu items with categories
const menuItems = await getMenuItems();

// Get items by specific category
const appetizers = await getMenuItemsByCategory(categoryId);
```

### Managing Tables

```typescript
import { getTables, updateTableStatus } from "@/lib/api/tables";

// Get all tables
const tables = await getTables();

// Update table status
await updateTableStatus(tableId, "occupied");
```

### Creating Orders

```typescript
import { createOrder } from "@/lib/api/orders";

const order = await createOrder({
  table_id: "table-uuid",
  customer_name: "John Doe",
  items: [
    {
      menu_item_id: "item-uuid",
      quantity: 2,
      unit_price: 15.99,
      notes: "No onions",
    },
  ],
});
```

### Inventory Management

```typescript
import { getInventoryItems, getLowStockItems } from "@/lib/api/inventory";

// Get all inventory
const inventory = await getInventoryItems();

// Get items that need restocking
const lowStock = await getLowStockItems();
```

## 🎨 Theme Customization

The app includes a powerful theme system that allows real-time color customization:

```typescript
// Use the theme context
import { useTheme } from "@/app/contexts/ThemeContext";

const { updateColors } = useTheme();

// Update theme colors
updateColors({
  primary: "#10b981", // Emerald
  secondary: "#f59e0b", // Amber
  accent: "#8b5cf6", // Violet
});
```

## 🔄 Real-time Features

Supabase enables real-time subscriptions for live updates:

```typescript
const supabase = createClient();

// Subscribe to order changes
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
      // Handle real-time updates
      console.log("Order updated:", payload);
    }
  )
  .subscribe();
```

## 🧪 Testing the Integration

Visit `/supabase-demo` to see a comprehensive demo of all database features:

- Real-time table status
- Menu item management
- Inventory tracking
- Order statistics
- Error handling examples

## 📱 Pages Overview

### `/` - Login Page

- Modern authentication UI
- Loading states and validation
- Redirects to dashboard after login

### `/dashboard` - Main Dashboard

- Table selection and status overview
- Popular menu items display
- Restaurant statistics
- Quick navigation to other sections

### `/orders` - Order Management

- Table selection interface
- Menu browsing with categories
- Shopping cart with real-time totals
- Order submission to kitchen

### `/menu` - Menu Management

- Complete CRUD operations for menu items
- Category filtering and organization
- Image upload and management
- Nutritional information tracking

### `/inventory` - Inventory Control

- Stock level monitoring
- Low stock alerts
- Supplier management
- Category-based organization

### `/settings` - Configuration

- Restaurant information
- Theme customization
- System preferences
- User management (future)

## 🔐 Security & Production

### Row Level Security

The database is configured with RLS policies. For production:

```sql
-- Example: Restrict access to authenticated users
CREATE POLICY "Authenticated users only"
ON orders FOR ALL
USING (auth.role() = 'authenticated');
```

### Environment Variables

Keep your Supabase credentials secure:

- Never commit `.env.local` to version control
- Use different projects for development/production
- Rotate keys regularly

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Other Platforms

The app works on any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📈 Performance Optimization

### Database

- Indexes are pre-configured for common queries
- Use `.select()` to fetch only needed columns
- Implement pagination for large datasets
- Cache frequently accessed data

### Frontend

- Images are optimized with Next.js Image component
- Components use React.memo where appropriate
- API calls are batched using Promise.all
- Loading states improve perceived performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**RestoPOS** - Elevating restaurant management with modern technology 🍽️✨
