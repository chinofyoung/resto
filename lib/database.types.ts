export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          address: string | null;
          phone: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          address?: string | null;
          phone?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          category_id: string;
          image_url: string | null;
          prep_time: number;
          calories: number | null;
          spice_level: number | null;
          ingredients: string[] | null;
          is_popular: boolean;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          category_id: string;
          image_url?: string | null;
          prep_time: number;
          calories?: number | null;
          spice_level?: number | null;
          ingredients?: string[] | null;
          is_popular?: boolean;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          category_id?: string;
          image_url?: string | null;
          prep_time?: number;
          calories?: number | null;
          spice_level?: number | null;
          ingredients?: string[] | null;
          is_popular?: boolean;
          is_available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      tables: {
        Row: {
          id: string;
          table_number: number;
          seats: number;
          status: "available" | "occupied" | "reserved" | "cleaning";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          table_number: number;
          seats: number;
          status?: "available" | "occupied" | "reserved" | "cleaning";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          table_number?: number;
          seats?: number;
          status?: "available" | "occupied" | "reserved" | "cleaning";
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          table_id: string;
          customer_name: string | null;
          status: "pending" | "preparing" | "ready" | "served" | "cancelled";
          total_amount: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          table_id: string;
          customer_name?: string | null;
          status?: "pending" | "preparing" | "ready" | "served" | "cancelled";
          total_amount: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          table_id?: string;
          customer_name?: string | null;
          status?: "pending" | "preparing" | "ready" | "served" | "cancelled";
          total_amount?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          menu_item_id: string;
          quantity: number;
          unit_price: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          menu_item_id: string;
          quantity: number;
          unit_price: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          menu_item_id?: string;
          quantity?: number;
          unit_price?: number;
          notes?: string | null;
          created_at?: string;
        };
      };
      inventory_items: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: "ingredients" | "beverages" | "supplies" | "equipment";
          current_stock: number;
          min_stock: number;
          max_stock: number;
          unit: string;
          unit_price: number;
          supplier: string | null;
          last_restocked: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          category: "ingredients" | "beverages" | "supplies" | "equipment";
          current_stock: number;
          min_stock: number;
          max_stock: number;
          unit: string;
          unit_price: number;
          supplier?: string | null;
          last_restocked?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          category?: "ingredients" | "beverages" | "supplies" | "equipment";
          current_stock?: number;
          min_stock?: number;
          max_stock?: number;
          unit?: string;
          unit_price?: number;
          supplier?: string | null;
          last_restocked?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      table_status: "available" | "occupied" | "reserved" | "cleaning";
      order_status: "pending" | "preparing" | "ready" | "served" | "cancelled";
      inventory_category:
        | "ingredients"
        | "beverages"
        | "supplies"
        | "equipment";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
