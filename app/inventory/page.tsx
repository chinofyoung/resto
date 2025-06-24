"use client";

import { useState, useEffect } from "react";
import {
  Home,
  UtensilsCrossed,
  Star,
  Sun,
  Bell,
  User,
  Search,
  Plus,
  Edit3,
  Trash2,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Users,
  Filter,
  X,
  Save,
  RotateCcw,
  Edit2,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getLowStockItems,
} from "@/lib/api/inventory";

interface InventoryItem {
  id: string;
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
  created_at: string;
  updated_at: string;
}

interface NewInventoryItem {
  name: string;
  description?: string;
  category: "ingredients" | "beverages" | "supplies" | "equipment";
  current_stock: number;
  min_stock: number;
  max_stock: number;
  unit: string;
  unit_price: number;
  supplier?: string;
}

export default function Inventory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Data from Supabase
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newItem, setNewItem] = useState<NewInventoryItem>({
    name: "",
    description: "",
    category: "ingredients",
    current_stock: 0,
    min_stock: 0,
    max_stock: 0,
    unit: "",
    unit_price: 0,
    supplier: "",
  });

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

        const data = await getInventoryItems();
        setInventoryItems(data || []);
      } catch (err) {
        console.error("Error loading inventory data:", err);
        setError(
          "Failed to load inventory data. Please check your Supabase connection."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const categories = [
    { id: "all", name: "All Items", count: inventoryItems.length },
    {
      id: "ingredients",
      name: "Ingredients",
      count: inventoryItems.filter((item) => item.category === "ingredients")
        .length,
    },
    {
      id: "beverages",
      name: "Beverages",
      count: inventoryItems.filter((item) => item.category === "beverages")
        .length,
    },
    {
      id: "supplies",
      name: "Supplies",
      count: inventoryItems.filter((item) => item.category === "supplies")
        .length,
    },
    {
      id: "equipment",
      name: "Equipment",
      count: inventoryItems.filter((item) => item.category === "equipment")
        .length,
    },
  ];

  const filteredItems = inventoryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.supplier &&
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStockStatus = (item: InventoryItem) => {
    if (item.current_stock === 0) return "out-of-stock";
    if (item.current_stock <= item.min_stock) return "low-stock";
    return "in-stock";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "text-primary-600 bg-primary-50";
      case "low-stock":
        return "text-yellow-600 bg-yellow-50";
      case "out-of-stock":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.unit || !newItem.supplier) return;

    try {
      const createdItem = await createInventoryItem(newItem);
      if (createdItem) {
        setInventoryItems([...inventoryItems, createdItem]);
        setNewItem({
          name: "",
          description: "",
          category: "ingredients",
          current_stock: 0,
          min_stock: 0,
          max_stock: 0,
          unit: "",
          unit_price: 0,
          supplier: "",
        });
        setShowAddForm(false);
      }
    } catch (err) {
      console.error("Error creating inventory item:", err);
      setError("Failed to create inventory item");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inventory item?"))
      return;

    try {
      await deleteInventoryItem(id);
      setInventoryItems(inventoryItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting inventory item:", err);
      setError("Failed to delete inventory item");
    }
  };

  const stats = {
    totalItems: inventoryItems.length,
    lowStock: inventoryItems.filter(
      (item) => getStockStatus(item) === "low-stock"
    ).length,
    outOfStock: inventoryItems.filter(
      (item) => getStockStatus(item) === "out-of-stock"
    ).length,
    totalValue: inventoryItems.reduce(
      (sum, item) => sum + item.current_stock * item.unit_price,
      0
    ),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Inventory Management" />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading inventory...</p>
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
          <Header title="Inventory Management" />
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
        <Header
          title="Inventory Management"
          rightContent={
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Item</span>
            </button>
          }
        />

        <div className="flex-1 p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalItems}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Package className="text-primary-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.lowStock}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Out of Stock
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.outOfStock}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <X className="text-red-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${stats.totalValue.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <span className="text-accent-600 text-xl">💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => {
                    const status = getStockStatus(item);
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            {item.description && (
                              <div className="text-sm text-gray-500">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.current_stock} {item.unit}
                          </div>
                          <div className="text-xs text-gray-500">
                            Min: {item.min_stock} | Max: {item.max_stock}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${item.unit_price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.supplier || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              status
                            )}`}
                          >
                            {status === "in-stock" && (
                              <CheckCircle size={12} className="mr-1" />
                            )}
                            {status === "low-stock" && (
                              <AlertTriangle size={12} className="mr-1" />
                            )}
                            {status === "out-of-stock" && (
                              <X size={12} className="mr-1" />
                            )}
                            {status === "in-stock"
                              ? "In Stock"
                              : status === "low-stock"
                              ? "Low Stock"
                              : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-500" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No inventory items
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery
                    ? "No items match your search."
                    : "Get started by adding your first inventory item."}
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Inventory Item
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Inventory Item
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="ingredients">Ingredients</option>
                    <option value="beverages">Beverages</option>
                    <option value="supplies">Supplies</option>
                    <option value="equipment">Equipment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Optional description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Stock *
                  </label>
                  <input
                    type="number"
                    value={
                      newItem.current_stock === 0 ? "" : newItem.current_stock
                    }
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        current_stock:
                          e.target.value === ""
                            ? 0
                            : parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Stock *
                  </label>
                  <input
                    type="number"
                    value={newItem.min_stock === 0 ? "" : newItem.min_stock}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        min_stock:
                          e.target.value === ""
                            ? 0
                            : parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Stock *
                  </label>
                  <input
                    type="number"
                    value={newItem.max_stock === 0 ? "" : newItem.max_stock}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        max_stock:
                          e.target.value === ""
                            ? 0
                            : parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit *
                  </label>
                  <input
                    type="text"
                    value={newItem.unit}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unit: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="lbs, bottles, packs, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.unit_price === 0 ? "" : newItem.unit_price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        unit_price:
                          e.target.value === ""
                            ? 0
                            : parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier
                </label>
                <input
                  type="text"
                  value={newItem.supplier}
                  onChange={(e) =>
                    setNewItem({ ...newItem, supplier: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Supplier name"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                disabled={!newItem.name || !newItem.unit}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
