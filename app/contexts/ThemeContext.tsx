"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  updateColors: (colors: Partial<ThemeColors>) => void;
  applyTheme: (theme: ThemeColors) => void;
}

const defaultColors: ThemeColors = {
  primary: "#10b981", // emerald-500
  secondary: "#06b6d4", // cyan-500
  accent: "#f59e0b", // amber-500
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("restopos-settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (
        settings.brandColor ||
        settings.secondaryColor ||
        settings.accentColor
      ) {
        setColors({
          primary: settings.brandColor || defaultColors.primary,
          secondary: settings.secondaryColor || defaultColors.secondary,
          accent: settings.accentColor || defaultColors.accent,
        });
      }
    }
  }, []);

  // Apply CSS custom properties whenever colors change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);

    // Convert hex to RGB for opacity variants
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const primaryRgb = hexToRgb(colors.primary);
    const secondaryRgb = hexToRgb(colors.secondary);
    const accentRgb = hexToRgb(colors.accent);

    if (primaryRgb) {
      root.style.setProperty(
        "--color-primary-rgb",
        `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`
      );
      root.style.setProperty(
        "--color-primary-50",
        `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.05)`
      );
      root.style.setProperty(
        "--color-primary-100",
        `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1)`
      );
      root.style.setProperty(
        "--color-primary-200",
        `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.2)`
      );
      root.style.setProperty("--color-primary-500", colors.primary);
      root.style.setProperty(
        "--color-primary-600",
        `rgba(${Math.round(primaryRgb.r * 0.9)}, ${Math.round(
          primaryRgb.g * 0.9
        )}, ${Math.round(primaryRgb.b * 0.9)}, 1)`
      );
      root.style.setProperty(
        "--color-primary-700",
        `rgba(${Math.round(primaryRgb.r * 0.8)}, ${Math.round(
          primaryRgb.g * 0.8
        )}, ${Math.round(primaryRgb.b * 0.8)}, 1)`
      );
    }

    if (secondaryRgb) {
      root.style.setProperty(
        "--color-secondary-rgb",
        `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`
      );
      root.style.setProperty(
        "--color-secondary-50",
        `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.05)`
      );
      root.style.setProperty(
        "--color-secondary-100",
        `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.1)`
      );
    }

    if (accentRgb) {
      root.style.setProperty(
        "--color-accent-rgb",
        `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`
      );
      root.style.setProperty(
        "--color-accent-50",
        `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.05)`
      );
      root.style.setProperty(
        "--color-accent-100",
        `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.1)`
      );
    }
  }, [colors]);

  const updateColors = (newColors: Partial<ThemeColors>) => {
    setColors((prev) => ({ ...prev, ...newColors }));
  };

  const applyTheme = (theme: ThemeColors) => {
    setColors(theme);
  };

  return (
    <ThemeContext.Provider value={{ colors, updateColors, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
