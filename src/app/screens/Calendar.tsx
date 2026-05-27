import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Calendar() {
  const { t } = useLanguage();
  const [currentMonth] = useState("Tháng 3, 2026");
  const [selectedDate, setSelectedDate] = useState(26);

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

  const getTodayEvents = () => [
    {
      type: "class",
      title: t("subjects.dataStructures"),
      time: "09:00 - 10:30",
      color: "bg-purple-500",
    },
    {
      type: "class",
      title: t("subjects.webDevelopment"),
      time: "11:00 - 12:30",
      color: "bg-blue-500",
    },
    {
      type: "deadline",
      title: "Ôn tập kiểm tra",
      time: t("calendar.dueToday"),
      color: "bg-orange-500",
    },
  ];

  const todayEvents = getTodayEvents();

  return (
    <div className="app-screen">
      {/* Header */}
      <div className="screen-heading">
        <h1>{t("calendar.title")}</h1>
        <p className="text-muted-foreground">{t("calendar.viewSchedule")}</p>
      </div>

      {/* Calendar Card */}
      <div className="premium-card mb-6 p-5">
        {/* Month Selector */}
        <div className="flex items-center justify-between mb-6">
          <motion.button whileTap={{ scale: 0.94 }} className="rounded-xl bg-muted p-2.5 text-muted-foreground">
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <h3 className="text-base font-semibold">{currentMonth}</h3>
          <motion.button whileTap={{ scale: 0.94 }} className="rounded-xl bg-muted p-2.5 text-muted-foreground">
            <ChevronRight className="w-5 h-5" />
          </motion.button>
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
        <h3 className="section-label mb-4">{t("calendar.eventsFor")} {selectedDate}</h3>
        <div className="space-y-3">
          {todayEvents.map((event, index) => (
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
              <span
                className="soft-chip"
              >
                {event.type === "class" ? t("calendar.class") : t("calendar.deadline")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
