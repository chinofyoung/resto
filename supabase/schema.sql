-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types/enums
CREATE TYPE table_status AS ENUM ('available', 'occupied', 'reserved', 'cleaning');
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'ready', 'served', 'cancelled');
CREATE TYPE inventory_category AS ENUM ('ingredients', 'beverages', 'supplies', 'equipment');

-- Restaurants table (for multi-restaurant support in the future)
CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu items table
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    image_url TEXT,
    prep_time INTEGER NOT NULL DEFAULT 15, -- in minutes
    calories INTEGER,
    spice_level INTEGER CHECK (spice_level >= 0 AND spice_level <= 5),
    ingredients TEXT[], -- array of ingredients
    is_popular BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tables table (restaurant tables)
CREATE TABLE tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_number INTEGER NOT NULL UNIQUE,
    seats INTEGER NOT NULL,
    status table_status DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_id UUID NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
    customer_name VARCHAR(255),
    status order_status DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table (junction table for orders and menu items)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory items table
CREATE TABLE inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category inventory_category NOT NULL,
    current_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    min_stock DECIMAL(10,2) NOT NULL DEFAULT 0,
    max_stock DECIMAL(10,2) NOT NULL DEFAULT 100,
    unit VARCHAR(50) NOT NULL, -- kg, liters, pieces, etc.
    unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    supplier VARCHAR(255),
    last_restocked TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_menu_items_popular ON menu_items(is_popular);
CREATE INDEX idx_tables_status ON tables(status);
CREATE INDEX idx_orders_table ON orders(table_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_menu_item ON order_items(menu_item_id);
CREATE INDEX idx_inventory_category ON inventory_items(category);
CREATE INDEX idx_inventory_stock ON inventory_items(current_stock);

-- Create functions for automatic updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tables_updated_at BEFORE UPDATE ON tables FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_items_updated_at BEFORE UPDATE ON inventory_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default restaurant
INSERT INTO restaurants (name, address, phone, email) VALUES 
('RestoPOS', '123 Restaurant Street, Food City, FC 12345', '+1 (555) 123-4567', 'contact@restopos.com');

-- Insert default categories
INSERT INTO categories (name, description) VALUES 
('Appetizers', 'Starters and small plates'),
('Main Courses', 'Main dishes and entrees'),
('Desserts', 'Sweet treats and desserts'),
('Beverages', 'Drinks and refreshments'),
('Alcohol', 'Alcoholic beverages');

-- Insert sample tables
INSERT INTO tables (table_number, seats, status) VALUES 
(1, 2, 'available'),
(2, 4, 'occupied'),
(3, 2, 'available'),
(4, 6, 'reserved'),
(5, 4, 'occupied'),
(6, 2, 'available'),
(7, 8, 'available'),
(8, 4, 'occupied'),
(9, 2, 'available'),
(10, 4, 'cleaning'),
(11, 2, 'available'),
(12, 6, 'available');

-- Get category IDs for menu items
DO $$
DECLARE
    appetizer_id UUID;
    main_id UUID;
    dessert_id UUID;
    beverage_id UUID;
    alcohol_id UUID;
BEGIN
    SELECT id INTO appetizer_id FROM categories WHERE name = 'Appetizers';
    SELECT id INTO main_id FROM categories WHERE name = 'Main Courses';
    SELECT id INTO dessert_id FROM categories WHERE name = 'Desserts';
    SELECT id INTO beverage_id FROM categories WHERE name = 'Beverages';
    SELECT id INTO alcohol_id FROM categories WHERE name = 'Alcohol';

    -- Insert sample menu items
    INSERT INTO menu_items (name, description, price, category_id, image_url, prep_time, calories, spice_level, ingredients, is_popular, is_available) VALUES 
    -- Appetizers
    ('Buffalo Wings', 'Spicy chicken wings with blue cheese dip', 12.99, appetizer_id, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=200&fit=crop', 15, 350, 3, ARRAY['chicken wings', 'buffalo sauce', 'blue cheese', 'celery'], true, true),
    ('Mozzarella Sticks', 'Crispy fried mozzarella with marinara sauce', 8.99, appetizer_id, 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=300&h=200&fit=crop', 10, 280, 0, ARRAY['mozzarella cheese', 'breadcrumbs', 'marinara sauce'], false, true),
    ('Loaded Nachos', 'Tortilla chips with cheese, jalapeños, and sour cream', 11.99, appetizer_id, 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop', 12, 420, 2, ARRAY['tortilla chips', 'cheese', 'jalapeños', 'sour cream', 'guacamole'], false, true),

    -- Main Courses
    ('Grilled Chicken Breast', 'Herb-seasoned chicken with roasted vegetables', 18.99, main_id, 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300&h=200&fit=crop', 25, 320, 1, ARRAY['chicken breast', 'herbs', 'vegetables', 'olive oil'], true, true),
    ('Beef Burger Deluxe', 'Angus beef patty with lettuce, tomato, and fries', 15.99, main_id, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop', 20, 650, 1, ARRAY['angus beef', 'lettuce', 'tomato', 'cheese', 'fries'], false, true),
    ('Salmon Fillet', 'Grilled Atlantic salmon with lemon butter sauce', 22.99, main_id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop', 30, 380, 0, ARRAY['salmon', 'lemon', 'butter', 'herbs'], true, true),
    ('Pasta Carbonara', 'Creamy pasta with bacon and parmesan cheese', 16.99, main_id, 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop', 18, 520, 0, ARRAY['pasta', 'bacon', 'parmesan', 'eggs', 'cream'], false, true),
    ('Ribeye Steak', '12oz premium ribeye steak with garlic mashed potatoes', 28.99, main_id, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop', 35, 720, 1, ARRAY['ribeye steak', 'potatoes', 'garlic', 'butter'], true, true),

    -- Desserts
    ('Chocolate Lava Cake', 'Warm chocolate cake with vanilla ice cream', 7.99, dessert_id, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop', 8, 450, 0, ARRAY['chocolate', 'flour', 'eggs', 'vanilla ice cream'], false, true),
    ('Tiramisu', 'Classic Italian dessert with coffee and mascarpone', 8.99, dessert_id, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop', 5, 320, 0, ARRAY['mascarpone', 'coffee', 'ladyfingers', 'cocoa'], false, true),

    -- Beverages
    ('Fresh Orange Juice', 'Freshly squeezed orange juice', 4.99, beverage_id, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop', 3, 120, 0, ARRAY['oranges'], false, true),
    ('Iced Coffee', 'Cold brew coffee with ice', 3.99, beverage_id, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&h=200&fit=crop', 2, 5, 0, ARRAY['coffee beans', 'ice'], false, true),

    -- Alcohol
    ('Craft Beer IPA', 'Local craft IPA with citrus notes', 6.99, alcohol_id, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=200&fit=crop', 1, 180, 0, ARRAY['hops', 'malt', 'yeast'], false, true),
    ('House Red Wine', 'Smooth red wine blend', 8.99, alcohol_id, 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=300&h=200&fit=crop', 1, 150, 0, ARRAY['grapes'], false, true);
END $$;

-- Insert sample inventory items
INSERT INTO inventory_items (name, description, category, current_stock, min_stock, max_stock, unit, unit_price, supplier) VALUES 
-- Ingredients
('Chicken Breast', 'Fresh chicken breast fillets', 'ingredients', 25.5, 10.0, 50.0, 'kg', 8.99, 'Fresh Poultry Co.'),
('Ground Beef', 'Premium ground beef 80/20', 'ingredients', 15.2, 8.0, 30.0, 'kg', 12.50, 'Prime Meat Supply'),
('Salmon Fillet', 'Atlantic salmon fillets', 'ingredients', 8.5, 5.0, 20.0, 'kg', 24.99, 'Ocean Fresh Seafood'),
('Mozzarella Cheese', 'Whole milk mozzarella', 'ingredients', 12.0, 5.0, 25.0, 'kg', 15.99, 'Dairy Best'),
('Tomatoes', 'Fresh Roma tomatoes', 'ingredients', 18.3, 10.0, 40.0, 'kg', 4.50, 'Garden Fresh Produce'),
('Lettuce', 'Iceberg lettuce heads', 'ingredients', 45, 20, 80, 'pieces', 2.99, 'Garden Fresh Produce'),

-- Beverages
('Orange Juice', 'Fresh orange juice concentrate', 'beverages', 25.0, 10.0, 50.0, 'liters', 8.99, 'Citrus Valley'),
('Coffee Beans', 'Premium arabica coffee beans', 'beverages', 8.5, 5.0, 20.0, 'kg', 18.99, 'Mountain Coffee Roasters'),
('Craft Beer IPA', 'Local IPA bottles', 'beverages', 48, 24, 100, 'pieces', 3.50, 'Local Brewery'),

-- Supplies
('Paper Napkins', 'White dinner napkins', 'supplies', 500, 200, 1000, 'pieces', 0.05, 'Restaurant Supply Co.'),
('Plastic Cups', '16oz clear plastic cups', 'supplies', 250, 100, 500, 'pieces', 0.15, 'Restaurant Supply Co.'),
('Aluminum Foil', 'Heavy duty aluminum foil', 'supplies', 12, 5, 25, 'rolls', 8.99, 'Kitchen Essentials'),

-- Equipment
('Chef Knives', 'Professional chef knives', 'equipment', 8, 5, 15, 'pieces', 45.99, 'Professional Kitchen Tools'),
('Cutting Boards', 'Bamboo cutting boards', 'equipment', 12, 8, 20, 'pieces', 24.99, 'Kitchen Essentials'),
('Serving Plates', 'White ceramic dinner plates', 'equipment', 48, 30, 80, 'pieces', 12.99, 'Tableware Plus');

-- Enable Row Level Security (RLS) - for future authentication
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all operations - you can restrict later)
CREATE POLICY "Allow all operations on restaurants" ON restaurants FOR ALL USING (true);
CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true);
CREATE POLICY "Allow all operations on menu_items" ON menu_items FOR ALL USING (true);
CREATE POLICY "Allow all operations on tables" ON tables FOR ALL USING (true);
CREATE POLICY "Allow all operations on orders" ON orders FOR ALL USING (true);
CREATE POLICY "Allow all operations on order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "Allow all operations on inventory_items" ON inventory_items FOR ALL USING (true); 