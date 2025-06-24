"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Clock,
  DollarSign,
  Star,
  Upload,
  Tag,
} from "lucide-react";
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
  popular: boolean;
  available: boolean;
  ingredients: string[];
  allergens: string[];
  calories?: number;
  spicyLevel?: number; // 0-3 (0 = not spicy, 3 = very spicy)
}

export default function MenuManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "main",
    image: "",
    prepTime: 0,
    popular: false,
    available: true,
    ingredients: [],
    allergens: [],
    calories: 0,
    spicyLevel: 0,
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Grilled Salmon",
      description:
        "Fresh Atlantic salmon with lemon herb butter, served with roasted vegetables",
      price: 24.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
      prepTime: 25,
      popular: true,
      available: true,
      ingredients: ["salmon", "lemon", "herbs", "butter", "vegetables"],
      allergens: ["fish"],
      calories: 450,
      spicyLevel: 0,
    },
    {
      id: 2,
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with fresh mozzarella, tomato sauce, and basil",
      price: 16.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop",
      prepTime: 18,
      popular: true,
      available: true,
      ingredients: ["pizza dough", "mozzarella", "tomato sauce", "basil"],
      allergens: ["gluten", "dairy"],
      calories: 320,
      spicyLevel: 0,
    },
    {
      id: 3,
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce with parmesan cheese, croutons, and Caesar dressing",
      price: 12.99,
      category: "appetizer",
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
      prepTime: 8,
      popular: false,
      available: true,
      ingredients: [
        "romaine lettuce",
        "parmesan",
        "croutons",
        "caesar dressing",
      ],
      allergens: ["dairy", "eggs"],
      calories: 280,
      spicyLevel: 0,
    },
    {
      id: 4,
      name: "Chocolate Lava Cake",
      description:
        "Warm chocolate cake with molten center, served with vanilla ice cream",
      price: 8.99,
      category: "dessert",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=200&fit=crop",
      prepTime: 12,
      popular: true,
      available: true,
      ingredients: [
        "chocolate",
        "flour",
        "eggs",
        "butter",
        "vanilla ice cream",
      ],
      allergens: ["gluten", "dairy", "eggs"],
      calories: 520,
      spicyLevel: 0,
    },
    {
      id: 5,
      name: "Craft Beer IPA",
      description: "Local brewery India Pale Ale with citrus notes",
      price: 6.99,
      category: "alcohol",
      image:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&h=200&fit=crop",
      prepTime: 2,
      popular: false,
      available: true,
      ingredients: ["hops", "malt", "yeast", "water"],
      allergens: ["gluten"],
      calories: 180,
      spicyLevel: 0,
    },
    {
      id: 6,
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 4.99,
      category: "beverage",
      image:
        "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop",
      prepTime: 3,
      popular: false,
      available: true,
      ingredients: ["fresh oranges"],
      allergens: [],
      calories: 120,
      spicyLevel: 0,
    },
  ]);

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

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || !newItem.price) return;

    const item: MenuItem = {
      id: Date.now(),
      name: newItem.name,
      description: newItem.description,
      price: newItem.price,
      category: newItem.category as MenuItem["category"],
      image:
        newItem.image ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
      prepTime: newItem.prepTime || 15,
      popular: newItem.popular || false,
      available: newItem.available ?? true,
      ingredients: newItem.ingredients || [],
      allergens: newItem.allergens || [],
      calories: newItem.calories,
      spicyLevel: newItem.spicyLevel || 0,
    };

    setMenuItems([...menuItems, item]);
    resetForm();
    setShowAddModal(false);
  };

  const handleEditItem = () => {
    if (
      !editingItem ||
      !editingItem.name ||
      !editingItem.description ||
      !editingItem.price
    )
      return;

    setMenuItems(
      menuItems.map((item) => (item.id === editingItem.id ? editingItem : item))
    );
    setEditingItem(null);
  };

  const handleDeleteItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: "main",
      image: "",
      prepTime: 0,
      popular: false,
      available: true,
      ingredients: [],
      allergens: [],
      calories: 0,
      spicyLevel: 0,
    });
  };

  const addIngredient = (ingredient: string, isEditing = false) => {
    if (!ingredient.trim()) return;

    if (isEditing && editingItem) {
      setEditingItem({
        ...editingItem,
        ingredients: [...editingItem.ingredients, ingredient.trim()],
      });
    } else {
      setNewItem({
        ...newItem,
        ingredients: [...(newItem.ingredients || []), ingredient.trim()],
      });
    }
  };

  const removeIngredient = (index: number, isEditing = false) => {
    if (isEditing && editingItem) {
      setEditingItem({
        ...editingItem,
        ingredients: editingItem.ingredients.filter((_, i) => i !== index),
      });
    } else {
      setNewItem({
        ...newItem,
        ingredients: (newItem.ingredients || []).filter((_, i) => i !== index),
      });
    }
  };

  const getStats = () => {
    return {
      totalItems: menuItems.length,
      popularItems: menuItems.filter((item) => item.popular).length,
      unavailableItems: menuItems.filter((item) => !item.available).length,
      avgPrice:
        menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length,
    };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          title="Menu Management"
          searchPlaceholder="Search menu items..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          rightContent={
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Menu Item</span>
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
                  <Tag className="text-emerald-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Popular Items</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats.popularItems}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Unavailable</p>
                  <p className="text-3xl font-bold text-red-600">
                    {stats.unavailableItems}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="text-red-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Price</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ${stats.avgPrice.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="text-blue-600" size={24} />
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
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                    ${
                      activeCategory === category.id
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

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Item Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {item.popular && (
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-medium flex items-center space-x-1">
                        <Star size={12} />
                        <span>Popular</span>
                      </span>
                    )}
                    {!item.available && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
                        Unavailable
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-lg font-bold text-emerald-600">
                      ${item.price}
                    </span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {item.name}
                    </h3>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full capitalize">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{item.prepTime} min</span>
                    </div>
                    {item.calories && <span>{item.calories} cal</span>}
                    {item.spicyLevel && item.spicyLevel > 0 && (
                      <span className="text-red-500">
                        {"🌶️".repeat(item.spicyLevel)}
                      </span>
                    )}
                  </div>

                  {/* Ingredients */}
                  {item.ingredients.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.ingredients
                          .slice(0, 3)
                          .map((ingredient, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {ingredient}
                            </span>
                          ))}
                        {item.ingredients.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{item.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="flex items-center space-x-1 px-3 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Menu Item
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddItem();
              }}
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={newItem.name || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={newItem.description || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={newItem.price || ""}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={newItem.category || "main"}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            category: e.target.value as MenuItem["category"],
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="appetizer">Appetizer</option>
                        <option value="main">Main Course</option>
                        <option value="dessert">Dessert</option>
                        <option value="beverage">Beverage</option>
                        <option value="alcohol">Alcohol</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={newItem.image || ""}
                      onChange={(e) =>
                        setNewItem({ ...newItem, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Additional Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prep Time (min)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={newItem.prepTime || ""}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            prepTime: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Calories
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={newItem.calories || ""}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            calories: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spicy Level
                    </label>
                    <select
                      value={newItem.spicyLevel || 0}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          spicyLevel: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value={0}>Not Spicy</option>
                      <option value={1}>Mild 🌶️</option>
                      <option value={2}>Medium 🌶️🌶️</option>
                      <option value={3}>Hot 🌶️🌶️🌶️</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newItem.popular || false}
                        onChange={(e) =>
                          setNewItem({ ...newItem, popular: e.target.checked })
                        }
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">
                        Popular Item
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newItem.available ?? true}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            available: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Available</span>
                    </label>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ingredients
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(newItem.ingredients || []).map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center space-x-1"
                        >
                          <span>{ingredient}</span>
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="text-emerald-600 hover:text-emerald-800"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add ingredient"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addIngredient(e.currentTarget.value);
                            e.currentTarget.value = "";
                          }
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget
                            .previousElementSibling as HTMLInputElement;
                          addIngredient(input.value);
                          input.value = "";
                        }}
                        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Menu Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Menu Item
                </h2>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditItem();
              }}
              className="p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={editingItem.description}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editingItem.price}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={editingItem.category}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            category: e.target.value as MenuItem["category"],
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="appetizer">Appetizer</option>
                        <option value="main">Main Course</option>
                        <option value="dessert">Dessert</option>
                        <option value="beverage">Beverage</option>
                        <option value="alcohol">Alcohol</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={editingItem.image}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          image: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Additional Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prep Time (min)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editingItem.prepTime}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            prepTime: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Calories
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editingItem.calories || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            calories: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spicy Level
                    </label>
                    <select
                      value={editingItem.spicyLevel || 0}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          spicyLevel: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value={0}>Not Spicy</option>
                      <option value={1}>Mild 🌶️</option>
                      <option value={2}>Medium 🌶️🌶️</option>
                      <option value={3}>Hot 🌶️🌶️🌶️</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingItem.popular}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            popular: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">
                        Popular Item
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingItem.available}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            available: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Available</span>
                    </label>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ingredients
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editingItem.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center space-x-1"
                        >
                          <span>{ingredient}</span>
                          <button
                            type="button"
                            onClick={() => removeIngredient(index, true)}
                            className="text-emerald-600 hover:text-emerald-800"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add ingredient"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addIngredient(e.currentTarget.value, true);
                            e.currentTarget.value = "";
                          }
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget
                            .previousElementSibling as HTMLInputElement;
                          addIngredient(input.value, true);
                          input.value = "";
                        }}
                        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Update Menu Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
