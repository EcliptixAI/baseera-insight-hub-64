import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FilePlus,
  FileSearch,
  Library,
  FileText,
  Settings,
  Code2,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Logo } from "./Logo";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "لوحة التحكم" },
  { path: "/analysis/new", icon: FilePlus, label: "تحليل جديد" },
  { path: "/analyses", icon: FileSearch, label: "التحليلات السابقة" },
  { path: "/cases", icon: Library, label: "مكتبة الحالات" },
  { path: "/reports", icon: FileText, label: "التقارير" },
  { path: "/settings", icon: Settings, label: "الإعدادات" },
  { path: "/developers", icon: Code2, label: "للمطورين" },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout, sidebarCollapsed, toggleSidebar } = useApp();

  return (
    <motion.aside
      className={cn(
        "fixed top-0 right-0 h-screen gradient-hero pattern-islamic z-40 flex flex-col transition-all duration-300 bg-slate-900",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <AnimatePresence mode="wait">
          {sidebarCollapsed ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-lg">ب</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Logo variant="light" size="md" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <item.icon
                    size={22}
                    className={cn(
                      "transition-transform",
                      isActive && "text-secondary-400"
                    )}
                  />
                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute right-0 w-1 h-8 bg-secondary-400 rounded-l-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-white/10 p-4">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 mb-4 px-2"
            >
              <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{user.name}</p>
                <p className="text-white/60 text-xs truncate">{user.role}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all",
            sidebarCollapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!sidebarCollapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-12 bg-primary-700 rounded-l-lg flex items-center justify-center text-white hover:bg-primary-600 transition-colors shadow-lg"
      >
        {sidebarCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </motion.aside>
  );
}
