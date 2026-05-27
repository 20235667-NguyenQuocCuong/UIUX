import { User, Bell, Moon, LogOut, ChevronRight, Mail, GraduationCap, Settings } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";

export function Profile() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    {
      icon: Mail,
      label: t("profile.email"),
      value: "student@university.edu",
      action: null,
    },
    {
      icon: GraduationCap,
      label: t("profile.major"),
      value: "Khoa học máy tính",
      action: null,
    },
  ];

  const settingItems = [
    {
      icon: Bell,
      label: t("profile.notifications"),
      value: notifications,
      action: () => setNotifications(!notifications),
      toggle: true,
    },
    {
      icon: Moon,
      label: t("profile.darkMode"),
      value: darkMode,
      action: () => setDarkMode(!darkMode),
      toggle: true,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="app-screen">
      {/* Header */}
      <div className="screen-heading">
        <h1>{t("profile.title")}</h1>
        <p className="text-muted-foreground">{t("profile.subtitle")}</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        {/* User Info Card */}
        <motion.div
          variants={item}
          className="gradient-card p-7"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white/18">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-xl mb-1">Nguyễn Minh Anh</h2>
              <p className="text-sm opacity-90">Năm 2 • Khoa học máy tính</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-2xl mb-1">3.76</p>
              <p className="text-xs opacity-80">{t("profile.gpa")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl mb-1">18</p>
              <p className="text-xs opacity-80">{t("profile.credits")}</p>
            </div>
          </div>
        </motion.div>

        {/* Account Information */}
        <motion.div variants={item}>
          <h3 className="mb-3">{t("profile.accountInfo")}</h3>
          <div className="premium-card overflow-hidden">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`p-4 flex items-center gap-4 ${
                    index < menuItems.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div variants={item}>
          <h3 className="mb-3">{t("profile.quickSettings")}</h3>
          <div className="premium-card overflow-hidden">
            {settingItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={index}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action || undefined}
                  role={item.toggle ? "switch" : undefined}
                  aria-checked={item.toggle ? Boolean(item.value) : undefined}
                  aria-label={item.label}
                  className={`w-full p-4 flex items-center gap-4 text-left ${
                    index < settingItems.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                  </div>
                  {item.toggle ? (
                    <div
                      className={`h-7 w-12 rounded-full transition-colors ${
                        item.value ? "bg-primary" : "bg-switch-background"
                      }`}
                    >
                      <motion.div
                        animate={{ x: item.value ? 20 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-5 h-5 bg-white rounded-full mt-1"
                      />
                    </div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </motion.button>
              );
            })}
            {/* Link to full settings */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/settings")}
              className="w-full p-4 flex items-center gap-4 text-left"
            >
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{t("profile.moreSettings")}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.button
          type="button"
          variants={item}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-destructive/10 p-4 text-sm font-semibold text-destructive"
        >
          <LogOut className="w-5 h-5" />
          {t("profile.logout")}
        </motion.button>
      </motion.div>
    </div>
  );
}
