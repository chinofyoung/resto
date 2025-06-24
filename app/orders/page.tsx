"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Minus,
  ShoppingCart,
  Clock,
  Users,
  X,
  Search,
  Filter,
  Home,
  BookOpen,
  Settings,
  HelpCircle,
  UtensilsCrossed,
  Star,
  Sun,
  Bell,
  User,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getTables, updateTableStatus } from "@/lib/api/tables";
import { getMenuItems, getCategories } from "@/lib/api/menu";
import { createOrder } from "@/lib/api/orders";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string;
  image_url: string | null;
  prep_time: number;
  is_popular: boolean;
  is_available: boolean;
  categories?: {
    id: string;
    name: string;
    description: string | null;
  };
}

interface OrderItem extends MenuItem {
  quantity: number;
  notes?: string;
}

interface Table {
  id: string;
  table_number: number;
  seats: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  customer_name?: string | null;
  order_time?: string | null;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
}

export default function Orders() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("orders");

  // Data from Supabase
  const [tables, setTables] = useState<Table[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [tablesData, menuData, categoriesData] = await Promise.all([
          getTables(),
          getMenuItems(),
          getCategories(),
        ]);

        setTables(tablesData);
        setMenuItems(menuData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please check your Supabase connection.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Create categories with counts for filtering
  const categoriesWithCounts = [
    {
      id: "all",
      name: "All Items",
      count: menuItems.length,
    },
    ...categories.map((cat) => ({
      ...cat,
      count: menuItems.filter((item) => item.category_id === cat.id).length,
    })),
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category_id === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const addToOrder = (item: MenuItem) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.id === item.id
    );
    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (itemId: string) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.id === itemId
    );
    if (existingItem && existingItem.quantity > 1) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === itemId
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        )
      );
    } else {
      setOrderItems(orderItems.filter((orderItem) => orderItem.id !== itemId));
    }
  };

  const getOrderTotal = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getItemQuantity = (itemId: string) => {
    const item = orderItems.find((orderItem) => orderItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const submitOrder = async () => {
    if (!selectedTable || orderItems.length === 0) return;

    try {
      setSubmittingOrder(true);

      const orderData = {
        table_id: selectedTable,
        customer_name: `Table ${
          tables.find((t) => t.id === selectedTable)?.table_number
        }`,
        items: orderItems.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          notes: item.notes,
        })),
      };

      await createOrder(orderData);

      // Reset order state
      setOrderItems([]);
      setSelectedTable(null);

      // Refresh tables to show updated status
      const updatedTables = await getTables();
      setTables(updatedTables);

      alert("Order submitted successfully!");
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Failed to submit order. Please try again.");
    } finally {
      setSubmittingOrder(false);
    }
  };

  const sidebarItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "orders", icon: UtensilsCrossed, label: "Orders" },
    { id: "inventory", icon: Package, label: "Inventory" },
  ];

  const headerSubtitle = selectedTable ? (
    <div className="flex items-center space-x-2 px-3 py-1 bg-primary-100 rounded-full">
      <Users size={16} className="text-primary-600" />
      <span className="text-sm font-medium text-primary-700">
        Table {tables.find((t) => t.id === selectedTable)?.table_number}
      </span>
    </div>
  ) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-primary-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-primary-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-primary-50 to-cyan-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          title="Orders"
          subtitle={headerSubtitle}
          searchPlaceholder="Search menu items..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex-1 flex">
          {/* Main Content Area */}
          <div className="flex-1 p-6 pr-0">
            {/* Table Selection */}
            <div className="mb-6 pr-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Select Table
              </h2>
              <div className="grid grid-cols-6 lg:grid-cols-12 gap-3">
                {tables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() =>
                      table.status === "available" && setSelectedTable(table.id)
                    }
                    disabled={table.status !== "available"}
                    className={`
                      relative p-3 rounded-lg border-2 transition-all duration-200 text-center
                      ${
                        selectedTable === table.id
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200"
                      }
                      ${
                        table.status === "available"
                          ? "bg-white hover:bg-gray-50 cursor-pointer hover:border-primary-300"
                          : "cursor-not-allowed opacity-60"
                      }
                      ${
                        table.status === "occupied"
                          ? "bg-red-50 border-red-200"
                          : ""
                      }
                      ${
                        table.status === "reserved"
                          ? "bg-yellow-50 border-yellow-200"
                          : ""
                      }
                      ${
                        table.status === "cleaning"
                          ? "bg-gray-50 border-gray-200"
                          : ""
                      }
                    `}
                  >
                    <div
                      className={`
                      text-lg font-bold
                      ${
                        selectedTable === table.id
                          ? "text-primary-600"
                          : "text-gray-900"
                      }
                    `}
                    >
                      {table.table_number}
                    </div>
                    <div className="text-xs text-gray-500">
                      {table.seats} seats
                    </div>

                    {/* Status indicator */}
                    <div
                      className={`
                      absolute top-1 right-1 w-2 h-2 rounded-full
                      ${table.status === "available" ? "bg-primary-500" : ""}
                      ${table.status === "occupied" ? "bg-red-500" : ""}
                      ${table.status === "reserved" ? "bg-yellow-500" : ""}
                      ${table.status === "cleaning" ? "bg-gray-500" : ""}
                    `}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6 pr-6">
              <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                {categoriesWithCounts.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                      ${
                        activeCategory === category.id
                          ? "bg-primary-500"
                          : "bg-white hover:bg-primary-50"
                      }
                    `}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`
                      text-xs px-2 py-1 rounded-full text-white font-bold
                      ${
                        activeCategory === category.id
                          ? "bg-primary-400"
                          : "bg-slate-500"
                      }
                    `}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="pr-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {filteredItems.map((item) => {
                  const quantity = getItemQuantity(item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Food Image */}
                      <div className="relative h-32 w-full">
                        <Image
                          src={item.image_url || "/placeholder-food.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                        {item.is_popular && (
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full font-medium">
                            Popular
                          </div>
                        )}
                        <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                          <div className="text-sm font-bold text-primary-600">
                            ₱{item.price}
                          </div>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 text-sm truncate pr-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500 shrink-0">
                            <Clock size={10} className="mr-0.5" />
                            {item.prep_time}m
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                          {item.description || "No description available"}
                        </p>

                        {/* Add to Order Controls */}
                        <div className="flex items-center justify-between">
                          {quantity > 0 ? (
                            <div className="flex items-center space-x-2 w-full">
                              <button
                                onClick={() => removeFromOrder(item.id)}
                                className="w-7 h-7 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center hover:bg-primary-200 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-medium text-gray-900 flex-1 text-center text-sm">
                                {quantity}
                              </span>
                              <button
                                onClick={() => addToOrder(item)}
                                className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="w-full flex justify-end">
                              <button
                                onClick={() => addToOrder(item)}
                                disabled={!selectedTable}
                                className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar - Always Visible & Sticky */}
          <div className="w-80 bg-white border-l border-gray-200 sticky top-0 h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h3>
                {selectedTable ? (
                  <div className="flex items-center space-x-2 text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    <Users size={16} />
                    <span>
                      Table{" "}
                      {tables.find((t) => t.id === selectedTable)?.table_number}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                    No table selected
                  </div>
                )}
              </div>

              {!selectedTable ? (
                <div className="text-center py-8">
                  <Users size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-700 font-medium">
                    Select a table first
                  </p>
                  <p className="text-sm text-gray-600">
                    Choose an available table to start taking orders
                  </p>
                </div>
              ) : orderItems.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            ₱{item.price} each
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromOrder(item.id)}
                            className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-medium min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToOrder(item)}
                            className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-primary-600">
                        ₱{getOrderTotal().toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={submitOrder}
                        disabled={
                          submittingOrder ||
                          !selectedTable ||
                          orderItems.length === 0
                        }
                        className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {submittingOrder ? "Submitting..." : "Send to Kitchen"}
                      </button>
                      <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        Save Draft
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart
                    size={48}
                    className="mx-auto text-gray-400 mb-4"
                  />
                  <p className="text-gray-700">No items in order yet</p>
                  <p className="text-sm text-gray-600">
                    Select items from the menu to get started
                  </p>
                </div>
              )}

              {/* Order Statistics */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary-600">
                      {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </div>
                    <div className="text-xs text-primary-700">Items</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">
                      {orderItems.length > 0
                        ? Math.max(...orderItems.map((item) => item.prep_time))
                        : 0}
                    </div>
                    <div className="text-xs text-blue-700">Max Prep (min)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
