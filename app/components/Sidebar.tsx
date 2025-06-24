"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ShoppingCart, Package, ChefHat, Settings } from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Menu", href: "/menu", icon: ChefHat },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-20 bg-white/80 backdrop-blur-sm border-r border-primary-100 flex flex-col items-center py-6">
      <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center mb-8">
        <span className="text-white font-bold text-lg">R</span>
      </div>

      <nav className="flex flex-col space-y-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-gray-500 hover:bg-primary-50 hover:text-primary-600"
                }
              `}
            >
              <Icon size={20} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
