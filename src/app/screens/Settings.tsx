import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell,
  Calendar,
  Clock,
  Smartphone,
  RefreshCw,
  ChevronLeft,
  Link as LinkIcon,
  CheckCircle,
  Globe,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Settings() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [deadlineNotifications, setDeadlineNotifications] = useState(true);
  const [classReminders, setClassReminders] = useState(true);
  const [notificationTime, setNotificationTime] = useState("30");
  const [isLinked, setIsLinked] = useState(false);

  const handleLinkAccount = () => {
    setIsLinked(true);
  };

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
      <div className="mb-7 flex items-center gap-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/profile")}
          aria-label="Quay lại hồ sơ"
          className="rounded-2xl border border-border bg-white p-3 text-muted-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <div>
          <h1 className="mb-1 text-[27px] font-semibold tracking-[-0.04em]">{t("settings.title")}</h1>
          <p className="text-muted-foreground">{t("settings.subtitle")}</p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        {/* Language Settings */}
        <motion.div variants={item}>
          <h3 className="mb-3">{t("settings.language")}</h3>
          <div className="premium-card p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{t("settings.chooseLanguage")}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("settings.languageDesc")}
                </p>
                <div className="w-full rounded-xl bg-muted px-4 py-2.5 text-sm font-medium text-primary">
                  Tiếng Việt
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* University Account Sync */}
        <motion.div variants={item}>
          <h3 className="mb-3">{t("settings.universityAccount")}</h3>
          <div className="premium-card p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <LinkIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">{t("settings.autoSync")}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {t("settings.autoSyncDesc")}
                </p>
                {isLinked ? (
                  <div className="flex items-center gap-2 text-secondary" role="status">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {t("settings.connected")}
                    </span>
                  </div>
                ) : (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLinkAccount}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(102,87,245,0.2)]"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {t("settings.connectAccount")}
                  </motion.button>
                )}
              </div>
            </div>

            {isLinked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pt-4 border-t border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{t("settings.autoSyncLabel")}</p>
                      <p className="text-xs text-muted-foreground">
                        {t("settings.syncEvery")}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-primary px-3 py-1.5 bg-primary/10 rounded-lg"
                  >
                    {t("settings.syncNow")}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div variants={item}>
          <h3 className="mb-3">{t("settings.notifications")}</h3>
          <div className="premium-card overflow-hidden">
            {/* Deadline Notifications */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium">{t("settings.deadlineNotif")}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("settings.deadlineNotifDesc")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={deadlineNotifications}
                  aria-label={t("settings.deadlineNotif")}
                  className={`w-12 h-7 rounded-full transition-colors cursor-pointer ${
                    deadlineNotifications ? "bg-primary" : "bg-switch-background"
                  }`}
                  onClick={() => setDeadlineNotifications(!deadlineNotifications)}
                >
                  <motion.div
                    animate={{ x: deadlineNotifications ? 20 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 bg-white rounded-full mt-1"
                  />
                </button>
              </div>
            </div>

            {/* Class Reminders */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{t("settings.classReminders")}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("settings.classRemindersDesc")}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={classReminders}
                  aria-label={t("settings.classReminders")}
                  className={`w-12 h-7 rounded-full transition-colors cursor-pointer ${
                    classReminders ? "bg-primary" : "bg-switch-background"
                  }`}
                  onClick={() => setClassReminders(!classReminders)}
                >
                  <motion.div
                    animate={{ x: classReminders ? 20 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 bg-white rounded-full mt-1"
                  />
                </button>
              </div>
            </div>

            {/* Notification Timing */}
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">{t("settings.notifTiming")}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t("settings.notifTimingDesc")}
                  </p>
                  <select
                    aria-label={t("settings.notifTiming")}
                    value={notificationTime}
                    onChange={(e) => setNotificationTime(e.target.value)}
                    className="field h-12 bg-muted/60 px-3"
                  >
                    <option value="15">{t("settings.15min")}</option>
                    <option value="30">{t("settings.30min")}</option>
                    <option value="60">{t("settings.1hour")}</option>
                    <option value="120">{t("settings.2hours")}</option>
                    <option value="1440">{t("settings.1day")}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Push Notifications */}
        <motion.div variants={item}>
          <h3 className="mb-3">{t("settings.devices")}</h3>
          <div className="premium-card p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">{t("settings.pushNotif")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("settings.pushNotifDesc")}
                </p>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                className="rounded-xl bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
              >
                {t("settings.enable")}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div variants={item} className="glass-card p-5">
          <p className="text-sm text-muted-foreground">
            {t("settings.infoTip")}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
