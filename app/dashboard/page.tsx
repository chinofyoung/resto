"use client";

import { useState, useEffect } from "react";
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
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  FileText,
  Calendar as CalendarIcon,
  Activity,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { getTables, getTableStats } from "@/lib/api/tables";
import { getMenuItems } from "@/lib/api/menu";

interface Table {
  id: string;
  table_number: number;
  seats: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  customer?: string | null;
  orderTime?: string | null;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  prep_time: number;
  calories?: number | null;
  is_popular: boolean;
  is_available: boolean;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const sidebarItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "orders", icon: UtensilsCrossed, label: "Orders" },
    { id: "inventory", icon: Package, label: "Inventory" },
  ];

  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // Load tables and popular menu items in parallel
        const [tablesData, menuData] = await Promise.all([
          getTables(),
          getMenuItems(),
        ]);

        setTables(tablesData || []);

        // Filter popular items and limit to 3 for dashboard
        const popular =
          menuData?.filter((item) => item.is_popular).slice(0, 3) || [];
        setPopularItems(popular);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(
          "Failed to load dashboard data. Please check your Supabase connection."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Table data with status
  const tablesData = [
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
      color: "bg-primary-100",
      textColor: "text-primary-800",
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Resto" searchPlaceholder="Search anything" />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Resto" searchPlaceholder="Search anything" />
          <div className="flex-1 flex items-center justify-center">
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
        </div>
      </div>
    );
  }

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
            <div
              className="bg-primary-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
              }}
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full translate-y-4 -translate-x-4"></div>
                <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                  Elevate Your Culinary
                  <br />
                  Experience with Resto
                </h2>
                <p className="text-white/90 mb-6 max-w-lg drop-shadow-sm">
                  Explore recipes, plan your week, and shop seamlessly. Elevate
                  your dining experience effortlessly.
                  <br />
                  From curated recipes to nutrition insights, we've cracked the
                  code for a tasteful journey in every bite.
                </p>
                <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors shadow-md">
                  Get started
                </button>
              </div>
            </div>

            {/* Sales & Analytics Stats */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Sales & Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Today's Sales */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="text-emerald-600" size={24} />
                    </div>
                    <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      +12.5%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Today's Sales
                    </p>
                    <p className="text-2xl font-bold text-gray-800">$2,847</p>
                    <p className="text-xs text-gray-500 mt-1">
                      vs $2,531 yesterday
                    </p>
                  </div>
                </div>

                {/* This Week */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="text-blue-600" size={24} />
                    </div>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      +8.2%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      This Week
                    </p>
                    <p className="text-2xl font-bold text-gray-800">$19,247</p>
                    <p className="text-xs text-gray-500 mt-1">7 days revenue</p>
                  </div>
                </div>

                {/* This Month */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="text-purple-600" size={24} />
                    </div>
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      +15.3%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      This Month
                    </p>
                    <p className="text-2xl font-bold text-gray-800">$73,891</p>
                    <p className="text-xs text-gray-500 mt-1">
                      30 days revenue
                    </p>
                  </div>
                </div>

                {/* Active Orders */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Activity className="text-orange-600" size={24} />
                    </div>
                    <span className="text-xs text-gray-500">Live</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-800">23</p>
                    <p className="text-xs text-gray-500 mt-1">
                      8 in kitchen, 15 served
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Alerts */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Inventory Alerts
                </h3>
                <button
                  onClick={() => router.push("/inventory")}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Low Stock Alert */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="text-yellow-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-800 mb-1">
                        Low Stock Items
                      </h4>
                      <p className="text-sm text-yellow-700 mb-2">
                        5 items running low
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-yellow-700">
                            Chicken Breast
                          </span>
                          <span className="text-yellow-600 font-medium">
                            2.5kg left
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-yellow-700">
                            Fresh Tomatoes
                          </span>
                          <span className="text-yellow-600 font-medium">
                            1.2kg left
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-yellow-700">Olive Oil</span>
                          <span className="text-yellow-600 font-medium">
                            500ml left
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Out of Stock Alert */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="text-red-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-800 mb-1">
                        Out of Stock
                      </h4>
                      <p className="text-sm text-red-700 mb-2">
                        2 items need immediate attention
                      </p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-red-700">Fresh Salmon</span>
                          <span className="text-red-600 font-medium">0kg</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-red-700">Parmesan Cheese</span>
                          <span className="text-red-600 font-medium">0kg</span>
                        </div>
                      </div>
                      <button className="mt-2 text-xs text-red-600 font-medium hover:text-red-700">
                        Order Now →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Items Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Popular Items
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <img
                          src={item.image_url || "/placeholder-food.jpg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">
                          ${item.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.prep_time}min
                        </div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description || "No description available"}
                    </p>
                    {item.calories && (
                      <div className="text-xs text-gray-500">
                        {item.calories} calories
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Upcoming Tasks
              </h3>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                          task.status === "in-progress"
                            ? "bg-blue-500"
                            : task.status === "to-do"
                            ? "bg-gray-400"
                            : "bg-red-500"
                        }`}
                      >
                        {task.status === "in-progress"
                          ? "⏳"
                          : task.status === "to-do"
                          ? "📋"
                          : "❌"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {task.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {task.ingredients}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">
                        {task.time}
                      </div>
                      <div className="text-xs text-gray-500">
                        {task.calories}
                      </div>
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
                  <h3 className="font-semibold text-gray-800">Shopping list</h3>
                </div>
                <button className="text-primary-600 hover:text-primary-700 text-sm">
                  See all
                </button>
              </div>

              <div className="space-y-3">
                {shoppingList.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2
                      size={16}
                      className={
                        item.checked ? "text-primary-500" : "text-gray-500"
                      }
                    />
                    <span
                      className={`flex-1 ${
                        item.checked
                          ? "line-through text-gray-600"
                          : "text-gray-800"
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

              <button className="w-full mt-4 bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors">
                Shop now
              </button>
            </div>

            {/* Today's Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-2 text-gray-800">
                Today's Overview
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Quick snapshot of your restaurant performance today
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-lg font-bold text-gray-800">67</div>
                  <div className="text-gray-600 text-xs">Orders Completed</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-lg font-bold text-gray-800">4.8</div>
                  <div className="text-gray-600 text-xs">Avg Rating</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-lg font-bold text-gray-800">$42</div>
                  <div className="text-gray-600 text-xs">Avg Order Value</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="text-lg font-bold text-gray-800">18m</div>
                  <div className="text-gray-600 text-xs">Avg Prep Time</div>
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
