-- Fix broken image URL for Pasta Carbonara
UPDATE menu_items 
SET image_url = 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300&h=200&fit=crop'
WHERE name = 'Pasta Carbonara' 
  AND image_url = 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop'; 