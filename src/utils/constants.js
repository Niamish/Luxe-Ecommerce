/**
 * A central place for application-wide constants.
 */

export const SITE_NAME = 'LUXE';
export const API_BASE_URL = 'https://api.luxe.com/v1';

// Theme configuration objects for light and dark modes
export const THEMES = {
  dark: {
    bg: "#1a1f2e",
    surface: "#212737",
    surfaceHover: "#283142",
    text: "#e4e4e7",
    textMuted: "#a1a1aa",
    accent: "#7c3aed",
    accentHover: "#6b33d0",
    accentLight: "#8b5cf6",
    accentGradient: "from-violet-600 to-indigo-600",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    info: "#8b5cf6",
    border: "#374151",
    inputBg: "#1f2937",
    inputBorder: "#374151",
    inputFocus: "#7c3aed",
    shadowOut: "8px 8px 16px #141824, -8px -8px 16px #202638",
    shadowIn: "inset 8px 8px 16px #141824, inset -8px -8px 16px #202638",
    shadowOutSmall: "4px 4px 8px #141824, -4px -4px 8px #202638",
    shadowOutHover: "12px 12px 24px #141824, -12px -12px 24px #202638",
    overlay: "rgba(0, 0, 0, 0.9)",
  },
  light: {
    bg: "#ffffff",
    surface: "rgba(255, 255, 255, 0.95)",
    surfaceHover: "rgba(249, 250, 251, 1)",
    text: "#111827",
    textMuted: "#6b7280",
    accent: "#5046e5",
    accentHover: "#4338ca",
    accentLight: "#6366f1",
    accentGradient: "from-indigo-600 via-purple-600 to-pink-600",
    success: "#059669",
    danger: "#dc2626",
    warning: "#d97706",
    info: "#5046e5",
    border: "rgba(229, 231, 235, 0.8)",
    inputBg: "rgba(255, 255, 255, 0.95)",
    inputBorder: "rgba(229, 231, 235, 1)",
    inputFocus: "#5046e5",
    shadowOut: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    shadowIn: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    shadowOutSmall: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    shadowOutHover: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    glassMorphism: "rgba(255, 255, 255, 0.8) 0px 0px 0px 1px, rgba(80, 70, 229, 0.05) 0px 4px 16px 0px",
    gradientBg: "linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 25%, #ede9fe 50%, #fce7f3 75%, #fef3c7 100%)",
    overlay: "rgba(255, 255, 255, 0.5)",
  },
};