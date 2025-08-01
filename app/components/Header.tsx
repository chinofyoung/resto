"use client";

import { ReactNode } from "react";
import { Search, Star, Sun, Bell, User } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  rightContent?: ReactNode;
}

export default function Header({
  title,
  subtitle,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  rightContent,
}: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-primary-100 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <div className="mt-1">{subtitle}</div>}
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 pr-4 py-2 bg-primary-50 border border-primary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-80"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {rightContent && (
            <div className="flex items-center space-x-4">{rightContent}</div>
          )}

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary-600">
              <Star size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-primary-600">
              <Sun size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:text-primary-600">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
