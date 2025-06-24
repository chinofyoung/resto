-- Update Image URLs Script
-- This script updates menu item images with more reliable Unsplash URLs
-- and provides better fallbacks for Filipino food items

UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop&auto=format' WHERE name = 'Lumpia Shanghai';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop&auto=format' WHERE name = 'Calamares';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&auto=format' WHERE name = 'Tokwa''t Baboy';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop&auto=format' WHERE name = 'Chicharon Bulaklak';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop&auto=format' WHERE name = 'Chicken Wings Buffalo';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=400&h=300&fit=crop&auto=format' WHERE name = 'Cheese Sticks';

-- Rice Meals
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop&auto=format' WHERE name = 'Adobong Manok';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&auto=format' WHERE name = 'Lechon Kawali';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1574653371462-9212bb919ba1?w=400&h=300&fit=crop&auto=format' WHERE name = 'Beef Kaldereta';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format' WHERE name = 'Chicken Curry';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1606742808080-d6975fe8b331?w=400&h=300&fit=crop&auto=format' WHERE name = 'Pork Sisig Rice';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format' WHERE name = 'Beef Tapa';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format' WHERE name = 'Bangus Sisig';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1574653371462-9212bb919ba1?w=400&h=300&fit=crop&auto=format' WHERE name = 'Kare-Kare';

-- Noodles
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop&auto=format' WHERE name = 'Pancit Canton';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&auto=format' WHERE name = 'Pancit Bihon';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop&auto=format' WHERE name = 'Pancit Palabok';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&auto=format' WHERE name = 'Spaghetti Filipino Style';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format' WHERE name = 'Lomi';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&auto=format' WHERE name = 'Pad Thai Filipino';

-- Grilled & Fried
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&auto=format' WHERE name = 'Inihaw na Liempo';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format' WHERE name = 'Grilled Bangus';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop&auto=format' WHERE name = 'Chicken Inasal';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop&auto=format' WHERE name = 'Crispy Pata';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop&auto=format' WHERE name = 'Fried Chicken';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&auto=format' WHERE name = 'Grilled Tilapia';

-- Desserts
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format' WHERE name = 'Halo-Halo';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format' WHERE name = 'Leche Flan';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop&auto=format' WHERE name = 'Ube Ice Cream';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&auto=format' WHERE name = 'Buko Pie';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format' WHERE name = 'Taho';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&auto=format' WHERE name = 'Mais Con Yelo';

-- Beverages
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop&auto=format' WHERE name = 'Fresh Buko Juice';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&auto=format' WHERE name = 'Calamansi Juice';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop&auto=format' WHERE name = 'Sago''t Gulaman';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop&auto=format' WHERE name = 'Iced Coffee';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop&auto=format' WHERE name = 'Mango Shake';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop&auto=format' WHERE name = 'Kapeng Barako';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&auto=format' WHERE name = 'Four Seasons Juice';

-- Alcohol
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop&auto=format' WHERE name = 'San Miguel Beer';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop&auto=format' WHERE name = 'Red Horse Beer';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop&auto=format' WHERE name = 'Tanduay Rum';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop&auto=format' WHERE name = 'House Red Wine';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop&auto=format' WHERE name = 'Lambanog';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop&auto=format' WHERE name = 'Basi Wine';

-- Add some backup Filipino food images for better variety
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format' WHERE name = 'Tokwa''t Baboy';
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1606742808080-d6975fe8b331?w=400&h=300&fit=crop&auto=format' WHERE name = 'Chicharon Bulaklak';

-- Alternative high-quality food images as backups
-- These are more generic but reliable food images that will work well
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&auto=format' WHERE name = 'Lumpia Shanghai' AND (image_url IS NULL OR image_url = '');
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&auto=format' WHERE name = 'Adobong Manok' AND (image_url IS NULL OR image_url = '');
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1574653371462-9212bb919ba1?w=400&h=300&fit=crop&auto=format' WHERE name = 'Beef Kaldereta' AND (image_url IS NULL OR image_url = '');
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop&auto=format' WHERE name = 'Pancit Canton' AND (image_url IS NULL OR image_url = '');
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop&auto=format' WHERE name = 'Chicken Inasal' AND (image_url IS NULL OR image_url = '');
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format' WHERE name = 'Leche Flan' AND (image_url IS NULL OR image_url = '');
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=300&fit=crop&auto=format' WHERE name = 'Iced Coffee' AND (image_url IS NULL OR image_url = '');
UPDATE menu_items SET image_url = 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop&auto=format' WHERE name = 'San Miguel Beer' AND (image_url IS NULL OR image_url = '');

-- Show updated items
SELECT name, image_url FROM menu_items ORDER BY name; 