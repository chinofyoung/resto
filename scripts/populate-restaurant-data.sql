-- Comprehensive Restaurant Data Population Script
-- Filipino Restaurant Menu & Inventory with Philippine Peso Pricing

-- Clear existing data (be careful in production!)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM menu_items;
DELETE FROM inventory_items;
DELETE FROM categories;

-- Insert Filipino restaurant categories
INSERT INTO categories (name, description) VALUES 
('Appetizers', 'Pampagana - Starters and small plates'),
('Rice Meals', 'Kanin at Ulam - Complete rice meals'),
('Noodles', 'Pancit at Pasta - Noodle dishes'),
('Grilled & Fried', 'Inihaw at Prito - Grilled and fried specialties'),
('Desserts', 'Panghimagas - Sweet treats and desserts'),
('Beverages', 'Inumin - Drinks and refreshments'),
('Alcohol', 'Alak - Alcoholic beverages');

-- Get category IDs for menu items
DO $$
DECLARE
    appetizer_id UUID;
    rice_id UUID;
    noodles_id UUID;
    grilled_id UUID;
    dessert_id UUID;
    beverage_id UUID;
    alcohol_id UUID;
BEGIN
    SELECT id INTO appetizer_id FROM categories WHERE name = 'Appetizers';
    SELECT id INTO rice_id FROM categories WHERE name = 'Rice Meals';
    SELECT id INTO noodles_id FROM categories WHERE name = 'Noodles';
    SELECT id INTO grilled_id FROM categories WHERE name = 'Grilled & Fried';
    SELECT id INTO dessert_id FROM categories WHERE name = 'Desserts';
    SELECT id INTO beverage_id FROM categories WHERE name = 'Beverages';
    SELECT id INTO alcohol_id FROM categories WHERE name = 'Alcohol';

    -- Insert comprehensive Filipino menu items (prices in PHP)
    INSERT INTO menu_items (name, description, price, category_id, image_url, prep_time, calories, spice_level, ingredients, is_popular, is_available) VALUES 
    
    -- APPETIZERS (₱120-280)
    ('Lumpia Shanghai', 'Crispy spring rolls filled with seasoned ground pork', 180.00, appetizer_id, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop&auto=format', 15, 250, 1, ARRAY['ground pork', 'carrots', 'onions', 'wrapper', 'egg'], true, true),
    ('Calamares', 'Golden fried squid rings with spicy mayo dip', 220.00, appetizer_id, 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop&auto=format', 12, 300, 2, ARRAY['squid', 'flour', 'spices', 'mayo'], true, true),
    ('Tokwa''t Baboy', 'Crispy tofu and pork belly with soy-vinegar sauce', 190.00, appetizer_id, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format', 18, 320, 1, ARRAY['tofu', 'pork belly', 'soy sauce', 'vinegar', 'onions'], false, true),
    ('Lumpia Shanghai', 'Crispy spring rolls filled with seasoned ground pork', 180.00, appetizer_id, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop&auto=format', 15, 250, 1, ARRAY['ground pork', 'carrots', 'onions', 'wrapper', 'egg'], true, true),
('Calamares', 'Golden fried squid rings with spicy mayo dip', 220.00, appetizer_id, 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop&auto=format', 12, 300, 2, ARRAY['squid', 'flour', 'spices', 'mayo'], true, true),
('Tokwa''t Baboy', 'Crispy tofu and pork belly with soy-vinegar sauce', 190.00, appetizer_id, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format', 18, 320, 1, ARRAY['tofu', 'pork belly', 'soy sauce', 'vinegar', 'onions'], false, true),
('Chicharon Bulaklak', 'Crispy deep-fried pork intestines', 160.00, appetizer_id, 'https://images.unsplash.com/photo-1606742808080-d6975fe8b331?w=400&h=300&fit=crop&auto=format', 20, 380, 1, ARRAY['pork intestines', 'spices'], false, true),
('Chicken Wings Buffalo', 'Spicy buffalo wings with ranch dip', 240.00, appetizer_id, 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop&auto=format', 15, 280, 3, ARRAY['chicken wings', 'hot sauce', 'butter', 'ranch'], false, true),
('Cheese Sticks', 'Deep-fried cheese wrapped in spring roll wrapper', 150.00, appetizer_id, 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&h=300&fit=crop&auto=format', 10, 220, 0, ARRAY['cheese', 'wrapper', 'oil'], false, true),
    
    -- RICE MEALS (₱180-420)
    ('Adobong Manok', 'Classic Filipino chicken adobo with steamed rice', 220.00, rice_id, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format', 35, 450, 1, ARRAY['chicken', 'soy sauce', 'vinegar', 'garlic', 'bay leaves', 'rice'], true, true),
('Lechon Kawali', 'Crispy pork belly with rice and liver sauce', 280.00, rice_id, 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&auto=format', 25, 580, 1, ARRAY['pork belly', 'liver sauce', 'rice'], true, true),
('Beef Kaldereta', 'Rich beef stew with vegetables in tomato sauce', 320.00, rice_id, 'https://images.unsplash.com/photo-1574653371462-9212bb919ba1?w=400&h=300&fit=crop&auto=format', 45, 520, 2, ARRAY['beef', 'tomato sauce', 'potatoes', 'carrots', 'bell pepper', 'rice'], true, true),
('Chicken Curry', 'Filipino-style chicken curry with coconut milk', 240.00, rice_id, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format', 30, 420, 3, ARRAY['chicken', 'coconut milk', 'curry powder', 'potatoes', 'rice'], false, true),
('Pork Sisig Rice', 'Sizzling pork sisig served with garlic rice', 260.00, rice_id, 'https://images.unsplash.com/photo-1606742808080-d6975fe8b331?w=400&h=300&fit=crop&auto=format', 20, 480, 2, ARRAY['pork', 'onions', 'chili', 'calamansi', 'garlic rice'], true, true),
('Beef Tapa', 'Sweet cured beef with garlic rice and fried egg', 240.00, rice_id, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format', 15, 520, 1, ARRAY['beef tapa', 'garlic rice', 'egg', 'tomatoes'], false, true),
('Bangus Sisig', 'Crispy milkfish sisig with onions and chili', 220.00, rice_id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format', 18, 380, 2, ARRAY['bangus', 'onions', 'chili', 'calamansi', 'rice'], false, true),
('Kare-Kare', 'Oxtail stew in rich peanut sauce with vegetables', 380.00, rice_id, 'https://images.unsplash.com/photo-1574653371462-9212bb919ba1?w=400&h=300&fit=crop&auto=format', 50, 620, 0, ARRAY['oxtail', 'peanut sauce', 'vegetables', 'bagoong', 'rice'], true, true),
    
    -- NOODLES (₱160-280)
    ('Pancit Canton', 'Stir-fried wheat noodles with vegetables and meat', 180.00, noodles_id, 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 20, 380, 1, ARRAY['canton noodles', 'vegetables', 'pork', 'soy sauce'], true, true),
    ('Pancit Bihon', 'Rice noodles with mixed vegetables and chicken', 160.00, noodles_id, 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 18, 320, 1, ARRAY['rice noodles', 'vegetables', 'chicken', 'soy sauce'], false, true),
    ('Pancit Palabok', 'Rice noodles with thick orange sauce and toppings', 200.00, noodles_id, 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 25, 420, 1, ARRAY['rice noodles', 'shrimp sauce', 'chicharron', 'eggs', 'shrimp'], true, true),
    ('Spaghetti Filipino Style', 'Sweet-style spaghetti with hotdogs and cheese', 190.00, noodles_id, 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 15, 480, 0, ARRAY['spaghetti', 'banana catsup', 'hotdogs', 'cheese'], false, true),
    ('Lomi', 'Thick egg noodles in rich broth with meat and vegetables', 170.00, noodles_id, 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 20, 350, 1, ARRAY['lomi noodles', 'pork', 'vegetables', 'egg'], false, true),
    ('Pad Thai Filipino', 'Filipino twist on classic pad thai', 220.00, noodles_id, 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 18, 400, 2, ARRAY['rice noodles', 'shrimp', 'tofu', 'bean sprouts', 'tamarind'], false, true),
    
    -- GRILLED & FRIED (₱200-450)
    ('Inihaw na Liempo', 'Grilled pork belly with java rice', 280.00, grilled_id, 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 30, 520, 1, ARRAY['pork belly', 'marinade', 'java rice'], true, true),
    ('Grilled Bangus', 'Whole grilled milkfish stuffed with tomatoes and onions', 320.00, grilled_id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 25, 420, 1, ARRAY['bangus', 'tomatoes', 'onions', 'spices'], true, true),
    ('Chicken Inasal', 'Grilled chicken marinated in annatto and spices', 240.00, grilled_id, 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 35, 450, 2, ARRAY['chicken', 'annatto', 'lemongrass', 'garlic'], true, true),
    ('Crispy Pata', 'Deep-fried pork knuckles with soy-vinegar dip', 420.00, grilled_id, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 45, 680, 1, ARRAY['pork knuckles', 'spices', 'soy sauce', 'vinegar'], false, true),
    ('Fried Chicken', 'Filipino-style fried chicken with gravy', 220.00, grilled_id, 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 20, 480, 1, ARRAY['chicken', 'flour', 'spices', 'gravy'], false, true),
    ('Grilled Tilapia', 'Whole grilled tilapia with garlic and herbs', 200.00, grilled_id, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 20, 320, 1, ARRAY['tilapia', 'garlic', 'herbs', 'calamansi'], false, true),
    
    -- DESSERTS (₱80-180)
    ('Halo-Halo', 'Mixed shaved ice dessert with various toppings', 150.00, dessert_id, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 8, 280, 0, ARRAY['shaved ice', 'ube', 'beans', 'jelly', 'leche flan', 'ice cream'], true, true),
    ('Leche Flan', 'Rich caramel custard dessert', 120.00, dessert_id, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 5, 320, 0, ARRAY['eggs', 'milk', 'sugar', 'vanilla'], true, true),
    ('Ube Ice Cream', 'Purple yam flavored ice cream', 100.00, dessert_id, 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 2, 180, 0, ARRAY['ube', 'milk', 'cream', 'sugar'], false, true),
    ('Buko Pie', 'Young coconut custard pie', 140.00, dessert_id, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 5, 250, 0, ARRAY['young coconut', 'custard', 'pie crust'], false, true),
    ('Taho', 'Soft tofu with brown sugar syrup and tapioca pearls', 80.00, dessert_id, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 3, 120, 0, ARRAY['soft tofu', 'brown sugar', 'tapioca pearls'], false, true),
    ('Mais Con Yelo', 'Sweet corn with shaved ice and milk', 90.00, dessert_id, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 5, 150, 0, ARRAY['sweet corn', 'shaved ice', 'milk', 'sugar'], false, true),
    
    -- BEVERAGES (₱60-150)
    ('Fresh Buko Juice', 'Fresh young coconut water', 80.00, beverage_id, 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 3, 60, 0, ARRAY['young coconut'], false, true),
    ('Calamansi Juice', 'Fresh Philippine lime juice', 70.00, beverage_id, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 5, 40, 0, ARRAY['calamansi', 'water', 'sugar'], true, true),
    ('Sago''t Gulaman', 'Tapioca pearls and gelatin drink', 60.00, beverage_id, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 5, 120, 0, ARRAY['tapioca pearls', 'gelatin', 'brown sugar'], false, true),
    ('Iced Coffee', 'Cold brew Filipino coffee', 90.00, beverage_id, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 3, 20, 0, ARRAY['coffee beans', 'ice', 'milk'], false, true),
    ('Mango Shake', 'Fresh mango blended with milk and ice', 120.00, beverage_id, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 5, 180, 0, ARRAY['mango', 'milk', 'ice', 'sugar'], true, true),
    ('Kapeng Barako', 'Strong Filipino coffee', 80.00, beverage_id, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 5, 15, 0, ARRAY['barako coffee beans'], false, true),
    ('Four Seasons Juice', 'Mixed tropical fruit juice', 100.00, beverage_id, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 8, 150, 0, ARRAY['pineapple', 'orange', 'mango', 'papaya'], false, true),
    
    -- ALCOHOL (₱120-380)
    ('San Miguel Beer', 'Classic Filipino beer', 120.00, alcohol_id, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 1, 150, 0, ARRAY['hops', 'malt', 'yeast'], true, true),
    ('Red Horse Beer', 'Strong Filipino beer', 140.00, alcohol_id, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 1, 180, 0, ARRAY['hops', 'malt', 'yeast'], false, true),
    ('Tanduay Rum', 'Premium Filipino rum on the rocks', 180.00, alcohol_id, 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 2, 120, 0, ARRAY['sugarcane', 'molasses'], false, true),
    ('House Red Wine', 'Local red wine blend', 250.00, alcohol_id, 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 1, 140, 0, ARRAY['grapes'], false, true),
    ('Lambanog', 'Traditional coconut wine', 160.00, alcohol_id, 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 2, 180, 0, ARRAY['coconut sap'], false, true),
    ('Basi Wine', 'Traditional sugarcane wine', 200.00, alcohol_id, 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400w=300&h=200&fit=croph=300w=300&h=200&fit=cropfit=crop&auto=format', 1, 160, 0, ARRAY['sugarcane'], false, true);
    
END $$;

-- Insert comprehensive inventory items (prices in PHP)
INSERT INTO inventory_items (name, description, category, current_stock, min_stock, max_stock, unit, unit_price, supplier, last_restocked) VALUES 

-- INGREDIENTS (Meat & Protein)
('Pork Belly', 'Fresh pork belly for lechon kawali and liempo', 'ingredients', 15.5, 5.0, 30.0, 'kg', 280.00, 'Metro Manila Meat Suppliers', NOW() - INTERVAL '2 days'),
('Chicken (Whole)', 'Fresh whole chicken for adobo and inasal', 'ingredients', 20.0, 8.0, 40.0, 'kg', 160.00, 'Bounty Fresh Chicken', NOW() - INTERVAL '1 day'),
('Ground Pork', 'Fresh ground pork for lumpia and other dishes', 'ingredients', 8.5, 3.0, 20.0, 'kg', 220.00, 'Metro Manila Meat Suppliers', NOW() - INTERVAL '3 days'),
('Beef Chuck', 'Beef chuck for kaldereta and kare-kare', 'ingredients', 12.0, 4.0, 25.0, 'kg', 480.00, 'Santis Delicatessen', NOW() - INTERVAL '1 day'),
('Bangus (Milkfish)', 'Fresh bangus for grilling and sisig', 'ingredients', 25.0, 10.0, 50.0, 'kg', 180.00, 'Dagupan Fish Market', NOW()),
('Tilapia', 'Fresh tilapia for grilling', 'ingredients', 18.0, 8.0, 35.0, 'kg', 140.00, 'Laguna Fish Farm', NOW()),
('Squid', 'Fresh squid for calamares', 'ingredients', 1.5, 2.0, 15.0, 'kg', 320.00, 'Manila Bay Seafood', NOW() - INTERVAL '1 day'),
('Eggs', 'Fresh chicken eggs', 'ingredients', 15.0, 5.0, 30.0, 'tray', 180.00, 'San Miguel Foods', NOW() - INTERVAL '2 days'),
('Pork Intestines', 'For chicharon bulaklak', 'ingredients', 1.5, 1.0, 8.0, 'kg', 150.00, 'Metro Manila Meat Suppliers', NOW() - INTERVAL '4 days'),

-- INGREDIENTS (Vegetables & Produce)
('Onions', 'White onions for cooking', 'ingredients', 25.0, 10.0, 50.0, 'kg', 60.00, 'Baguio Vegetable Traders', NOW() - INTERVAL '3 days'),
('Garlic', 'Fresh garlic bulbs', 'ingredients', 8.0, 3.0, 15.0, 'kg', 120.00, 'Baguio Vegetable Traders', NOW() - INTERVAL '2 days'),
('Tomatoes', 'Fresh tomatoes', 'ingredients', 12.0, 5.0, 25.0, 'kg', 80.00, 'Batangas Farm Fresh', NOW() - INTERVAL '1 day'),
('Potatoes', 'Potatoes for fries and stews', 'ingredients', 20.0, 8.0, 40.0, 'kg', 70.00, 'Baguio Vegetable Traders', NOW() - INTERVAL '5 days'),
('Carrots', 'Fresh carrots', 'ingredients', 10.0, 4.0, 20.0, 'kg', 90.00, 'Baguio Vegetable Traders', NOW() - INTERVAL '4 days'),
('Bell Peppers', 'Mixed bell peppers', 'ingredients', 6.0, 2.0, 15.0, 'kg', 150.00, 'Benguet Vegetable Coop', NOW() - INTERVAL '2 days'),
('Green Beans', 'Fresh green beans', 'ingredients', 5.0, 2.0, 12.0, 'kg', 100.00, 'Baguio Vegetable Traders', NOW() - INTERVAL '3 days'),
('Cabbage', 'Fresh cabbage for lumpia', 'ingredients', 8.0, 3.0, 20.0, 'kg', 50.00, 'Baguio Vegetable Traders', NOW() - INTERVAL '6 days'),
('Bean Sprouts', 'Fresh bean sprouts for pancit', 'ingredients', 4.0, 1.0, 10.0, 'kg', 80.00, 'Local Vegetable Market', NOW() - INTERVAL '1 day'),
('Kangkong', 'Water spinach for adobong kangkong', 'ingredients', 6.0, 2.0, 15.0, 'kg', 40.00, 'Local Vegetable Market', NOW()),

-- INGREDIENTS (Pantry Staples)
('Jasmine Rice', 'Premium jasmine rice', 'ingredients', 50.0, 20.0, 100.0, 'kg', 55.00, 'NFA Rice Suppliers', NOW() - INTERVAL '7 days'),
('Soy Sauce', 'Filipino soy sauce', 'ingredients', 8.0, 3.0, 20.0, 'liter', 45.00, 'Datu Puti Products', NOW() - INTERVAL '10 days'),
('Vinegar', 'Coconut vinegar', 'ingredients', 6.0, 2.0, 15.0, 'liter', 35.00, 'Datu Puti Products', NOW() - INTERVAL '8 days'),
('Cooking Oil', 'Vegetable cooking oil', 'ingredients', 10.0, 4.0, 25.0, 'liter', 90.00, 'Minola Oil', NOW() - INTERVAL '5 days'),
('Coconut Milk', 'Fresh coconut milk for curry', 'ingredients', 12.0, 4.0, 30.0, 'liter', 80.00, 'Fiesta Coconut', NOW() - INTERVAL '3 days'),
('Fish Sauce', 'Filipino fish sauce', 'ingredients', 2.0, 1.0, 10.0, 'liter', 60.00, 'Rufina Patis', NOW() - INTERVAL '15 days'),
('Oyster Sauce', 'Oyster sauce for stir-frying', 'ingredients', 3.0, 1.0, 8.0, 'liter', 120.00, 'Lee Kum Kee', NOW() - INTERVAL '12 days'),
('Tomato Sauce', 'Tomato sauce for pasta and stews', 'ingredients', 15.0, 5.0, 30.0, 'can', 25.00, 'Del Monte', NOW() - INTERVAL '20 days'),
('Banana Ketchup', 'Sweet Filipino ketchup', 'ingredients', 8.0, 3.0, 20.0, 'bottle', 40.00, 'Jufran', NOW() - INTERVAL '18 days'),

-- INGREDIENTS (Noodles & Starches)
('Canton Noodles', 'Fresh canton noodles for pancit', 'ingredients', 10.0, 4.0, 25.0, 'kg', 120.00, 'Excellent Noodles', NOW() - INTERVAL '2 days'),
('Bihon Rice Noodles', 'Thin rice noodles', 'ingredients', 8.0, 3.0, 20.0, 'kg', 100.00, 'Excellent Noodles', NOW() - INTERVAL '4 days'),
('Spaghetti Pasta', 'Spaghetti for Filipino-style pasta', 'ingredients', 6.0, 2.0, 15.0, 'kg', 150.00, 'Royal Pasta', NOW() - INTERVAL '10 days'),
('Lomi Noodles', 'Thick egg noodles for lomi', 'ingredients', 2.0, 1.0, 10.0, 'kg', 160.00, 'Excellent Noodles', NOW() - INTERVAL '3 days'),

-- BEVERAGES (Stock)
('Young Coconut', 'Fresh young coconuts for buko juice', 'beverages', 30.0, 10.0, 60.0, 'pieces', 40.00, 'Laguna Coconut Farm', NOW()),
('Calamansi', 'Fresh calamansi for juice', 'beverages', 8.0, 3.0, 20.0, 'kg', 80.00, 'Batangas Citrus Farm', NOW() - INTERVAL '2 days'),
('Mango (Ripe)', 'Ripe mangoes for shakes', 'beverages', 15.0, 5.0, 30.0, 'kg', 120.00, 'Guimaras Mango Farm', NOW() - INTERVAL '1 day'),
('Coffee Beans (Barako)', 'Premium barako coffee beans', 'beverages', 2.0, 2.0, 12.0, 'kg', 400.00, 'Batangas Coffee Roasters', NOW() - INTERVAL '7 days'),
('Tapioca Pearls', 'Sago pearls for drinks', 'beverages', 0.5, 1.0, 8.0, 'kg', 180.00, 'Asian Ingredients Supply', NOW() - INTERVAL '14 days'),

-- BEVERAGES (Bottled/Canned)
('San Miguel Beer', 'San Miguel Pale Pilsen bottles', 'beverages', 48.0, 20.0, 100.0, 'pieces', 45.00, 'San Miguel Brewery', NOW() - INTERVAL '3 days'),
('Red Horse Beer', 'Red Horse beer bottles', 'beverages', 24.0, 10.0, 50.0, 'pieces', 50.00, 'San Miguel Brewery', NOW() - INTERVAL '3 days'),
('Softdrinks Assorted', 'Coca-Cola, Sprite, Royal assorted', 'beverages', 36.0, 15.0, 75.0, 'pieces', 25.00, 'Coca-Cola Bottlers', NOW() - INTERVAL '2 days'),
('Bottled Water', '500ml bottled water', 'beverages', 60.0, 25.0, 120.0, 'pieces', 15.00, 'Nature''s Spring', NOW() - INTERVAL '1 day'),

-- SUPPLIES (Kitchen & Service)
('Disposable Plates', 'Foam plates for takeout', 'supplies', 200.0, 50.0, 500.0, 'pieces', 3.50, 'Orocan Plastics', NOW() - INTERVAL '5 days'),
('Disposable Cups', 'Plastic cups for beverages', 'supplies', 150.0, 40.0, 400.0, 'pieces', 2.80, 'Orocan Plastics', NOW() - INTERVAL '5 days'),
('Food Containers', 'Takeout food containers', 'supplies', 120.0, 30.0, 300.0, 'pieces', 8.00, 'Packaging Solutions Inc', NOW() - INTERVAL '8 days'),
('Aluminum Foil', 'Heavy duty aluminum foil', 'supplies', 5.0, 2.0, 12.0, 'roll', 180.00, 'Grocery Depot', NOW() - INTERVAL '15 days'),
('Cling Wrap', 'Food-grade cling wrap', 'supplies', 0.5, 1.0, 8.0, 'roll', 120.00, 'Grocery Depot', NOW() - INTERVAL '12 days'),
('Paper Towels', 'Absorbent paper towels', 'supplies', 8.0, 3.0, 20.0, 'roll', 45.00, 'Grocery Depot', NOW() - INTERVAL '6 days'),
('Dishwashing Liquid', 'Commercial dishwashing soap', 'supplies', 4.0, 1.0, 10.0, 'liter', 85.00, 'Joy Dishwashing', NOW() - INTERVAL '10 days'),
('Garbage Bags', 'Heavy duty garbage bags', 'supplies', 10.0, 3.0, 25.0, 'roll', 150.00, 'Glad Products', NOW() - INTERVAL '20 days'),

-- EQUIPMENT (Kitchen Tools)
('Gas Tank (LPG)', 'LPG tank refill for cooking', 'equipment', 2.0, 1.0, 4.0, 'pieces', 800.00, 'Petron Gasul', NOW() - INTERVAL '14 days'),
('Charcoal', 'Charcoal for grilling', 'equipment', 20.0, 8.0, 50.0, 'kg', 35.00, 'Local Charcoal Supplier', NOW() - INTERVAL '7 days');

-- Update sample orders with PHP pricing
UPDATE menu_items SET price = price WHERE id IN (SELECT id FROM menu_items LIMIT 5);

-- Add some low stock alerts for demonstration
UPDATE inventory_items SET current_stock = 1.5 WHERE name IN ('Squid', 'Pork Intestines');
UPDATE inventory_items SET current_stock = 0.5 WHERE name IN ('Tapioca Pearls', 'Cling Wrap');
UPDATE inventory_items SET current_stock = 2.0 WHERE name IN ('Fish Sauce', 'Lomi Noodles', 'Coffee Beans (Barako)'); 