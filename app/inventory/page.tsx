"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface InventoryItem {
  id: number;
  name: string;
  category: "ingredients" | "beverages" | "supplies" | "equipment";
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  lastUpdated: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export default function Inventory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const sidebarItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "orders", icon: UtensilsCrossed, label: "Orders" },
    { id: "inventory", icon: Package, label: "Inventory" },
  ];

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Chicken Breast",
      category: "ingredients",
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      unit: "lbs",
      unitPrice: 6.99,
      supplier: "Fresh Foods Co",
      lastUpdated: "2024-01-15",
      status: "in-stock",
    },
    {
      id: 2,
      name: "Tomatoes",
      category: "ingredients",
      currentStock: 8,
      minStock: 15,
      maxStock: 40,
      unit: "lbs",
      unitPrice: 2.99,
      supplier: "Farm Fresh",
      lastUpdated: "2024-01-14",
      status: "low-stock",
    },
    {
      id: 3,
      name: "Mozzarella Cheese",
      category: "ingredients",
      currentStock: 0,
      minStock: 5,
      maxStock: 20,
      unit: "lbs",
      unitPrice: 8.99,
      supplier: "Dairy Direct",
      lastUpdated: "2024-01-13",
      status: "out-of-stock",
    },
    {
      id: 4,
      name: "Coca Cola",
      category: "beverages",
      currentStock: 120,
      minStock: 50,
      maxStock: 200,
      unit: "bottles",
      unitPrice: 1.25,
      supplier: "Beverage Wholesale",
      lastUpdated: "2024-01-15",
      status: "in-stock",
    },
    {
      id: 5,
      name: "Orange Juice",
      category: "beverages",
      currentStock: 18,
      minStock: 20,
      maxStock: 60,
      unit: "bottles",
      unitPrice: 3.99,
      supplier: "Fresh Squeeze Co",
      lastUpdated: "2024-01-14",
      status: "low-stock",
    },
    {
      id: 6,
      name: "Paper Napkins",
      category: "supplies",
      currentStock: 45,
      minStock: 25,
      maxStock: 100,
      unit: "packs",
      unitPrice: 12.99,
      supplier: "Restaurant Supply",
      lastUpdated: "2024-01-12",
      status: "in-stock",
    },
    {
      id: 7,
      name: "Disposable Cups",
      category: "supplies",
      currentStock: 150,
      minStock: 100,
      maxStock: 300,
      unit: "packs",
      unitPrice: 8.99,
      supplier: "Eco Supplies",
      lastUpdated: "2024-01-15",
      status: "in-stock",
    },
    {
      id: 8,
      name: "Coffee Beans",
      category: "ingredients",
      currentStock: 12,
      minStock: 15,
      maxStock: 40,
      unit: "lbs",
      unitPrice: 15.99,
      supplier: "Roast Masters",
      lastUpdated: "2024-01-13",
      status: "low-stock",
    },
  ]);

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "ingredients",
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: "",
    unitPrice: 0,
    supplier: "",
  });

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
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock === 0) return "out-of-stock";
    if (item.currentStock <= item.minStock) return "low-stock";
    return "in-stock";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "text-green-600 bg-green-50";
      case "low-stock":
        return "text-yellow-600 bg-yellow-50";
      case "out-of-stock":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.unit || !newItem.supplier) return;

    const item: InventoryItem = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category as any,
      currentStock: newItem.currentStock || 0,
      minStock: newItem.minStock || 0,
      maxStock: newItem.maxStock || 0,
      unit: newItem.unit,
      unitPrice: newItem.unitPrice || 0,
      supplier: newItem.supplier,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "in-stock",
    };

    setInventoryItems([...inventoryItems, item]);
    setNewItem({
      name: "",
      category: "ingredients",
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unit: "",
      unitPrice: 0,
      supplier: "",
    });
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: number) => {
    setInventoryItems(inventoryItems.filter((item) => item.id !== id));
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
      (sum, item) => sum + item.currentStock * item.unitPrice,
      0
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          title="Inventory"
          searchPlaceholder="Search inventory items..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          rightContent={
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Item</span>
            </button>
          }
        />

        <div className="flex-1 p-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Items</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalItems}
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Package className="text-emerald-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Low Stock</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats.lowStock}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
                  <p className="text-3xl font-bold text-red-600">
                    {stats.outOfStock}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ${stats.totalValue.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                    ${
                      selectedCategory === category.id
                        ? "bg-emerald-500 text-white"
                        : "bg-white/80 text-gray-700 hover:bg-emerald-50"
                    }
                  `}
                >
                  <span>{category.name}</span>
                  <span
                    className={`
                    text-xs px-2 py-1 rounded-full
                    ${
                      selectedCategory === category.id
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

          {/* Inventory Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Item
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Stock
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Unit Price
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Supplier
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Last Restocked
                    </th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className={
                        index % 2 === 0 ? "bg-white/50" : "bg-transparent"
                      }
                    >
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.unit}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium">{item.currentStock}</div>
                          <div className="text-sm text-gray-500">
                            Min: {item.minStock}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                            getStockStatus(item)
                          )}`}
                        >
                          {getStockStatus(item) === "in-stock" && "In Stock"}
                          {getStockStatus(item) === "low-stock" && "Low Stock"}
                          {getStockStatus(item) === "out-of-stock" &&
                            "Out of Stock"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium">
                          ${item.unitPrice.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-900">
                          {item.supplier}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">
                          {item.lastUpdated}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Item</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddItem();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="ingredients">Ingredients</option>
                    <option value="beverages">Beverages</option>
                    <option value="supplies">Supplies</option>
                    <option value="equipment">Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        currentStock: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Stock
                  </label>
                  <input
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        minStock: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Stock
                  </label>
                  <input
                    type="number"
                    value={newItem.maxStock}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        maxStock: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={newItem.unit}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unit: e.target.value })
                    }
                    placeholder="e.g., lbs, bottles, packs"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.unitPrice}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        unitPrice: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier
                  </label>
                  <input
                    type="text"
                    value={newItem.supplier}
                    onChange={(e) =>
                      setNewItem({ ...newItem, supplier: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
