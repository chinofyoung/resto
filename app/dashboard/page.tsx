"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Calendar,
  Users,
  BookOpen,
  Clock,
  Settings,
  HelpCircle,
  Search,
  Star,
  Sun,
  CheckCircle2,
  Plus,
  MoreHorizontal,
  ShoppingCart,
  Bell,
  User,
  StickyNote,
  ArrowRight,
  UtensilsCrossed,
  Package,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const router = useRouter();

  const sidebarItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "orders", icon: UtensilsCrossed, label: "Orders" },
    { id: "inventory", icon: Package, label: "Inventory" },
  ];

  // Table data with status
  const tables = [
    { id: 1, seats: 2, status: "available", customer: null, orderTime: null },
    {
      id: 2,
      seats: 4,
      status: "occupied",
      customer: "Smith Family",
      orderTime: "45 min",
    },
    { id: 3, seats: 2, status: "available", customer: null, orderTime: null },
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
    { id: 6, seats: 2, status: "available", customer: null, orderTime: null },
    { id: 7, seats: 8, status: "available", customer: null, orderTime: null },
    {
      id: 8,
      seats: 4,
      status: "occupied",
      customer: "Davis Family",
      orderTime: "15 min",
    },
    { id: 9, seats: 2, status: "available", customer: null, orderTime: null },
    { id: 10, seats: 4, status: "cleaning", customer: null, orderTime: null },
    { id: 11, seats: 2, status: "available", customer: null, orderTime: null },
    { id: 12, seats: 6, status: "available", customer: null, orderTime: null },
  ];

  const mealCards = [
    {
      title: "Red Bread & Jam",
      time: "3h",
      calories: "250cal",
      image: "🍞",
      color: "bg-pink-100",
      textColor: "text-pink-800",
    },
    {
      title: "Grilled Chicken",
      time: "4m",
      calories: "250cal",
      image: "🍗",
      color: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      title: "Cashew Nut Salad",
      time: "4m",
      calories: "250cal",
      image: "🥗",
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
    },
  ];

  const upcomingTasks = [
    {
      name: "Avocado toast",
      calories: "250cal",
      ingredients: "Avocado, Bread, Eggs",
      time: "15min",
      status: "in-progress",
    },
    {
      name: "Alfredo Pasta",
      calories: "400cal",
      ingredients: "Alfredo, Chicken, Pasta",
      time: "20min",
      status: "to-do",
    },
    {
      name: "Quinoa Salad",
      calories: "200cal",
      ingredients: "Carrot, Tomato, Mints",
      time: "10min",
      status: "cancelled",
    },
    {
      name: "Grilled Chicken",
      calories: "250cal",
      ingredients: "Chicken, Spices, Oil",
      time: "30min",
      status: "to-do",
    },
  ];

  const shoppingList = [
    { name: "Eggs", quantity: "2 dozens", checked: true },
    { name: "Chicken breast", quantity: "1.5kg", checked: true },
    { name: "Cheese", quantity: "500gm", checked: true },
    { name: "Milk", quantity: "1ltr", checked: false },
    { name: "Chocolate", quantity: "2 pc", checked: false },
    { name: "Bread", quantity: "4pc", checked: false },
    { name: "Potatoes", quantity: "3kg", checked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header title="Resto" searchPlaceholder="Search anything" />

        <div className="flex-1 flex">
          {/* Main Dashboard Content */}
          <div className="flex-1 p-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">
                  Elevate Your Culinary
                  <br />
                  Experience with Resto
                </h2>
                <p className="text-emerald-100 mb-6 max-w-lg">
                  Explore recipes, plan your week, and shop seamlessly. Elevate
                  your dining experience effortlessly.
                  <br />
                  From curated recipes to nutrition insights, we've cracked the
                  code for a tasteful journey in every bite.
                </p>
                <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                  Get started
                </button>
              </div>
            </div>

            {/* Table Selection Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Table Selection
                  </h3>
                  <p className="text-gray-600">
                    Choose a table for your customer
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Occupied</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Reserved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Cleaning</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {tables.map((table) => (
                  <button
                    key={table.id}
                    onClick={() =>
                      table.status === "available" && setSelectedTable(table.id)
                    }
                    disabled={table.status !== "available"}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-200
                      ${
                        selectedTable === table.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-gray-300"
                      }
                      ${
                        table.status === "available"
                          ? "bg-white hover:bg-gray-50 cursor-pointer"
                          : "cursor-not-allowed"
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
                    {/* Status indicator */}
                    <div
                      className={`
                      absolute top-2 right-2 w-3 h-3 rounded-full
                      ${table.status === "available" ? "bg-green-500" : ""}
                      ${table.status === "occupied" ? "bg-red-500" : ""}
                      ${table.status === "reserved" ? "bg-yellow-500" : ""}
                      ${table.status === "cleaning" ? "bg-gray-500" : ""}
                    `}
                    ></div>

                    {/* Table number */}
                    <div className="text-center">
                      <div
                        className={`
                        text-2xl font-bold mb-1
                        ${
                          table.status === "available"
                            ? "text-gray-900"
                            : "text-gray-600"
                        }
                        ${selectedTable === table.id ? "text-emerald-600" : ""}
                      `}
                      >
                        {table.id}
                      </div>

                      {/* Seats info */}
                      <div
                        className={`
                        text-xs mb-2
                        ${
                          table.status === "available"
                            ? "text-gray-500"
                            : "text-gray-400"
                        }
                      `}
                      >
                        {table.seats} seats
                      </div>

                      {/* Customer/status info */}
                      {table.customer && (
                        <div className="text-xs text-gray-600 mb-1">
                          {table.customer}
                        </div>
                      )}

                      {table.orderTime && (
                        <div
                          className={`
                          text-xs px-2 py-1 rounded
                          ${
                            table.status === "occupied"
                              ? "bg-red-100 text-red-700"
                              : ""
                          }
                          ${
                            table.status === "reserved"
                              ? "bg-yellow-100 text-yellow-700"
                              : ""
                          }
                        `}
                        >
                          {table.orderTime}
                        </div>
                      )}

                      {table.status === "cleaning" && (
                        <div className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                          Cleaning
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected table info */}
              {selectedTable && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-emerald-900">
                        Table {selectedTable} Selected
                      </h4>
                      <p className="text-sm text-emerald-700">
                        {tables.find((t) => t.id === selectedTable)?.seats}{" "}
                        seats available
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push("/orders")}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Start Order
                      </button>
                      <button
                        onClick={() => setSelectedTable(null)}
                        className="px-4 py-2 bg-white border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Your Meal Today Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-bold">16</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Popular Items Today
                    </h3>
                    <p className="text-gray-600">May</p>
                  </div>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Details
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mealCards.map((meal, index) => (
                  <div
                    key={index}
                    className={`${meal.color} rounded-2xl p-6 relative overflow-hidden`}
                  >
                    <div className="mb-4">
                      <h4
                        className={`text-lg font-semibold ${meal.textColor} mb-2`}
                      >
                        {meal.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`${meal.textColor} opacity-75`}>
                          ⏱ {meal.time}
                        </span>
                        <span className={`${meal.textColor} opacity-75`}>
                          🔥 {meal.calories}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <button
                        className={`${meal.textColor} bg-white/50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/70 transition-colors`}
                      >
                        See recipe
                      </button>
                      <div className="text-3xl opacity-50">{meal.image}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upcoming task
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="text-emerald-600 hover:text-emerald-700">
                    All Tasks
                  </button>
                  <Plus size={16} className="text-emerald-600" />
                </div>
              </div>

              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          task.status === "in-progress"
                            ? "bg-blue-500"
                            : task.status === "to-do"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {task.name}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{task.calories}</span>
                          <span>{task.ingredients}</span>
                          <span>{task.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          task.status === "in-progress"
                            ? "bg-blue-100 text-blue-700"
                            : task.status === "to-do"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {task.status === "in-progress"
                          ? "In progress"
                          : task.status === "to-do"
                          ? "To do"
                          : "Cancelled"}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 p-8 space-y-6">
            {/* Shopping List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <ShoppingCart size={20} className="text-gray-700" />
                  <h3 className="font-semibold text-gray-900">Shopping list</h3>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 text-sm">
                  See all
                </button>
              </div>

              <div className="space-y-3">
                {shoppingList.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2
                      size={16}
                      className={
                        item.checked ? "text-emerald-500" : "text-gray-300"
                      }
                    />
                    <span
                      className={`flex-1 ${
                        item.checked
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors">
                Shop now
              </button>
            </div>

            {/* Offers */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">Offers for you</h3>
              <p className="text-green-100 text-sm mb-4">
                Personalized deals for you! Discover exclusive discounts and
                culinary delights.
              </p>

              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">$7</div>
                    <div className="text-green-100 text-sm">387-959-2490</div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 rounded px-2 py-1 text-xs">
                      FRESH & HEALTHY
                    </div>
                    <div className="text-green-100 text-xs mt-1">FOOD MENU</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Note */}
            <div className="bg-yellow-100 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <StickyNote size={20} className="text-yellow-600" />
                <h3 className="font-semibold text-yellow-800">Sticky Note</h3>
              </div>

              <div className="space-y-3 text-sm text-yellow-700">
                <p>
                  1. Try the "Mango Tango Smoothie" recipe for a refreshing
                  breakfast tomorrow!
                </p>
                <p>
                  2. Incorporate at least one plant-based meal into dinner
                  routine for a balanced diet.
                </p>
                <p>
                  3. Sauté spinach with garlic for an extra burst of flavor in
                  my favorite dishes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
