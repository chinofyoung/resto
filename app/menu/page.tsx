"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Clock,
  Tag,
  Search,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  getMenuItems,
  getCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "@/lib/api/menu";

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
  ingredients: string[] | null;
  calories?: number | null;
  spice_level?: number | null;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface NewMenuItem {
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url: string;
  prep_time: number;
  is_popular: boolean;
  is_available: boolean;
  ingredients: string[];
  calories?: number;
  spice_level?: number;
}

export default function MenuManagement() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [currentIngredient, setCurrentIngredient] = useState("");

  // Data from Supabase
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newItem, setNewItem] = useState<NewMenuItem>({
    name: "",
    description: "",
    price: 0,
    category_id: "",
    image_url: "",
    prep_time: 15,
    is_popular: false,
    is_available: true,
    ingredients: [],
    calories: 0,
    spice_level: 0,
  });

  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [menuData, categoriesData] = await Promise.all([
          getMenuItems(),
          getCategories(),
        ]);

        setMenuItems(menuData || []);
        setCategories(categoriesData || []);

        // Set default category for new items
        if (categoriesData && categoriesData.length > 0) {
          setNewItem((prev) => ({
            ...prev,
            category_id: categoriesData[0].id,
          }));
        }
      } catch (err) {
        console.error("Error loading menu data:", err);
        setError(
          "Failed to load menu data. Please check your Supabase connection."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Create categories with counts for filtering
  const categoriesWithCounts = [
    { id: "all", name: "All Items", count: menuItems.length },
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

  const handleAddItem = async () => {
    if (
      !newItem.name ||
      !newItem.description ||
      !newItem.price ||
      !newItem.category_id
    )
      return;

    try {
      const createdItem = await createMenuItem(newItem);
      if (createdItem) {
        setMenuItems([...menuItems, createdItem]);
        resetForm();
        setShowAddModal(false);
      }
    } catch (err) {
      console.error("Error creating menu item:", err);
      setError("Failed to create menu item");
    }
  };

  const handleEditItem = async () => {
    if (
      !editingItem ||
      !editingItem.name ||
      !editingItem.description ||
      !editingItem.price
    )
      return;

    try {
      const updatedItem = await updateMenuItem(editingItem.id, editingItem);
      if (updatedItem) {
        setMenuItems(
          menuItems.map((item) =>
            item.id === editingItem.id ? updatedItem : item
          )
        );
        setEditingItem(null);
      }
    } catch (err) {
      console.error("Error updating menu item:", err);
      setError("Failed to update menu item");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      await deleteMenuItem(id);
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting menu item:", err);
      setError("Failed to delete menu item");
    }
  };

  const resetForm = () => {
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category_id: categories.length > 0 ? categories[0].id : "",
      image_url: "",
      prep_time: 15,
      is_popular: false,
      is_available: true,
      ingredients: [],
      calories: 0,
      spice_level: 0,
    });
    setCurrentIngredient("");
  };

  const addIngredient = (ingredient: string, isEditing = false) => {
    if (!ingredient.trim()) return;

    if (isEditing && editingItem) {
      setEditingItem({
        ...editingItem,
        ingredients: [...(editingItem.ingredients || []), ingredient.trim()],
      });
    } else {
      setNewItem({
        ...newItem,
        ingredients: [...newItem.ingredients, ingredient.trim()],
      });
    }
    setCurrentIngredient("");
  };

  const removeIngredient = (index: number, isEditing = false) => {
    if (isEditing && editingItem) {
      setEditingItem({
        ...editingItem,
        ingredients: (editingItem.ingredients || []).filter(
          (_, i) => i !== index
        ),
      });
    } else {
      setNewItem({
        ...newItem,
        ingredients: newItem.ingredients.filter((_, i) => i !== index),
      });
    }
  };

  const getStats = () => {
    const totalItems = menuItems.length;
    const popularItems = menuItems.filter((item) => item.is_popular).length;
    const unavailableItems = menuItems.filter(
      (item) => !item.is_available
    ).length;
    const avgPrice =
      menuItems.length > 0
        ? (
            menuItems.reduce((sum, item) => sum + item.price, 0) /
            menuItems.length
          ).toFixed(2)
        : "0.00";

    return { totalItems, popularItems, unavailableItems, avgPrice };
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header title="Menu Management" />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading menu...</p>
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
          <Header title="Menu Management" />
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

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          title="Menu Management"
          rightContent={
            <button
              onClick={() => setShowAddModal(true)}
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
                  <span className="text-primary-600 text-xl">🍽️</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Popular Items
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.popularItems}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-xl">⭐</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Unavailable
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.unavailableItems}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-xl">❌</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Price
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₱{stats.avgPrice}
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
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-2 overflow-x-auto">
                {categoriesWithCounts.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category.id
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

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-44">
                  <img
                    src={item.image_url || "/placeholder-food.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    {item.is_popular && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                        ⭐ Popular
                      </span>
                    )}
                    {!item.is_available && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section - Flex grow to push buttons to bottom */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Header with title and price */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight flex-1 mr-2">
                      {item.name}
                    </h3>
                    <span className="text-xl font-bold text-primary-600 whitespace-nowrap">
                      ₱{item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Description - Fixed height for consistency */}
                  <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden leading-5">
                    {item.description || "No description available"}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4 py-2 bg-gray-50 rounded-lg px-3">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{item.prep_time} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag size={12} />
                      <span className="truncate max-w-20">
                        {getCategoryName(item.category_id)}
                      </span>
                    </div>
                    {item.calories && (
                      <div className="flex items-center space-x-1">
                        <span>🔥</span>
                        <span>{item.calories} cal</span>
                      </div>
                    )}
                  </div>

                  {/* Ingredients - Fixed height section */}
                  <div className="mb-4 h-8 flex items-start">
                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.ingredients
                          .slice(0, 2)
                          .map((ingredient, index) => (
                            <span
                              key={index}
                              className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-xs font-medium"
                            >
                              {ingredient}
                            </span>
                          ))}
                        {item.ingredients.length > 2 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                            +{item.ingredients.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action buttons - Always at bottom */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex-1 bg-primary-600 text-white py-2.5 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                      >
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-400 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No menu items found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery
                  ? "Try adjusting your search criteria"
                  : "Start by adding your first menu item"}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add Menu Item
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New Menu Item
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
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
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price === 0 ? "" : newItem.price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price:
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
                  Description *
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe the menu item"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newItem.category_id}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category_id: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={newItem.prep_time === 0 ? "" : newItem.prep_time}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        prep_time:
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newItem.image_url}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image_url: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={newItem.calories === 0 ? "" : newItem.calories}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        calories:
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="250"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spice Level (0-5)
                  </label>
                  <select
                    value={newItem.spice_level}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        spice_level: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value={0}>0 - Not Spicy</option>
                    <option value={1}>1 - Mild</option>
                    <option value={2}>2 - Medium</option>
                    <option value={3}>3 - Hot</option>
                    <option value={4}>4 - Very Hot</option>
                    <option value={5}>5 - Extremely Hot</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addIngredient(currentIngredient);
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Add ingredient"
                  />
                  <button
                    type="button"
                    onClick={() => addIngredient(currentIngredient)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newItem.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{ingredient}</span>
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newItem.is_popular}
                    onChange={(e) =>
                      setNewItem({ ...newItem, is_popular: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Popular Item
                  </span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newItem.is_available}
                    onChange={(e) =>
                      setNewItem({ ...newItem, is_available: e.target.checked })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Available
                  </span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                disabled={
                  !newItem.name || !newItem.description || !newItem.price
                }
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Menu Item
                </h2>
                <button
                  onClick={() => setEditingItem(null)}
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
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={editingItem.description || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingItem.category_id}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category_id: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={editingItem.prep_time}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        prep_time: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editingItem.image_url || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      image_url: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={editingItem.calories || ""}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        calories:
                          e.target.value === ""
                            ? null
                            : parseInt(e.target.value) || null,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spice Level (0-5)
                  </label>
                  <select
                    value={editingItem.spice_level || 0}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        spice_level: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value={0}>0 - Not Spicy</option>
                    <option value={1}>1 - Mild</option>
                    <option value={2}>2 - Medium</option>
                    <option value={3}>3 - Hot</option>
                    <option value={4}>4 - Very Hot</option>
                    <option value={5}>5 - Extremely Hot</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingredients
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addIngredient(currentIngredient, true);
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Add ingredient"
                  />
                  <button
                    type="button"
                    onClick={() => addIngredient(currentIngredient, true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editingItem.ingredients || []).map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{ingredient}</span>
                      <button
                        type="button"
                        onClick={() => removeIngredient(index, true)}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingItem.is_popular}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        is_popular: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Popular Item
                  </span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingItem.is_available}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        is_available: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Available
                  </span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditItem}
                disabled={
                  !editingItem.name ||
                  !editingItem.description ||
                  !editingItem.price
                }
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
