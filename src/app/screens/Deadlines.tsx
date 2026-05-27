import { useState } from "react";
import { Circle, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Deadlines() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | "today" | "week" | "month">("all");

  const deadlines = [
    {
      task: "Bài tập Thuật toán",
      subject: "Cấu Trúc Dữ Liệu",
      dueDate: "Ngày mai",
      priority: "urgent",
      status: "pending",
      color: "bg-purple-500",
    },
    {
      task: "Đề xuất dự án",
      subject: "Phát Triển Web",
      dueDate: "28/03/2026",
      priority: "high",
      status: "pending",
      color: "bg-blue-500",
    },
    {
      task: "Báo cáo thực hành",
      subject: "Hệ Quản Trị CSDL",
      dueDate: "30/03/2026",
      priority: "normal",
      status: "pending",
      color: "bg-green-500",
    },
    {
      task: "Bài nghiên cứu",
      subject: "Trí Tuệ Nhân Tạo & Học Máy",
      dueDate: "05/04/2026",
      priority: "high",
      status: "pending",
      color: "bg-pink-500",
    },
    {
      task: "Ôn tập kiểm tra",
      subject: "Lập Trình Di Động",
      dueDate: "27/03/2026",
      priority: "normal",
      status: "completed",
      color: "bg-orange-500",
    },
  ];

  const filters = [
    { labelKey: "deadlines.all", value: "all" as const },
    { labelKey: "deadlines.today", value: "today" as const },
    { labelKey: "deadlines.week", value: "week" as const },
    { labelKey: "deadlines.month", value: "month" as const },
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="app-screen">
      {/* Header */}
      <div className="screen-heading">
        <h1>{t("deadlines.title")}</h1>
        <p className="text-muted-foreground">{t("deadlines.keepTrack")}</p>
      </div>

      {/* Filters */}
      <div className="scrollbar-hidden mb-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <motion.button
            key={f.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f.value)}
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
              filter === f.value
                ? "bg-primary text-white shadow-[0_8px_18px_rgba(102,87,245,0.22)]"
                : "border border-border bg-white text-muted-foreground"
            }`}
          >
            {t(f.labelKey)}
          </motion.button>
        ))}
      </div>

      {/* Deadlines List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {deadlines.map((deadline, index) => (
          <motion.div
            key={index}
            variants={item}
            whileTap={{ scale: 0.98 }}
            className={`premium-card p-5 ${
              deadline.status === "completed" ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="mt-0.5"
              >
                {deadline.status === "completed" ? (
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground" />
                )}
              </motion.button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium mb-2 ${
                    deadline.status === "completed" ? "line-through" : ""
                  }`}
                >
                  {deadline.task}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="soft-chip"
                  >
                    {deadline.subject}
                  </span>
                  {deadline.priority === "urgent" && (
                    <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold text-destructive">
                      <AlertCircle className="w-3 h-3" />
                      {t("deadlines.urgent")}
                    </span>
                  )}
                  {deadline.priority === "high" && (
                    <span className="rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-semibold text-warning">
                      {t("deadlines.high")}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">
                  {t("deadlines.due")}: {deadline.dueDate}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {deadlines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("deadlines.noDeadlinesForPeriod")}</p>
        </div>
      )}
    </div>
  );
}
