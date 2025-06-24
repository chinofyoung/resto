# Running the Filipino Restaurant Data Population Script

## Overview

This script populates your restaurant management system with comprehensive Filipino restaurant data including:

- 35+ authentic Filipino menu items with PHP pricing
- 7 Filipino categories (Appetizers, Rice Meals, Noodles, etc.)
- 50+ inventory items with realistic suppliers
- Proper low stock alerts for demonstration

## Prerequisites

- Supabase database connection configured
- PostgreSQL database access
- Node.js environment (if running via npm script)

## Script Options

### Option 1: Fixed Script (Recommended)

Use the corrected version with properly formatted image URLs:

```bash
# Run the fixed population script
psql -h your-supabase-host -U postgres -d postgres -f scripts/populate-restaurant-data-fixed.sql
```

### Option 2: Original Script

If you prefer the original script:

```bash
psql -h your-supabase-host -U postgres -d postgres -f scripts/populate-restaurant-data.sql
```

### Option 3: Update Image URLs Only

If you already have data and just want to fix image loading issues:

```bash
psql -h your-supabase-host -U postgres -d postgres -f scripts/update-image-urls.sql
```

## Image Improvements

The fixed script includes:

- High-quality Unsplash images (400x300 resolution)
- Auto-format parameter for better loading
- Fallback to `/placeholder-food.svg` for failed images
- More reliable image URLs with better stability

## What Gets Populated

### Menu Items by Category

- **Appetizers** (₱120-280): Lumpia Shanghai, Calamares, Tokwa't Baboy, etc.
- **Rice Meals** (₱180-420): Adobong Manok, Lechon Kawali, Beef Kaldereta, etc.
- **Noodles** (₱160-280): Pancit Canton, Pancit Bihon, Pancit Palabok, etc.
- **Grilled & Fried** (₱200-450): Inihaw na Liempo, Chicken Inasal, Crispy Pata, etc.
- **Desserts** (₱80-180): Halo-Halo, Leche Flan, Ube Ice Cream, etc.
- **Beverages** (₱60-150): Fresh Buko Juice, Calamansi Juice, Mango Shake, etc.
- **Alcohol** (₱120-380): San Miguel Beer, Tanduay Rum, Local Wines, etc.

### Inventory Categories

- **Ingredients**: Fresh meats, vegetables, pantry staples
- **Beverages**: Fresh fruits, bottled drinks, coffee beans
- **Supplies**: Disposable items, cleaning supplies
- **Equipment**: Gas tanks, charcoal, kitchen tools

### Low Stock Demo Items

The script automatically sets some items to low stock for demonstration:

- Squid (1.5kg remaining)
- Pork Intestines (1.5kg remaining)
- Tapioca Pearls (0.5kg remaining)
- Cling Wrap (0.5 rolls remaining)
- Several other items at minimum thresholds

## Running via Supabase Dashboard

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste the entire script content
5. Click "Run"

## Verification Steps

After running the script, verify the data:

```sql
-- Check categories
SELECT name, COUNT(*) as item_count
FROM categories c
LEFT JOIN menu_items m ON c.id = m.category_id
GROUP BY c.name;

-- Check pricing format (should show ₱ symbol in app)
SELECT name, price FROM menu_items ORDER BY price DESC LIMIT 5;

-- Check low stock items
SELECT name, current_stock, min_stock
FROM inventory_items
WHERE current_stock <= min_stock;

-- Check image URLs
SELECT name, image_url FROM menu_items WHERE image_url IS NOT NULL LIMIT 5;
```

## Troubleshooting

### Image Loading Issues

If some images don't load:

1. The app has fallback to `/placeholder-food.svg`
2. Run the update script: `scripts/update-image-urls.sql`
3. Check browser network tab for failed requests

### Permission Issues

```bash
# If you get permission errors, try:
sudo -u postgres psql -d your_database -f scripts/populate-restaurant-data-fixed.sql
```

### Connection Issues

```bash
# For local PostgreSQL:
psql -U postgres -d resto -f scripts/populate-restaurant-data-fixed.sql

# For remote Supabase:
psql "postgresql://postgres:[password]@[host]:5432/postgres" -f scripts/populate-restaurant-data-fixed.sql
```

## Notes

- Script includes `DELETE` statements - use carefully in production
- All prices are in Philippine Peso (₱)
- Inventory includes realistic Filipino suppliers
- Popular items are marked for dashboard highlights
- Script is idempotent (safe to run multiple times)

## Next Steps

After population:

1. Test the menu page to see all items
2. Check inventory page for low stock alerts
3. Try creating orders with the new items
4. Verify dashboard analytics with the new data
