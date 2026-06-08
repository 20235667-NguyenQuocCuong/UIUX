import { useState } from "react";
import { CalendarCheck, Clock, MapPin, Search, UserRound } from "lucide-react";
import { motion } from "motion/react";
import { mockClasses, mockDeadlines, mockSemesters } from "../data/mockDb";

type CalendarTab = "schedule" | "classes" | "deadlines";
type AgendaItem = {
  id: string;
  type: "class" | "exam";
  title: string;
  code: string;
  time: string;
  room: string;
  meta: string;
  badge: string;
  badgeClass: string;
  iconClass: string;
};

const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);
const exams = [
  {
    id: "exam-uiux",
    semester: "2026.2",
    day: 26,
    subject: "Giao diện và trải nghiệm người dùng",
    code: "IT4441",
    time: "14:10 - 15:40",
    room: "D9-501",
  },
  {
    id: "exam-db",
    semester: "2026.2",
    day: 28,
    subject: "Cơ sở dữ liệu",
    code: "IT3090",
    time: "08:00 - 09:30",
    room: "D5-203",
  },
];

export function Calendar() {
  const [activeTab, setActiveTab] = useState<CalendarTab>("schedule");
  const [selectedDate, setSelectedDate] = useState(26);
  const [semester, setSemester] = useState("2026.2");

  const semesterClasses = mockClasses.filter((item) => item.semester === semester);
  const selectedClasses = semesterClasses.filter((item) => item.day === selectedDate);
  const selectedExams = exams.filter((item) => item.semester === semester && item.day === selectedDate);
  const agendaItems: AgendaItem[] = [
    ...selectedClasses.map((item) => ({
      id: item.id,
      type: "class" as const,
      title: item.subject,
      code: item.code,
      time: item.time,
      room: item.room,
      meta: item.lecturer,
      badge: item.mode,
      badgeClass: item.mode === "Online" ? "bg-cyan-50 text-cyan-600" : "bg-emerald-50 text-primary",
      iconClass: "text-primary",
    })),
    ...selectedExams.map((item) => ({
      id: item.id,
      type: "exam" as const,
      title: item.subject,
      code: item.code,
      time: item.time,
      room: item.room,
      meta: "Lịch thi",
      badge: "Thi",
      badgeClass: "bg-red-50 text-red-600",
      iconClass: "text-red-500",
    })),
  ].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="app-screen">
      <div className="mb-5 rounded-[28px] bg-[linear-gradient(135deg,#10B981,#06B6D4)] p-5 text-white shadow-[0_18px_38px_rgba(16,185,129,0.2)]">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">UniMate</p>
        <h1 className="text-[28px] font-semibold tracking-[-0.035em]">Thời khóa biểu</h1>
        <p className="mt-2 text-sm text-white/82">Lớp học, lịch thi và deadline trong học kỳ {semester}.</p>
      </div>

      <div className="segment-bar mb-5" role="tablist" aria-label="Lịch học">
        {[
          ["schedule", "Thời khóa biểu"],
          ["classes", "Danh sách lớp"],
          ["deadlines", "Deadline"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={activeTab === value}
            onClick={() => setActiveTab(value as CalendarTab)}
            className={`segment-item ${activeTab === value ? "segment-item-active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "schedule" && (
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <SemesterSelect value={semester} onChange={setSemester} />
          <div className="premium-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2>Tháng 3, 2026</h2>
                <p className="mt-1 text-sm text-muted-foreground">Chọn ngày để xem thời gian biểu</p>
              </div>
              <span className="soft-chip">Hôm nay</span>
            </div>
            <div className="mb-3 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-muted-foreground">
              {daysOfWeek.map((day) => (
                <span key={day} className="py-1">{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const hasClass = semesterClasses.some((item) => item.day === day);
                const hasExam = exams.some((item) => item.semester === semester && item.day === day);
                const isSelected = selectedDate === day;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    aria-pressed={isSelected}
                    className={`relative flex aspect-square items-center justify-center rounded-2xl text-sm font-semibold transition-colors ${
                      isSelected ? "bg-primary text-white shadow-[0_10px_20px_rgba(16,185,129,0.24)]" : "bg-muted/55 text-foreground"
                    }`}
                  >
                    {day}
                    {(hasClass || hasExam) && <span className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : hasExam ? "bg-red-500" : "bg-primary"}`} />}
                  </button>
                );
              })}
            </div>
          </div>

          <AgendaList title={`Thời gian biểu ngày ${selectedDate}`} items={agendaItems} />
        </motion.section>
      )}

      {activeTab === "classes" && (
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <SemesterSelect value={semester} onChange={setSemester} />
          <ClassList title={`Danh sách lớp học kỳ ${semester}`} items={semesterClasses} />
        </motion.section>
      )}

      {activeTab === "deadlines" && (
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <SemesterSelect value={semester} onChange={setSemester} />
          <DeadlineList items={mockDeadlines.filter((item) => item.semester === semester)} />
        </motion.section>
      )}
    </div>
  );
}

function SemesterSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Học kỳ</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="field h-12">
        {mockSemesters.map((semester) => (
          <option key={semester} value={semester}>
            {semester}
          </option>
        ))}
      </select>
    </label>
  );
}

function ClassList({ title, items }: { title: string; items: typeof mockClasses }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="section-label">{title}</h2>
        <span className="text-xs font-semibold text-muted-foreground">{items.length} lớp</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="premium-card p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <span className={`mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.mode === "Online" ? "bg-cyan-50 text-cyan-600" : "bg-emerald-50 text-primary"}`}>
                  {item.mode}
                </span>
                <h3>{item.subject}</h3>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{item.code}</p>
              </div>
              <Search className="mt-1 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <Info icon={Clock} label={item.time} />
              <Info icon={MapPin} label={item.room} />
              <Info icon={CalendarCheck} label={`Tuần ${item.week}`} />
              <Info icon={UserRound} label={item.lecturer} />
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <div className="premium-card p-6 text-center text-sm text-muted-foreground">Không có lớp trong học kỳ hoặc ngày đã chọn.</div>
        )}
      </div>
    </section>
  );
}

function AgendaList({ title, items }: { title: string; items: AgendaItem[] }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="section-label">{title}</h2>
        <span className="text-xs font-semibold text-muted-foreground">{items.length} mục</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="premium-card p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <span className={`mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.badgeClass}`}>
                  {item.badge}
                </span>
                <h3>{item.title}</h3>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{item.code}</p>
              </div>
              <CalendarCheck className={`mt-1 h-5 w-5 ${item.iconClass}`} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <Info icon={Clock} label={item.time} />
              <Info icon={MapPin} label={item.room} />
              <Info icon={UserRound} label={item.meta} />
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <div className="premium-card p-6 text-center text-sm text-muted-foreground">Không có lịch trong ngày đã chọn.</div>
        )}
      </div>
    </section>
  );
}

function DeadlineList({ items }: { items: typeof mockDeadlines }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="section-label">Deadline học kỳ</h2>
        <span className="text-xs font-semibold text-muted-foreground">{items.length} việc</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="premium-card p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <span className="mb-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                  Deadline
                </span>
                <h3>{item.title}</h3>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{item.subject}</p>
              </div>
              <CalendarCheck className="mt-1 h-5 w-5 text-amber-500" />
            </div>
            <Info icon={Clock} label={item.dueDate} />
          </article>
        ))}
        {items.length === 0 && (
          <div className="premium-card p-6 text-center text-sm text-muted-foreground">Chưa có deadline trong học kỳ này.</div>
        )}
      </div>
    </section>
  );
}

function Info({ icon: Icon, label }: { icon: typeof Clock; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-muted/55 px-3 py-2">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <span className="truncate">{label}</span>
    </div>
  );
}
