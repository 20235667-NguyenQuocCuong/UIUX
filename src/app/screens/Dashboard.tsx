import { Bell, CalendarDays, ClipboardList, Clock, FileText, GraduationCap, NotebookPen, Timer, User } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const todayClass = {
  mode: "Offline",
  time: "14:10 - 17:30",
  title: "166153 - Giao diện và trải nghiệm người dùng",
  code: "IT4441",
  room: "D9-501",
  week: "40",
  lecturer: "TS. Nguyễn Minh Anh",
};

const featureGroups = [
  {
    title: "Học tập",
    items: [
      { label: "Thời khóa biểu", icon: CalendarDays, to: "/calendar", color: "bg-emerald-50 text-emerald-600" },
      { label: "Kết quả học tập", icon: GraduationCap, to: "/gpa", color: "bg-cyan-50 text-cyan-600" },
      { label: "Lịch thi", icon: CalendarDays, to: "/calendar", color: "bg-red-50 text-red-600" },
      { label: "Deadline", icon: ClipboardList, to: "/calendar?tab=deadlines", color: "bg-amber-50 text-amber-600" },
    ],
  },
  {
    title: "Tiện ích",
    items: [
      { label: "Ghi chú", icon: NotebookPen, to: "/notes", color: "bg-teal-50 text-teal-600" },
      { label: "Hẹn giờ học", icon: Timer, to: "/study-timer", color: "bg-lime-50 text-lime-600" },
      { label: "GPA", icon: FileText, to: "/gpa", color: "bg-cyan-50 text-cyan-600" },
    ],
  },
];

export function Dashboard() {
  const today = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date());

  return (
    <div className="app-screen">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{today}</p>
          <h1 className="text-[28px] font-semibold tracking-[-0.035em]">Chào Đức Anh</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sẵn sàng cho lịch học hôm nay.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Thông báo"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-foreground shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
          >
            <Bell className="h-5 w-5" />
          </button>
          <Link
            to="/profile"
            aria-label="Mở hồ sơ cá nhân"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_24px_rgba(16,185,129,0.22)]"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
        <section className="gradient-card relative p-5">
          <div className="absolute right-4 top-4 rounded-full bg-white/18 px-3 py-1 text-xs font-semibold">
            Tuần {todayClass.week}
          </div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1.5 text-xs font-semibold">
            <Clock className="h-4 w-4" />
            Lịch học hôm nay
          </div>
          <div className="rounded-[22px] bg-white p-4 text-foreground shadow-[0_16px_34px_rgba(15,23,42,0.12)]">
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-primary">
                {todayClass.mode}
              </span>
              <span className="text-sm font-semibold text-cyan-600">{todayClass.time}</span>
            </div>
            <h2 className="text-[18px] leading-snug tracking-[-0.015em]">{todayClass.title}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-muted/70 p-3">
                <p className="text-xs text-muted-foreground">Mã học phần</p>
                <p className="mt-1 font-semibold">{todayClass.code}</p>
              </div>
              <div className="rounded-2xl bg-muted/70 p-3">
                <p className="text-xs text-muted-foreground">Phòng</p>
                <p className="mt-1 font-semibold">{todayClass.room}</p>
              </div>
              <div className="col-span-2 rounded-2xl bg-muted/70 p-3">
                <p className="text-xs text-muted-foreground">Giảng viên</p>
                <p className="mt-1 font-semibold">{todayClass.lecturer}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-3 gap-3">
          {[
            ["8", "Lớp tuần này", "text-primary", "/calendar"],
            ["3.76", "GPA", "text-cyan-600", "/gpa"],
            ["5", "Deadline", "text-accent", "/calendar?tab=deadlines"],
          ].map(([value, label, color, to]) => (
            <Link key={label} to={to} className="premium-card px-2 py-4 text-center transition-transform active:scale-[0.98]">
              <p className={`text-2xl font-semibold ${color}`}>{value}</p>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{label}</p>
            </Link>
          ))}
        </div>

        {featureGroups.map((group) => (
          <section key={group.title} className="premium-card p-4">
            <h3 className="section-label mb-4">{group.title}</h3>
            <div className="grid grid-cols-4 gap-2.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-2xl bg-muted/55 px-1.5 text-center transition-colors hover:bg-emerald-50"
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-semibold leading-4 text-foreground">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </motion.div>
    </div>
  );
}
