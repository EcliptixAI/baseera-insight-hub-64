import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Lock, ChevronLeft } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const breadcrumbLabels: Record<string, string> = {
  dashboard: "لوحة التحكم",
  analysis: "التحليل",
  new: "جديد",
  analyses: "التحليلات السابقة",
  cases: "مكتبة الحالات",
  reports: "التقارير",
  settings: "الإعدادات",
  developers: "للمطورين",
};

export function Header() {
  const location = useLocation();
  const { notifications, unreadCount, markAsRead, sidebarCollapsed } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-border h-16 flex items-center justify-between px-6 transition-all duration-300",
        sidebarCollapsed ? "mr-20" : "mr-64"
      )}
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm">
        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;
          const label = breadcrumbLabels[segment] || segment;

          return (
            <div key={path} className="flex items-center gap-2">
              {index > 0 && <ChevronLeft size={14} className="text-muted-foreground" />}
              {isLast ? (
                <span className="font-medium text-foreground">{label}</span>
              ) : (
                <Link
                  to={path}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Security Badge */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <Lock size={12} className="text-status-success" />
          <span>اتصال آمن</span>
        </div>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-10 pr-10 pl-4 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Bell size={20} className="text-muted-foreground" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -left-0.5 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-medium"
              >
                {unreadCount}
              </motion.span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-border overflow-hidden z-50"
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold">الإشعارات</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 5).map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={cn(
                        "w-full p-4 text-right hover:bg-muted transition-colors border-b border-border last:border-0",
                        !notification.read && "bg-primary-50"
                      )}
                    >
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.date).toLocaleDateString("ar-SA")}
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
