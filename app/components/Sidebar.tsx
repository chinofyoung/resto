"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, UtensilsCrossed, Package } from "lucide-react";

const sidebarItems = [
  { id: "home", icon: Home, label: "Home", path: "/dashboard" },
  { id: "orders", icon: UtensilsCrossed, label: "Orders", path: "/orders" },
  { id: "inventory", icon: Package, label: "Inventory", path: "/inventory" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === "/dashboard") return "home";
    if (pathname === "/orders") return "orders";
    if (pathname === "/inventory") return "inventory";
    return "home";
  };

  return (
    <div className="w-20 bg-white/80 backdrop-blur-sm border-r border-emerald-100 flex flex-col items-center py-6">
      <div className="mb-8">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">R</span>
        </div>
      </div>

      <nav className="flex-1 space-y-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = getActiveTab() === item.id;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
              }`}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
