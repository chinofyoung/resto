"use client";

import { useState, useEffect } from "react";
import { getTables, getTableStats } from "@/lib/api/tables";
import { getMenuItems, getPopularMenuItems } from "@/lib/api/menu";
import { getInventoryStats } from "@/lib/api/inventory";
import { getOrderStats } from "@/lib/api/orders";

// This is a demo component showing how to integrate Supabase APIs
// You can use these patterns in your existing pages

interface Table {
  id: string;
  table_number: number;
  seats: number;
  status: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  image_url?: string | null;
  prep_time?: number;
  [key: string]: unknown;
}

interface Stats {
  total?: number;
  available?: number;
  occupied?: number;
  totalItems?: number;
  lowStockItems?: number;
  todayRevenue?: number;
  [key: string]: unknown;
}

export default function SupabaseDemo() {
  const [tables, setTables] = useState<Table[]>([]);
  const [tableStats, setTableStats] = useState<Stats>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [inventoryStats, setInventoryStats] = useState<Stats>({});
  const [orderStats, setOrderStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all data in parallel for better performance
        const [
          tablesData,
          tableStatsData,
          menuItemsData,
          popularItemsData,
          inventoryStatsData,
          orderStatsData,
        ] = await Promise.all([
          getTables(),
          getTableStats(),
          getMenuItems(),
          getPopularMenuItems(),
          getInventoryStats(),
          getOrderStats(),
        ]);

        setTables(tablesData);
        setTableStats(tableStatsData);
        setMenuItems(menuItemsData);
        setPopularItems(popularItemsData);
        setInventoryStats(inventoryStatsData);
        setOrderStats(orderStatsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Failed to load data. Please check your Supabase configuration."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">
            Database Connection Error
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="bg-red-100 rounded p-4 text-sm text-red-700">
            <p className="font-semibold mb-2">To fix this:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Create a Supabase project at{" "}
                <a href="https://supabase.com" className="underline">
                  supabase.com
                </a>
              </li>
              <li>
                Run the SQL schema from{" "}
                <code className="bg-red-200 px-1 rounded">
                  supabase/schema.sql
                </code>
              </li>
              <li>
                Add your credentials to{" "}
                <code className="bg-red-200 px-1 rounded">.env.local</code>
              </li>
              <li>Restart your development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Supabase Integration Demo
        </h2>
        <p className="text-gray-600">
          This demonstrates real-time data from your Supabase database
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tables</h3>
          <div className="text-2xl font-bold text-gray-900">
            {tableStats.total || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {tableStats.available || 0} available, {tableStats.occupied || 0}{" "}
            occupied
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Menu Items</h3>
          <div className="text-2xl font-bold text-gray-900">
            {menuItems.length}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {popularItems.length} popular items
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Inventory</h3>
          <div className="text-2xl font-bold text-gray-900">
            {inventoryStats.totalItems || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {inventoryStats.lowStockItems || 0} low stock
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Today&apos;s Orders
          </h3>
          <div className="text-2xl font-bold text-gray-900">
            {orderStats.total || 0}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            ${orderStats.todayRevenue?.toFixed(2) || "0.00"} revenue
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Restaurant Tables
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`
                p-4 rounded-lg border-2 text-center
                ${
                  table.status === "available"
                    ? "border-green-200 bg-green-50"
                    : ""
                }
                ${table.status === "occupied" ? "border-red-200 bg-red-50" : ""}
                ${
                  table.status === "reserved"
                    ? "border-yellow-200 bg-yellow-50"
                    : ""
                }
                ${
                  table.status === "cleaning"
                    ? "border-gray-200 bg-gray-50"
                    : ""
                }
              `}
            >
              <div className="text-xl font-bold text-gray-900">
                {table.table_number}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {table.seats} seats
              </div>
              <div
                className={`
                  text-xs px-2 py-1 rounded capitalize
                  ${
                    table.status === "available"
                      ? "bg-green-100 text-green-700"
                      : ""
                  }
                  ${
                    table.status === "occupied" ? "bg-red-100 text-red-700" : ""
                  }
                  ${
                    table.status === "reserved"
                      ? "bg-yellow-100 text-yellow-700"
                      : ""
                  }
                  ${
                    table.status === "cleaning"
                      ? "bg-gray-100 text-gray-700"
                      : ""
                  }
                `}
              >
                {table.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Menu Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Popular Menu Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <img
                src={item.image_url || ""}
                alt={item.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary-600">
                  ${item.price}
                </span>
                <span className="text-sm text-gray-500">
                  {item.prep_time} min
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-blue-800 font-semibold mb-3">
          🚀 How to integrate this into your pages:
        </h3>
        <div className="text-blue-700 text-sm space-y-2">
          <p>
            1. Import the API functions:{" "}
            <code className="bg-blue-100 px-1 rounded">
              import {`{ getTables }`} from &apos;@/lib/api/tables&apos;
            </code>
          </p>
          <p>
            2. Use React hooks to manage state:{" "}
            <code className="bg-blue-100 px-1 rounded">
              const [tables, setTables] = useState([])
            </code>
          </p>
          <p>
            3. Fetch data in useEffect:{" "}
            <code className="bg-blue-100 px-1 rounded">
              useEffect(() =&gt; {`{ fetchData() }`}, [])
            </code>
          </p>
          <p>
            4. Replace static data in your existing components with the fetched
            data
          </p>
          <p>5. Add error handling and loading states for better UX</p>
        </div>
      </div>
    </div>
  );
}
