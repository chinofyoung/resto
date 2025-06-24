import { createClient } from "@supabase/supabase-js";
import { Database } from "../lib/database.types";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// This script migrates your static data to Supabase
// Make sure to set your environment variables in .env.local first

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error("Please create .env.local with:");
  console.error("NEXT_PUBLIC_SUPABASE_URL=your_project_url");
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key");
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Static data from your current app
const staticData = {
  categories: [
    { name: "Appetizers", description: "Starters and small plates" },
    { name: "Main Courses", description: "Main dishes and entrees" },
    { name: "Desserts", description: "Sweet treats and desserts" },
    { name: "Beverages", description: "Drinks and refreshments" },
    { name: "Alcohol", description: "Alcoholic beverages" },
  ],

  tables: [
    { table_number: 1, seats: 2, status: "available" as const },
    { table_number: 2, seats: 4, status: "occupied" as const },
    { table_number: 3, seats: 2, status: "available" as const },
    { table_number: 4, seats: 6, status: "reserved" as const },
    { table_number: 5, seats: 4, status: "occupied" as const },
    { table_number: 6, seats: 2, status: "available" as const },
    { table_number: 7, seats: 8, status: "available" as const },
    { table_number: 8, seats: 4, status: "occupied" as const },
    { table_number: 9, seats: 2, status: "available" as const },
    { table_number: 10, seats: 4, status: "cleaning" as const },
    { table_number: 11, seats: 2, status: "available" as const },
    { table_number: 12, seats: 6, status: "available" as const },
  ],

  menuItems: [
    {
      name: "Grilled Salmon",
      description:
        "Fresh Atlantic salmon with lemon herb butter, served with roasted vegetables",
      price: 24.99,
      category: "Main Courses",
      image_url:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
      prep_time: 25,
      is_popular: true,
      is_available: true,
      ingredients: ["salmon", "lemon", "herbs", "butter", "vegetables"],
      calories: 450,
      spice_level: 0,
    },
    {
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil",
      price: 16.99,
      category: "Main Courses",
      image_url:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop",
      prep_time: 18,
      is_popular: true,
      is_available: true,
      ingredients: ["pizza dough", "mozzarella", "tomato sauce", "basil"],
      calories: 320,
      spice_level: 0,
    },
    {
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce with parmesan cheese, croutons, and Caesar dressing",
      price: 12.99,
      category: "Appetizers",
      image_url:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
      prep_time: 8,
      is_popular: false,
      is_available: true,
      ingredients: [
        "romaine lettuce",
        "parmesan",
        "croutons",
        "caesar dressing",
      ],
      calories: 280,
      spice_level: 0,
    },
    {
      name: "Chocolate Lava Cake",
      description:
        "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 8.99,
      category: "Desserts",
      image_url:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop",
      prep_time: 12,
      is_popular: true,
      is_available: true,
      ingredients: [
        "chocolate",
        "flour",
        "eggs",
        "butter",
        "vanilla ice cream",
      ],
      calories: 520,
      spice_level: 0,
    },
    {
      name: "Craft Beer IPA",
      description: "Local brewery India Pale Ale with citrus notes",
      price: 6.99,
      category: "Alcohol",
      image_url:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=200&fit=crop",
      prep_time: 2,
      is_popular: false,
      is_available: true,
      ingredients: ["hops", "malt", "yeast", "water"],
      calories: 180,
      spice_level: 0,
    },
    {
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 4.99,
      category: "Beverages",
      image_url:
        "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop",
      prep_time: 3,
      is_popular: false,
      is_available: true,
      ingredients: ["fresh oranges"],
      calories: 120,
      spice_level: 0,
    },
  ],

  inventoryItems: [
    {
      name: "Chicken Breast",
      description: "Fresh chicken breast fillets",
      category: "ingredients" as const,
      current_stock: 25,
      min_stock: 10,
      max_stock: 50,
      unit: "lbs",
      unit_price: 6.99,
      supplier: "Fresh Foods Co",
    },
    {
      name: "Tomatoes",
      description: "Fresh Roma tomatoes",
      category: "ingredients" as const,
      current_stock: 8,
      min_stock: 15,
      max_stock: 40,
      unit: "lbs",
      unit_price: 2.99,
      supplier: "Farm Fresh",
    },
    {
      name: "Mozzarella Cheese",
      description: "Fresh mozzarella cheese",
      category: "ingredients" as const,
      current_stock: 0,
      min_stock: 5,
      max_stock: 20,
      unit: "lbs",
      unit_price: 8.99,
      supplier: "Dairy Direct",
    },
    {
      name: "Coca Cola",
      description: "Coca Cola bottles",
      category: "beverages" as const,
      current_stock: 120,
      min_stock: 50,
      max_stock: 200,
      unit: "bottles",
      unit_price: 1.25,
      supplier: "Beverage Wholesale",
    },
    {
      name: "Orange Juice",
      description: "Fresh orange juice bottles",
      category: "beverages" as const,
      current_stock: 18,
      min_stock: 20,
      max_stock: 60,
      unit: "bottles",
      unit_price: 3.99,
      supplier: "Fresh Squeeze Co",
    },
    {
      name: "Paper Napkins",
      description: "Disposable paper napkins",
      category: "supplies" as const,
      current_stock: 45,
      min_stock: 25,
      max_stock: 100,
      unit: "packs",
      unit_price: 12.99,
      supplier: "Restaurant Supply",
    },
    {
      name: "Disposable Cups",
      description: "Eco-friendly disposable cups",
      category: "supplies" as const,
      current_stock: 150,
      min_stock: 100,
      max_stock: 300,
      unit: "packs",
      unit_price: 8.99,
      supplier: "Eco Supplies",
    },
    {
      name: "Coffee Beans",
      description: "Premium arabica coffee beans",
      category: "ingredients" as const,
      current_stock: 12,
      min_stock: 15,
      max_stock: 40,
      unit: "lbs",
      unit_price: 15.99,
      supplier: "Roast Masters",
    },
  ],
};

async function migrateData() {
  console.log("🚀 Starting data migration to Supabase...\n");

  try {
    // Test connection
    const { data: testData, error: testError } = await supabase
      .from("restaurants")
      .select("name")
      .limit(1);

    if (testError) {
      console.error("❌ Connection failed:", testError.message);
      return;
    }

    console.log("✅ Connected to Supabase successfully\n");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("🧹 Clearing existing data...");
    await supabase
      .from("order_items")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase
      .from("orders")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase
      .from("menu_items")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase
      .from("inventory_items")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase
      .from("tables")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase
      .from("categories")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    console.log("✅ Existing data cleared\n");

    // 1. Insert Categories
    console.log("📂 Inserting categories...");
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .insert(staticData.categories)
      .select();

    if (categoriesError) {
      console.error("❌ Categories error:", categoriesError.message);
      return;
    }
    console.log(`✅ Inserted ${categories.length} categories\n`);

    // 2. Insert Tables
    console.log("🪑 Inserting tables...");
    const { data: tables, error: tablesError } = await supabase
      .from("tables")
      .insert(staticData.tables)
      .select();

    if (tablesError) {
      console.error("❌ Tables error:", tablesError.message);
      return;
    }
    console.log(`✅ Inserted ${tables.length} tables\n`);

    // 3. Insert Menu Items (with category references)
    console.log("🍽️ Inserting menu items...");
    const menuItemsWithCategoryIds = staticData.menuItems.map((item) => {
      const category = categories.find((cat) => cat.name === item.category);
      if (!category) {
        throw new Error(`Category not found: ${item.category}`);
      }
      const { category: _, ...itemWithoutCategory } = item;
      return {
        ...itemWithoutCategory,
        category_id: category.id,
      };
    });

    const { data: menuItems, error: menuItemsError } = await supabase
      .from("menu_items")
      .insert(menuItemsWithCategoryIds)
      .select();

    if (menuItemsError) {
      console.error("❌ Menu items error:", menuItemsError.message);
      return;
    }
    console.log(`✅ Inserted ${menuItems.length} menu items\n`);

    // 4. Insert Inventory Items
    console.log("📦 Inserting inventory items...");
    const { data: inventoryItems, error: inventoryError } = await supabase
      .from("inventory_items")
      .insert(staticData.inventoryItems)
      .select();

    if (inventoryError) {
      console.error("❌ Inventory error:", inventoryError.message);
      return;
    }
    console.log(`✅ Inserted ${inventoryItems.length} inventory items\n`);

    // Summary
    console.log("🎉 Migration completed successfully!");
    console.log("📊 Summary:");
    console.log(`   • ${categories.length} categories`);
    console.log(`   • ${tables.length} tables`);
    console.log(`   • ${menuItems.length} menu items`);
    console.log(`   • ${inventoryItems.length} inventory items`);
    console.log("\n✨ Your app is now ready to use Supabase!");
    console.log("💡 Next steps:");
    console.log("   1. Update your components to use the API functions");
    console.log("   2. Test the connection at /supabase-demo");
    console.log("   3. Remove static data from your components");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
}

// Run the migration
migrateData();
