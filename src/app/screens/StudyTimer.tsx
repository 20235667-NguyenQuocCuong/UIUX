import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Coffee, BookOpen, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

type TimerMode = "focus" | "break" | "longBreak";

export function StudyTimer() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<TimerMode>("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [todayStats, setTodayStats] = useState({
    totalMinutes: 127,
    sessions: 5,
    streak: 3,
  });

  const durations = {
    focus: 25 * 60,
    break: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (mode === "focus") {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      setTodayStats((stats) => ({
        ...stats,
        totalMinutes: stats.totalMinutes + 25,
        sessions: stats.sessions + 1,
      }));
      
      // After 4 focus sessions, take a long break
      if (newSessions % 4 === 0) {
        setMode("longBreak");
        setTimeLeft(durations.longBreak);
      } else {
        setMode("break");
        setTimeLeft(durations.break);
      }
    } else {
      setMode("focus");
      setTimeLeft(durations.focus);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(durations[newMode]);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100;

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
      <div className="screen-heading">
        <h1>{t("timer.title")}</h1>
        <p className="text-muted-foreground">{t("timer.subtitle")}</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        {/* Mode Selector */}
        <motion.div variants={item} className="segment-bar" role="tablist" aria-label="Chế độ đồng hồ">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => switchMode("focus")}
            role="tab"
            aria-selected={mode === "focus"}
            className={`segment-item ${
              mode === "focus"
                ? "segment-item-active"
                : ""
            }`}
          >
            {t("timer.focus")}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => switchMode("break")}
            role="tab"
            aria-selected={mode === "break"}
            className={`segment-item ${
              mode === "break"
                ? "segment-item-active"
                : ""
            }`}
          >
            {t("timer.break")}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => switchMode("longBreak")}
            role="tab"
            aria-selected={mode === "longBreak"}
            className={`segment-item ${
              mode === "longBreak"
                ? "segment-item-active"
                : ""
            }`}
          >
            {t("timer.longBreak")}
          </motion.button>
        </motion.div>

        {/* Timer Circle */}
        <motion.div
          variants={item}
          className={`relative overflow-hidden rounded-[28px] p-7 shadow-[0_18px_42px_rgba(102,87,245,0.24)] ${
            mode === "focus"
              ? "bg-[linear-gradient(135deg,#6657F5,#A08CFB)]"
              : mode === "break"
              ? "bg-[linear-gradient(135deg,#27B47E,#64D3A7)]"
              : "bg-[linear-gradient(135deg,#42A5F5,#9279FA)]"
          }`}
        >
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/10" />
          <div className="relative">
            {/* Progress Ring */}
            <svg
              className="h-auto w-full"
              viewBox="0 0 200 200"
              role="progressbar"
              aria-label="Tiến độ phiên học"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="8"
              />
              <motion.circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={534}
                strokeDashoffset={534 - (534 * progress) / 100}
                transform="rotate(-90 100 100)"
                initial={{ strokeDashoffset: 534 }}
                animate={{ strokeDashoffset: 534 - (534 * progress) / 100 }}
                transition={{ duration: 0.5 }}
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="text-center text-white"
                >
                  <p
                    className="mb-2 text-6xl font-semibold tracking-[-0.06em]"
                    role="timer"
                    aria-label={`${formatTime(timeLeft)} còn lại`}
                  >
                    {formatTime(timeLeft)}
                  </p>
                  <p className="text-sm opacity-90">
                    {mode === "focus"
                      ? t("timer.timeToFocus")
                      : mode === "break"
                      ? t("timer.takeBreak")
                      : t("timer.takeLongBreak")}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={resetTimer}
              aria-label="Đặt lại đồng hồ"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14 backdrop-blur-sm"
            >
              <RotateCcw className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTimer}
              aria-label={isRunning ? "Tạm dừng đồng hồ" : "Bắt đầu đồng hồ"}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_14px_28px_rgba(28,22,70,0.16)]"
            >
              {isRunning ? (
                <Pause className="w-8 h-8 text-primary" />
              ) : (
                <Play className="w-8 h-8 text-primary ml-1" />
              )}
            </motion.button>
            <div
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14 backdrop-blur-sm"
            >
              {mode === "focus" ? (
                <BookOpen className="w-6 h-6 text-white" />
              ) : (
                <Coffee className="w-6 h-6 text-white" />
              )}
            </div>
          </div>
        </motion.div>

        {/* Session Progress */}
        <motion.div variants={item} className="premium-card p-5">
          <h3 className="section-label mb-4">{t("timer.todayProgress")}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("timer.pomodorosCompleted")}
              </span>
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < sessionsCompleted % 4 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-center py-2">
              <p className="text-3xl font-bold text-primary">
                {sessionsCompleted}
              </p>
              <p className="text-xs text-muted-foreground">{t("timer.sessionsToday")}</p>
            </div>
          </div>
        </motion.div>

        {/* Today's Stats */}
        <motion.div variants={item} className="premium-card p-5">
          <h3 className="section-label mb-4">{t("timer.statistics")}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-muted/60 px-2 py-3 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xl font-bold">{todayStats.totalMinutes}</p>
              <p className="text-xs text-muted-foreground">{t("timer.minutes")}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 px-2 py-3 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Play className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-xl font-bold">{todayStats.sessions}</p>
              <p className="text-xs text-muted-foreground">{t("timer.sessions")}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 px-2 py-3 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <p className="text-xl font-bold">{todayStats.streak}</p>
              <p className="text-xs text-muted-foreground">{t("timer.streak")}</p>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div variants={item} className="glass-card p-5">
          <h4 className="font-medium mb-2">{t("timer.tips")}</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>{t("timer.tip1")}</li>
            <li>{t("timer.tip2")}</li>
            <li>{t("timer.tip3")}</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
