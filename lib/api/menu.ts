import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type MenuItemWithCategory = MenuItem & {
  categories: Category;
};

export async function getMenuItems(): Promise<MenuItemWithCategory[]> {
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

  if (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }

  return data as MenuItemWithCategory[];
}

export async function getMenuItemsByCategory(
  categoryId: string
): Promise<MenuItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("category_id", categoryId)
    .eq("is_available", true)
    .order("name");

  if (error) {
    console.error("Error fetching menu items by category:", error);
    throw error;
  }

  return data;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data;
}

export async function getPopularMenuItems(): Promise<MenuItem[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_popular", true)
    .eq("is_available", true)
    .order("name")
    .limit(6);

  if (error) {
    console.error("Error fetching popular menu items:", error);
    throw error;
  }

  return data;
}

export async function createMenuItem(
  menuItem: Database["public"]["Tables"]["menu_items"]["Insert"]
): Promise<MenuItem> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .insert(menuItem)
    .select()
    .single();

  if (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }

  return data;
}

export async function updateMenuItem(
  id: string,
  updates: Database["public"]["Tables"]["menu_items"]["Update"]
): Promise<MenuItem> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("menu_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }

  return data;
}

export async function deleteMenuItem(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("menu_items").delete().eq("id", id);

  if (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
}
