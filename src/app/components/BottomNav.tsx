import { Home, Timer, Calendar, FileText, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", icon: Home, labelKey: "nav.dashboard" },
    { path: "/study-timer", icon: Timer, labelKey: "nav.timer" },
    { path: "/calendar", icon: Calendar, labelKey: "nav.calendar" },
    { path: "/notes", icon: FileText, labelKey: "nav.notes" },
    { path: "/gpa", icon: TrendingUp, labelKey: "nav.gpa" },
  ];

  return (
    <nav className="px-4 pb-3 pt-2">
      <div className="rounded-[26px] border border-white/90 bg-white/90 px-2 py-2 shadow-[0_12px_36px_rgba(20,20,45,0.10)] backdrop-blur-xl">
        <div className="flex items-center justify-around gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <motion.div
                  className="relative flex flex-col items-center gap-1.5 rounded-[19px] py-2"
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-[19px] bg-[#EEEAFE]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <Icon
                    className={`relative z-10 h-5 w-5 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`relative z-10 text-[11px] ${
                      isActive ? "font-semibold text-primary" : "font-medium text-muted-foreground"
                    }`}
                  >
                    {t(item.labelKey)}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
