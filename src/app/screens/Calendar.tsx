import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

type EventType = "class" | "deadline" | "exam";

export function Calendar() {
  const { t } = useLanguage();
  const [currentMonth] = useState("Tháng 3, 2026");
  const [selectedDate, setSelectedDate] = useState(26);
  const [eventFilter, setEventFilter] = useState<"all" | EventType>("all");

  const daysOfWeek = [
    t("days.sun"),
    t("days.mon"),
    t("days.tue"),
    t("days.wed"),
    t("days.thu"),
    t("days.fri"),
    t("days.sat"),
  ];
  
  // Mock calendar days for March 2026
  const calendarDays = [
    { day: null, hasEvent: false },
    { day: null, hasEvent: false },
    { day: null, hasEvent: false },
    { day: null, hasEvent: false },
    { day: null, hasEvent: false },
    { day: null, hasEvent: false },
    { day: 1, hasEvent: false },
    { day: 2, hasEvent: true },
    { day: 3, hasEvent: false },
    { day: 4, hasEvent: false },
    { day: 5, hasEvent: true },
    { day: 6, hasEvent: false },
    { day: 7, hasEvent: false },
    { day: 8, hasEvent: false },
    { day: 9, hasEvent: true },
    { day: 10, hasEvent: false },
    { day: 11, hasEvent: false },
    { day: 12, hasEvent: true },
    { day: 13, hasEvent: false },
    { day: 14, hasEvent: false },
    { day: 15, hasEvent: false },
    { day: 16, hasEvent: true },
    { day: 17, hasEvent: false },
    { day: 18, hasEvent: false },
    { day: 19, hasEvent: true },
    { day: 20, hasEvent: false },
    { day: 21, hasEvent: false },
    { day: 22, hasEvent: false },
    { day: 23, hasEvent: true },
    { day: 24, hasEvent: false },
    { day: 25, hasEvent: false },
    { day: 26, hasEvent: true },
    { day: 27, hasEvent: true },
    { day: 28, hasEvent: true },
    { day: 29, hasEvent: false },
    { day: 30, hasEvent: true },
    { day: 31, hasEvent: false },
  ];

  const eventsByDate: Record<number, { type: EventType; title: string; time: string; color: string }[]> = {
    26: [
      {
        type: "class",
        title: t("subjects.dataStructures"),
        time: "09:00 - 10:30",
        color: "bg-primary",
      },
      {
        type: "class",
        title: t("subjects.webDevelopment"),
        time: "11:00 - 12:30",
        color: "bg-accent",
      },
      {
        type: "deadline",
        title: "Ôn tập kiểm tra",
        time: t("calendar.dueToday"),
        color: "bg-warning",
      },
    ],
    27: [
      {
        type: "exam",
        title: "Kiểm tra Cấu trúc dữ liệu",
        time: "08:00 - 09:00",
        color: "bg-destructive",
      },
    ],
    28: [
      {
        type: "deadline",
        title: "Nộp đề xuất dự án",
        time: "23:59",
        color: "bg-warning",
      },
    ],
  };

  const filterOptions = [
    { value: "all" as const, label: "Tất cả" },
    { value: "class" as const, label: "Lớp học" },
    { value: "exam" as const, label: "Kiểm tra" },
    { value: "deadline" as const, label: "Hạn nộp" },
  ];

  const selectedEvents = eventsByDate[selectedDate] ?? [];
  const visibleEvents =
    eventFilter === "all"
      ? selectedEvents
      : selectedEvents.filter((event) => event.type === eventFilter);

  const typeLabel = (type: EventType) => {
    if (type === "class") return t("calendar.class");
    if (type === "exam") return "Kiểm tra";
    return t("calendar.deadline");
  };

  const chipClass = (type: EventType) => {
    if (type === "class") return "bg-primary/10 text-primary";
    if (type === "exam") return "bg-destructive/10 text-destructive";
    return "bg-warning/15 text-warning";
  };

  return (
    <div className="app-screen">
      {/* Header */}
      <div className="screen-heading">
        <h1>{t("calendar.title")}</h1>
        <p className="text-muted-foreground">{t("calendar.viewSchedule")}</p>
      </div>

      {/* Calendar Card */}
      <div className="premium-card mb-6 p-5">
        {/* Month Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-base font-semibold">{currentMonth}</h3>
          <span className="soft-chip">Hôm nay</span>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((item, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: item.day ? 0.9 : 1 }}
              onClick={() => item.day && setSelectedDate(item.day)}
              disabled={!item.day}
              aria-label={item.day ? `Ngày ${item.day}, tháng 3` : undefined}
              aria-pressed={item.day === selectedDate}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm font-medium transition-colors ${
                item.day === selectedDate
                  ? "bg-primary text-white shadow-[0_8px_16px_rgba(102,87,245,0.28)]"
                  : item.day
                  ? "hover:bg-muted"
                  : ""
              }`}
            >
              {item.day && (
                <>
                  <span>{item.day}</span>
                  {item.hasEvent && (
                    <div
                      className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        item.day === selectedDate
                          ? "bg-white"
                          : "bg-primary"
                      }`}
                    />
                  )}
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Events for Selected Date */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-label">{t("calendar.eventsFor")} {selectedDate}</h3>
          <span className="text-xs font-medium text-muted-foreground">{selectedEvents.length} sự kiện</span>
        </div>
        <div className="scrollbar-hidden mb-4 flex gap-2 overflow-x-auto" role="tablist" aria-label="Lọc sự kiện">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={eventFilter === option.value}
              onClick={() => setEventFilter(option.value)}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                eventFilter === option.value
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-muted-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {visibleEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="premium-card flex items-center gap-4 p-4"
            >
              <div className={`${event.color} w-1 h-12 rounded-full`} />
              <div className="flex-1">
                <p className="font-medium mb-1">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
              <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${chipClass(event.type)}`}>
                {typeLabel(event.type)}
              </span>
            </motion.div>
          ))}
          {visibleEvents.length === 0 && (
            <div className="premium-card px-5 py-8 text-center" role="status">
              <p className="text-sm font-medium text-foreground">Không có sự kiện phù hợp</p>
              <p className="mt-1 text-xs text-muted-foreground">Chọn ngày hoặc loại sự kiện khác để xem lịch.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
