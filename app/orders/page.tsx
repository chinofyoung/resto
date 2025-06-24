"use client";

import { useState } from "react";
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

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "appetizer" | "main" | "dessert" | "beverage" | "alcohol";
  image: string;
  prepTime: number;
  popular?: boolean;
}

interface OrderItem extends MenuItem {
  quantity: number;
  notes?: string;
}

interface Table {
  id: number;
  seats: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  customer?: string;
  orderTime?: string;
}

export default function Orders() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("orders");

  const tables: Table[] = [
    { id: 1, seats: 2, status: "available" },
    {
      id: 2,
      seats: 4,
      status: "occupied",
      customer: "Smith Family",
      orderTime: "45 min",
    },
    { id: 3, seats: 2, status: "available" },
    {
      id: 4,
      seats: 6,
      status: "reserved",
      customer: "Johnson Party",
      orderTime: "7:30 PM",
    },
    {
      id: 5,
      seats: 4,
      status: "occupied",
      customer: "Miller Group",
      orderTime: "25 min",
    },
    { id: 6, seats: 2, status: "available" },
    { id: 7, seats: 8, status: "available" },
    {
      id: 8,
      seats: 4,
      status: "occupied",
      customer: "Davis Family",
      orderTime: "15 min",
    },
    { id: 9, seats: 2, status: "available" },
    { id: 10, seats: 4, status: "cleaning" },
    { id: 11, seats: 2, status: "available" },
    { id: 12, seats: 6, status: "available" },
  ];

  const menuItems: MenuItem[] = [
    // Appetizers
    {
      id: 1,
      name: "Buffalo Wings",
      description: "Spicy chicken wings with blue cheese dip",
      price: 12.99,
      category: "appetizer",
      image:
        "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=200&fit=crop",
      prepTime: 15,
      popular: true,
    },
    {
      id: 2,
      name: "Mozzarella Sticks",
      description: "Crispy fried mozzarella with marinara sauce",
      price: 8.99,
      category: "appetizer",
      image:
        "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=300&h=200&fit=crop",
      prepTime: 10,
    },
    {
      id: 3,
      name: "Loaded Nachos",
      description: "Tortilla chips with cheese, jalapeños, and sour cream",
      price: 11.99,
      category: "appetizer",
      image:
        "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop",
      prepTime: 12,
    },

    // Main Courses
    {
      id: 4,
      name: "Grilled Chicken Breast",
      description: "Herb-seasoned chicken with roasted vegetables",
      price: 18.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=300&h=200&fit=crop",
      prepTime: 25,
      popular: true,
    },
    {
      id: 5,
      name: "Beef Burger Deluxe",
      description: "Angus beef patty with lettuce, tomato, and fries",
      price: 15.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      prepTime: 20,
    },
    {
      id: 6,
      name: "Salmon Fillet",
      description: "Grilled Atlantic salmon with lemon butter sauce",
      price: 22.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
      prepTime: 30,
    },
    {
      id: 7,
      name: "Pasta Carbonara",
      description: "Creamy pasta with bacon and parmesan cheese",
      price: 16.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
      prepTime: 18,
    },
    {
      id: 8,
      name: "Ribeye Steak",
      description: "12oz premium ribeye steak with garlic mashed potatoes",
      price: 28.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
      prepTime: 35,
    },

    // Desserts
    {
      id: 9,
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with vanilla ice cream",
      price: 7.99,
      category: "dessert",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop",
      prepTime: 8,
    },
    {
      id: 10,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: 6.99,
      category: "dessert",
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
      prepTime: 5,
    },
    {
      id: 11,
      name: "Cheesecake",
      description: "New York style cheesecake with berry compote",
      price: 6.99,
      category: "dessert",
      image:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300&h=200&fit=crop",
      prepTime: 5,
    },

    // Beverages
    {
      id: 12,
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 4.99,
      category: "beverage",
      image:
        "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop",
      prepTime: 3,
    },
    {
      id: 13,
      name: "Iced Coffee",
      description: "Cold brew coffee with ice",
      price: 3.99,
      category: "beverage",
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop",
      prepTime: 2,
    },
    {
      id: 14,
      name: "Mango Smoothie",
      description: "Fresh mango smoothie with yogurt",
      price: 5.99,
      category: "beverage",
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&h=200&fit=crop",
      prepTime: 5,
      popular: true,
    },
    {
      id: 15,
      name: "Coca Cola",
      description: "Classic Coca Cola",
      price: 2.99,
      category: "beverage",
      image:
        "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=200&fit=crop",
      prepTime: 1,
    },

    // Alcoholic Beverages
    {
      id: 16,
      name: "House Red Wine",
      description: "Glass of our signature red wine",
      price: 8.99,
      category: "alcohol",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=200&fit=crop",
      prepTime: 2,
    },
    {
      id: 17,
      name: "Craft Beer",
      description: "Local brewery IPA",
      price: 6.99,
      category: "alcohol",
      image:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=200&fit=crop",
      prepTime: 2,
    },
    {
      id: 18,
      name: "Mojito",
      description: "Classic mojito with fresh mint",
      price: 9.99,
      category: "alcohol",
      image:
        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=200&fit=crop",
      prepTime: 5,
    },
  ];

  const categories = [
    { id: "all", name: "All Items", count: menuItems.length },
    {
      id: "appetizer",
      name: "Appetizers",
      count: menuItems.filter((item) => item.category === "appetizer").length,
    },
    {
      id: "main",
      name: "Main Courses",
      count: menuItems.filter((item) => item.category === "main").length,
    },
    {
      id: "dessert",
      name: "Desserts",
      count: menuItems.filter((item) => item.category === "dessert").length,
    },
    {
      id: "beverage",
      name: "Beverages",
      count: menuItems.filter((item) => item.category === "beverage").length,
    },
    {
      id: "alcohol",
      name: "Alcohol",
      count: menuItems.filter((item) => item.category === "alcohol").length,
    },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
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

  const removeFromOrder = (itemId: number) => {
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

  const getItemQuantity = (itemId: number) => {
    const item = orderItems.find((orderItem) => orderItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const sidebarItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "orders", icon: UtensilsCrossed, label: "Orders" },
    { id: "inventory", icon: Package, label: "Inventory" },
  ];

  const headerSubtitle = selectedTable ? (
    <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 rounded-full">
      <Users size={16} className="text-emerald-600" />
      <span className="text-sm font-medium text-emerald-700">
        Table {selectedTable}
      </span>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
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
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200"
                      }
                      ${
                        table.status === "available"
                          ? "bg-white hover:bg-gray-50 cursor-pointer hover:border-emerald-300"
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
                          ? "text-emerald-600"
                          : "text-gray-900"
                      }
                    `}
                    >
                      {table.id}
                    </div>
                    <div className="text-xs text-gray-500">
                      {table.seats} seats
                    </div>

                    {/* Status indicator */}
                    <div
                      className={`
                      absolute top-1 right-1 w-2 h-2 rounded-full
                      ${table.status === "available" ? "bg-green-500" : ""}
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
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                      ${
                        activeCategory === category.id
                          ? "bg-emerald-500 text-white"
                          : "bg-white text-gray-700 hover:bg-emerald-50"
                      }
                    `}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`
                      text-xs px-2 py-1 rounded-full
                      ${
                        activeCategory === category.id
                          ? "bg-emerald-400 text-emerald-100"
                          : "bg-gray-100 text-gray-500"
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
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                        {item.popular && (
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full font-medium">
                            Popular
                          </div>
                        )}
                        <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                          <div className="text-sm font-bold text-emerald-600">
                            ${item.price}
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
                            {item.prepTime}m
                          </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Add to Order Controls */}
                        <div className="flex items-center justify-between">
                          {quantity > 0 ? (
                            <div className="flex items-center space-x-2 w-full">
                              <button
                                onClick={() => removeFromOrder(item.id)}
                                className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-200 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-medium text-gray-900 flex-1 text-center text-sm">
                                {quantity}
                              </span>
                              <button
                                onClick={() => addToOrder(item)}
                                className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ) : (
                            <div className="w-full flex justify-end">
                              <button
                                onClick={() => addToOrder(item)}
                                disabled={!selectedTable}
                                className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
                  <div className="flex items-center space-x-2 text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <Users size={16} />
                    <span>Table {selectedTable}</span>
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    No table selected
                  </div>
                )}
              </div>

              {!selectedTable ? (
                <div className="text-center py-8">
                  <Users size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">
                    Select a table first
                  </p>
                  <p className="text-sm text-gray-400">
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
                            ${item.price} each
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
                            className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
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
                      <span className="text-xl font-bold text-emerald-600">
                        ${getOrderTotal().toFixed(2)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                        Send to Kitchen
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
                    className="mx-auto text-gray-300 mb-4"
                  />
                  <p className="text-gray-500">No items in order yet</p>
                  <p className="text-sm text-gray-400">
                    Select items from the menu to get started
                  </p>
                </div>
              )}

              {/* Order Statistics */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-emerald-600">
                      {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </div>
                    <div className="text-xs text-emerald-700">Items</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-600">
                      {orderItems.length > 0
                        ? Math.max(...orderItems.map((item) => item.prepTime))
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
