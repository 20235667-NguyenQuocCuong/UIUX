import { useState } from "react";
import { Bell, CalendarDays, ChevronRight, ClipboardList, Code2, FileText, GraduationCap, MapPin, NotebookPen, Timer, User, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const weekDays = [
  { label: "Mo", date: "08" },
  { label: "Tu", date: "09" },
  { label: "We", date: "10", active: true },
  { label: "Th", date: "11" },
  { label: "Fr", date: "12" },
  { label: "Sa", date: "13" },
  { label: "Su", date: "14" },
];

const todayClasses = [
  {
    id: "jp2220",
    mode: "Offline",
    start: "10:15",
    end: "11:45",
    title: "166147 - Tiếng Nhật 8",
    code: "JP2220",
    location: "Sáng thứ 4, tiết 5-6, C7-217",
    week: "40",
    lecturer: "Nguyễn Linh Chi",
  },
  {
    id: "jp3120",
    mode: "Offline",
    start: "14:10",
    end: "17:30",
    title: "166169 - Tiếng Nhật chuyên ngành 2",
    code: "JP3120",
    location: "Chiều thứ 4, tiết 3-6, B1-207",
    week: "40",
    lecturer: "Sato Yushi",
  },
];

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
  const [isScheduleCollapsed, setIsScheduleCollapsed] = useState(false);
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
          <h1 className="text-[28px] font-semibold">Chào Nguyễn Đức Anh</h1>
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
        <section className="rounded-[24px] bg-[linear-gradient(135deg,#10B981,#06B6D4)] p-3.5 text-white shadow-[0_18px_38px_rgba(16,185,129,0.2)]">
          <div className={`${isScheduleCollapsed ? "" : "mb-3"} flex items-start justify-between gap-3`}>
            <div>
              <h2 className="text-[18px] font-semibold leading-tight">Lịch học tuần 40 (8-14/6/2026)</h2>
              <p className="mt-1.5 text-[15px] font-medium text-white/85">Hôm nay có 2 lịch học</p>
            </div>
            <button
              type="button"
              aria-label={isScheduleCollapsed ? "Mở lịch học" : "Thu gọn lịch học"}
              aria-expanded={!isScheduleCollapsed}
              onClick={() => setIsScheduleCollapsed((collapsed) => !collapsed)}
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
            >
              <ChevronRight className={`h-6 w-6 transition-transform ${isScheduleCollapsed ? "" : "rotate-90"}`} />
            </button>
          </div>

          {!isScheduleCollapsed && (
            <>
              <div className="grid grid-cols-7 border-b border-white/30 pb-2 text-center">
                {weekDays.map((day) => (
                  <div key={day.date} className="flex flex-col items-center gap-1.5">
                    <span className="text-[13px] font-medium text-white/88">{day.label}</span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[17px] font-medium ${
                        day.active ? "bg-white text-primary" : "text-white"
                      }`}
                    >
                      {day.date}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/85" />
                  </div>
                ))}
              </div>

              <div className="mt-3 space-y-2.5">
                {todayClasses.map((item) => (
                  <article key={item.id} className="grid grid-cols-[88px_minmax(0,1fr)] rounded-2xl border border-slate-200 bg-white shadow-[0_6px_14px_rgba(15,23,42,0.04)]">
                    <div className="flex flex-col justify-between px-3 py-3">
                      <span className="text-[14px] font-semibold text-primary">{item.mode}</span>
                      <div className="text-[18px] font-medium leading-tight text-foreground">
                        <p>{item.start}</p>
                        <p className="text-center text-slate-400">-</p>
                        <p>{item.end}</p>
                      </div>
                    </div>

                    <div className="border-l-[3px] border-primary px-3 py-3">
                      <h3 className="mb-2 text-[15px] font-semibold leading-snug text-foreground">{item.title}</h3>
                      <div className="space-y-1 text-[13px] leading-snug text-slate-700">
                        <ScheduleInfo icon={Code2} label={`Mã học phần: ${item.code}`} />
                        <ScheduleInfo icon={MapPin} label={item.location} />
                        <ScheduleInfo icon={CalendarDays} label={`Tuần ${item.week}`} />
                        <ScheduleInfo icon={UserRound} label={`Giảng viên: ${item.lecturer}`} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
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

function ScheduleInfo({ icon: Icon, label }: { icon: typeof Code2; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-slate-500" />
      <span className="min-w-0">{label}</span>
    </div>
  );
}
