import { User, Clock, Calendar, TrendingUp, CheckCircle2, Circle, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";

export function Dashboard() {
  const { t } = useLanguage();
  const todaySchedule = [
    { subject: "Cấu Trúc Dữ Liệu", time: "09:00 - 10:30", room: "Phòng 201", color: "bg-purple-500" },
    { subject: "Phát Triển Web", time: "11:00 - 12:30", room: "Phòng thực hành 3A", color: "bg-blue-500" },
    { subject: "Hệ Quản Trị CSDL", time: "14:00 - 15:30", room: "Phòng 105", color: "bg-green-500" },
  ];

  const upcomingDeadlines = [
    {
      task: "Bài tập Thuật toán",
      subject: "Cấu Trúc Dữ Liệu",
      dueDate: "Ngày mai",
      priority: "urgent",
      color: "bg-purple-500",
    },
    {
      task: "Đề xuất dự án",
      subject: "Phát Triển Web",
      dueDate: "28/03",
      priority: "high",
      color: "bg-blue-500",
    },
    {
      task: "Báo cáo thực hành",
      subject: "Hệ Quản Trị CSDL",
      dueDate: "30/03",
      priority: "normal",
      color: "bg-green-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Thứ Tư, 27 tháng 5</p>
          <h1 className="text-[28px] font-semibold tracking-[-0.04em]">{t("dashboard.goodMorning")}</h1>
        </div>
        <Link to="/profile" aria-label="Mở hồ sơ cá nhân" className="rounded-2xl">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-[0_8px_22px_rgba(26,22,54,0.08)]"
          >
            <User className="w-6 h-6" />
          </motion.div>
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        <motion.div variants={item} className="gradient-card relative p-6">
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/14 blur-sm" />
          <div className="absolute -bottom-16 left-20 h-36 w-36 rounded-full bg-white/10 blur-xl" />
          <div className="relative">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/16 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Tổng quan hôm nay
            </span>
            <h2 className="mb-2 max-w-[240px] text-[22px] leading-tight text-white">
              {t("dashboard.ready")}
            </h2>
            <p className="mb-5 text-sm text-white/78">3 buổi học và 2 hạn nộp đang chờ bạn hoàn thành.</p>
            <Link to="/study-timer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary">
              Bắt đầu tập trung
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div variants={item} className="premium-card p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="section-label flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEEAFE]">
                <Clock className="w-4.5 h-4.5 text-primary" />
              </span>
              {t("dashboard.todaySchedule")}
            </h3>
            <Link to="/calendar" className="rounded-md text-xs font-semibold text-primary">
              {t("dashboard.viewAll")}
            </Link>
          </div>
          <div className="space-y-2.5">
            {todaySchedule.map((schedule, index) => (
              <div key={index} className="flex items-center gap-3 rounded-2xl bg-muted/55 p-3">
                <div className={`h-11 w-1 ${schedule.color} rounded-full`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{schedule.subject}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {schedule.time} • {schedule.room}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div variants={item} className="premium-card p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="section-label flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF3E3]">
                <Calendar className="h-4.5 w-4.5 text-warning" />
              </span>
              {t("dashboard.upcomingDeadlines")}
            </h3>
            <Link to="/deadlines" className="rounded-md text-xs font-semibold text-primary">
              {t("dashboard.viewAll")}
            </Link>
          </div>
          <div className="space-y-2.5">
            {upcomingDeadlines.map((deadline, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border border-border/70 bg-white p-3.5"
              >
                <Circle className="mt-0.5 h-5 w-5 text-primary/35" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{deadline.task}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="soft-chip py-1"
                    >
                      {deadline.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t("dashboard.due")}: {deadline.dueDate}
                    </span>
                  </div>
                </div>
                {deadline.priority === "urgent" && (
                  <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold text-destructive">
                    {t("dashboard.urgent")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* GPA Card */}
          <motion.div
            variants={item}
            className="gradient-card p-5"
          >
            <TrendingUp className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-sm opacity-90 mb-1">{t("dashboard.currentGPA")}</p>
            <p className="text-3xl font-semibold tracking-tight">3.76</p>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-[76%]" />
            </div>
          </motion.div>

          {/* Task Progress Card */}
          <motion.div
            variants={item}
            className="rounded-[24px] bg-[linear-gradient(135deg,#27B47E,#50C893)] p-5 text-white shadow-[0_14px_28px_rgba(39,180,126,0.2)]"
          >
            <CheckCircle2 className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-sm opacity-90 mb-1">{t("dashboard.tasks")}</p>
            <p className="text-3xl font-semibold tracking-tight">12/18</p>
            <p className="text-xs opacity-80 mt-2">6 {t("dashboard.remaining")}</p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div variants={item} className="premium-card p-5">
          <h3 className="section-label mb-4">{t("dashboard.thisWeek")}</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-muted/65 py-3">
              <p className="mb-1 text-2xl font-semibold text-primary">8</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.classes")}</p>
            </div>
            <div className="rounded-2xl bg-muted/65 py-3">
              <p className="mb-1 text-2xl font-semibold text-secondary">5</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.assignments")}</p>
            </div>
            <div className="rounded-2xl bg-muted/65 py-3">
              <p className="mb-1 text-2xl font-semibold text-accent">3</p>
              <p className="text-xs text-muted-foreground">{t("dashboard.exams")}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
