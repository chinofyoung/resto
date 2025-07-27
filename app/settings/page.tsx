"use client";

import { useState, useEffect } from "react";
import {
  Palette,
  Monitor,
  Bell,
  Shield,
  Store,
  Printer,
  RotateCcw,
  Save,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  preview: {
    bg: string;
    card: string;
    text: string;
  };
}

interface Settings {
  // Appearance
  brandColor: string;
  secondaryColor: string;
  accentColor: string;
  theme: "light" | "dark" | "auto";
  fontSize: "small" | "medium" | "large";

  // Restaurant Info
  restaurantName: string;
  restaurantLogo: string;
  address: string;
  phone: string;
  email: string;

  // System
  language: string;
  currency: string;
  timezone: string;
  dateFormat: string;

  // Notifications
  orderNotifications: boolean;
  lowStockAlerts: boolean;
  paymentAlerts: boolean;
  soundEnabled: boolean;

  // Receipt & Printing
  receiptTemplate: "minimal" | "detailed" | "custom";
  autoPrint: boolean;
  printerName: string;

  // Security
  sessionTimeout: number;
  requirePasswordChange: boolean;
  twoFactorAuth: boolean;
}

export default function Settings() {
  const { colors, updateColors, applyTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("appearance");
  const [settings, setSettings] = useState<Settings>({
    // Appearance
    brandColor: colors.primary,
    secondaryColor: colors.secondary,
    accentColor: colors.accent,
    theme: "light",
    fontSize: "medium",

    // Restaurant Info
    restaurantName: "RestoPOS",
    restaurantLogo: "",
    address: "123 Restaurant Street, Food City, FC 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@restopos.com",

    // System
    language: "en",
    currency: "USD",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",

    // Notifications
    orderNotifications: true,
    lowStockAlerts: true,
    paymentAlerts: true,
    soundEnabled: true,

    // Receipt & Printing
    receiptTemplate: "detailed",
    autoPrint: false,
    printerName: "",

    // Security
    sessionTimeout: 30,
    requirePasswordChange: false,
    twoFactorAuth: false,
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const colorThemes: ColorTheme[] = [
    {
      id: "emerald",
      name: "Emerald Fresh",
      primary: "#10b981",
      secondary: "#06b6d4",
      accent: "#f59e0b",
      preview: {
        bg: "bg-emerald-50",
        card: "bg-emerald-100",
        text: "text-emerald-700",
      },
    },
    {
      id: "blue",
      name: "Ocean Blue",
      primary: "#3b82f6",
      secondary: "#06b6d4",
      accent: "#8b5cf6",
      preview: { bg: "bg-blue-50", card: "bg-blue-100", text: "text-blue-700" },
    },
    {
      id: "purple",
      name: "Royal Purple",
      primary: "#8b5cf6",
      secondary: "#ec4899",
      accent: "#f59e0b",
      preview: {
        bg: "bg-purple-50",
        card: "bg-purple-100",
        text: "text-purple-700",
      },
    },
    {
      id: "rose",
      name: "Rose Elegant",
      primary: "#f43f5e",
      secondary: "#ec4899",
      accent: "#f97316",
      preview: { bg: "bg-rose-50", card: "bg-rose-100", text: "text-rose-700" },
    },
    {
      id: "orange",
      name: "Sunset Orange",
      primary: "#f97316",
      secondary: "#f59e0b",
      accent: "#ef4444",
      preview: {
        bg: "bg-orange-50",
        card: "bg-orange-100",
        text: "text-orange-700",
      },
    },
    {
      id: "teal",
      name: "Teal Modern",
      primary: "#14b8a6",
      secondary: "#06b6d4",
      accent: "#8b5cf6",
      preview: { bg: "bg-teal-50", card: "bg-teal-100", text: "text-teal-700" },
    },
  ];

  const tabs = [
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "restaurant", name: "Restaurant", icon: Store },
    { id: "system", name: "System", icon: Monitor },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "printing", name: "Printing", icon: Printer },
    { id: "security", name: "Security", icon: Shield },
  ];

  const updateSettings = (key: keyof Settings, value: Settings[keyof Settings]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setUnsavedChanges(true);

    // Apply color changes immediately
    if (key === "brandColor" && typeof value === "string") {
      updateColors({ primary: value });
    } else if (key === "secondaryColor" && typeof value === "string") {
      updateColors({ secondary: value });
    } else if (key === "accentColor" && typeof value === "string") {
      updateColors({ accent: value });
    }
  };

  const applyColorTheme = (theme: ColorTheme) => {
    setSettings((prev) => ({
      ...prev,
      brandColor: theme.primary,
      secondaryColor: theme.secondary,
      accentColor: theme.accent,
    }));

    // Apply theme immediately
    applyTheme({
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent,
    });

    setUnsavedChanges(true);
  };

  const saveSettings = () => {
    // Save to localStorage
    localStorage.setItem("restopos-settings", JSON.stringify(settings));
    setUnsavedChanges(false);

    // Show success message (you could use a toast library)
    alert("Settings saved successfully!");
  };

  const resetToDefaults = () => {
    if (
      confirm("Are you sure you want to reset all settings to default values?")
    ) {
      const defaultSettings = {
        brandColor: "#10b981",
        secondaryColor: "#06b6d4",
        accentColor: "#f59e0b",
        theme: "light" as const,
        fontSize: "medium" as const,
        restaurantName: "RestoPOS",
        restaurantLogo: "",
        address: "123 Restaurant Street, Food City, FC 12345",
        phone: "+1 (555) 123-4567",
        email: "contact@restopos.com",
        language: "en",
        currency: "USD",
        timezone: "America/New_York",
        dateFormat: "MM/DD/YYYY",
        orderNotifications: true,
        lowStockAlerts: true,
        paymentAlerts: true,
        soundEnabled: true,
        receiptTemplate: "detailed" as const,
        autoPrint: false,
        printerName: "",
        sessionTimeout: 30,
        requirePasswordChange: false,
        twoFactorAuth: false,
      };

      setSettings(defaultSettings);

      // Reset theme immediately
      applyTheme({
        primary: defaultSettings.brandColor,
        secondary: defaultSettings.secondaryColor,
        accent: defaultSettings.accentColor,
      });

      setUnsavedChanges(true);
    }
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("restopos-settings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);

      // Apply saved theme
      if (
        parsedSettings.brandColor ||
        parsedSettings.secondaryColor ||
        parsedSettings.accentColor
      ) {
        applyTheme({
          primary: parsedSettings.brandColor || colors.primary,
          secondary: parsedSettings.secondaryColor || colors.secondary,
          accent: parsedSettings.accentColor || colors.accent,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update settings when theme context changes
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      brandColor: colors.primary,
      secondaryColor: colors.secondary,
      accentColor: colors.accent,
    }));
  }, [colors]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          title="Settings"
          rightContent={
            <div className="flex items-center space-x-3">
              {unsavedChanges && (
                <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  Unsaved changes
                </span>
              )}
              <button
                onClick={resetToDefaults}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
              <button
                onClick={saveSettings}
                disabled={!unsavedChanges}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          }
        />

        <div className="flex-1 flex">
          {/* Settings Navigation */}
          <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-emerald-100 p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-emerald-100 text-emerald-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Appearance Settings
                  </h2>

                  {/* Color Themes */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Color Themes
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {colorThemes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => applyColorTheme(theme)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            settings.brandColor === theme.primary
                              ? "border-emerald-500 ring-2 ring-emerald-200"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            className={`${theme.preview.bg} rounded-lg p-3 mb-3`}
                          >
                            <div
                              className={`${theme.preview.card} rounded p-2 mb-2`}
                            >
                              <div className="h-2 bg-white rounded mb-1"></div>
                              <div className="h-1 bg-white/70 rounded w-2/3"></div>
                            </div>
                            <div className="flex space-x-1">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: theme.primary }}
                              ></div>
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: theme.secondary }}
                              ></div>
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: theme.accent }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            {theme.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Colors */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.brandColor}
                          onChange={(e) =>
                            updateSettings("brandColor", e.target.value)
                          }
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.brandColor}
                          onChange={(e) =>
                            updateSettings("brandColor", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) =>
                            updateSettings("secondaryColor", e.target.value)
                          }
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.secondaryColor}
                          onChange={(e) =>
                            updateSettings("secondaryColor", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) =>
                            updateSettings("accentColor", e.target.value)
                          }
                          className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.accentColor}
                          onChange={(e) =>
                            updateSettings("accentColor", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Theme & Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme
                      </label>
                      <select
                        value={settings.theme}
                        onChange={(e) =>
                          updateSettings("theme", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size
                      </label>
                      <select
                        value={settings.fontSize}
                        onChange={(e) =>
                          updateSettings("fontSize", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Preview
                    </h3>
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: settings.brandColor }}
                        >
                          R
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {settings.restaurantName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Restaurant POS System
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          className="px-4 py-2 text-white rounded-lg font-medium"
                          style={{ backgroundColor: settings.brandColor }}
                        >
                          Primary Button
                        </button>
                        <button
                          className="px-4 py-2 text-white rounded-lg font-medium"
                          style={{ backgroundColor: settings.secondaryColor }}
                        >
                          Secondary Button
                        </button>
                        <button
                          className="px-4 py-2 text-white rounded-lg font-medium"
                          style={{ backgroundColor: settings.accentColor }}
                        >
                          Accent Button
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Restaurant Settings */}
            {activeTab === "restaurant" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Restaurant Information
                </h2>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Restaurant Name
                      </label>
                      <input
                        type="text"
                        value={settings.restaurantName}
                        onChange={(e) =>
                          updateSettings("restaurantName", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo URL
                      </label>
                      <input
                        type="url"
                        value={settings.restaurantLogo}
                        onChange={(e) =>
                          updateSettings("restaurantLogo", e.target.value)
                        }
                        placeholder="https://example.com/logo.png"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={settings.address}
                        onChange={(e) =>
                          updateSettings("address", e.target.value)
                        }
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) =>
                          updateSettings("phone", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) =>
                          updateSettings("email", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === "system" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  System Settings
                </h2>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          updateSettings("language", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) =>
                          updateSettings("currency", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD (C$)</option>
                        <option value="AUD">AUD (A$)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.timezone}
                        onChange={(e) =>
                          updateSettings("timezone", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">
                          Pacific Time
                        </option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) =>
                          updateSettings("dateFormat", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Notification Settings
                </h2>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Order Notifications
                        </h3>
                        <p className="text-sm text-gray-600">
                          Get notified when new orders come in
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.orderNotifications}
                          onChange={(e) =>
                            updateSettings(
                              "orderNotifications",
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Low Stock Alerts
                        </h3>
                        <p className="text-sm text-gray-600">
                          Alert when inventory items are running low
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.lowStockAlerts}
                          onChange={(e) =>
                            updateSettings("lowStockAlerts", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Payment Alerts
                        </h3>
                        <p className="text-sm text-gray-600">
                          Notifications for payment confirmations and failures
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.paymentAlerts}
                          onChange={(e) =>
                            updateSettings("paymentAlerts", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Sound Notifications
                        </h3>
                        <p className="text-sm text-gray-600">
                          Play sounds for notifications
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.soundEnabled}
                          onChange={(e) =>
                            updateSettings("soundEnabled", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Printing Settings */}
            {activeTab === "printing" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Printing & Receipt Settings
                </h2>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Receipt Template
                      </label>
                      <select
                        value={settings.receiptTemplate}
                        onChange={(e) =>
                          updateSettings("receiptTemplate", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="minimal">Minimal</option>
                        <option value="detailed">Detailed</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Printer Name
                      </label>
                      <input
                        type="text"
                        value={settings.printerName}
                        onChange={(e) =>
                          updateSettings("printerName", e.target.value)
                        }
                        placeholder="Enter printer name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Auto Print Receipts
                        </h3>
                        <p className="text-sm text-gray-600">
                          Automatically print receipts after payment
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.autoPrint}
                          onChange={(e) =>
                            updateSettings("autoPrint", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Security Settings
                </h2>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <select
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                          updateSettings(
                            "sessionTimeout",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={0}>Never</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Require Password Change
                        </h3>
                        <p className="text-sm text-gray-600">
                          Force users to change passwords every 90 days
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.requirePasswordChange}
                          onChange={(e) =>
                            updateSettings(
                              "requirePasswordChange",
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) =>
                            updateSettings("twoFactorAuth", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
