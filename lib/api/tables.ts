import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/database.types";

type Table = Database["public"]["Tables"]["tables"]["Row"];
type TableStatus = "available" | "occupied" | "reserved" | "cleaning";

export async function getTables(): Promise<Table[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tables")
    .select("*")
    .order("table_number");

  if (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }

  return data;
}

export async function getTableById(id: string): Promise<Table> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tables")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching table:", error);
    throw error;
  }

  return data;
}

export async function updateTableStatus(
  tableId: string,
  status: TableStatus
): Promise<Table> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tables")
    .update({ status })
    .eq("id", tableId)
    .select()
    .single();

  if (error) {
    console.error("Error updating table status:", error);
    throw error;
  }

  return data;
}

export async function getTablesByStatus(status: TableStatus): Promise<Table[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tables")
    .select("*")
    .eq("status", status)
    .order("table_number");

  if (error) {
    console.error("Error fetching tables by status:", error);
    throw error;
  }

  return data;
}

export async function getTableStats(): Promise<{
  total: number;
  available: number;
  occupied: number;
  reserved: number;
  cleaning: number;
}> {
  const supabase = createClient();

  const { data, error } = await supabase.from("tables").select("status");

  if (error) {
    console.error("Error fetching table stats:", error);
    throw error;
  }

  const stats = {
    total: data.length,
    available: 0,
    occupied: 0,
    reserved: 0,
    cleaning: 0,
  };

  data.forEach((table) => {
    stats[table.status as keyof typeof stats]++;
  });

  return stats;
}
