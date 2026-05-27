import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, BookOpen, Award, Minus, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

const durationPresets = [15, 25, 45, 60];
const minimumDuration = 5;
const maximumDuration = 180;

export function StudyTimer() {
  const { t } = useLanguage();
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [todayStats, setTodayStats] = useState({
    totalMinutes: 127,
    sessions: 5,
    streak: 3,
  });

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
    setSessionsCompleted((completed) => completed + 1);
    setTodayStats((stats) => ({
      ...stats,
      totalMinutes: stats.totalMinutes + durationMinutes,
      sessions: stats.sessions + 1,
    }));
    setTimeLeft(durationMinutes * 60);
  };

  const toggleTimer = () => {
    setIsRunning((running) => !running);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durationMinutes * 60);
  };

  const changeDuration = (minutes: number) => {
    const nextDuration = Math.min(maximumDuration, Math.max(minimumDuration, minutes));
    setDurationMinutes(nextDuration);
    setTimeLeft(nextDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress = ((durationMinutes * 60 - timeLeft) / (durationMinutes * 60)) * 100;

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
        <motion.div variants={item} className="premium-card p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="section-label">Thời lượng phiên học</p>
              <p className="mt-1 text-sm text-muted-foreground">Điều chỉnh trước khi bắt đầu</p>
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-muted/70 p-1">
              <button
                type="button"
                onClick={() => changeDuration(durationMinutes - 5)}
                disabled={isRunning || durationMinutes <= minimumDuration}
                aria-label="Giảm 5 phút"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-primary transition-colors hover:bg-white disabled:text-muted-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[54px] text-center text-sm font-semibold text-foreground">
                {durationMinutes} phút
              </span>
              <button
                type="button"
                onClick={() => changeDuration(durationMinutes + 5)}
                disabled={isRunning || durationMinutes >= maximumDuration}
                aria-label="Tăng 5 phút"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-primary transition-colors hover:bg-white disabled:text-muted-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2" aria-label="Thời lượng đề xuất">
            {durationPresets.map((minutes) => (
              <button
                key={minutes}
                type="button"
                onClick={() => changeDuration(minutes)}
                disabled={isRunning}
                aria-pressed={durationMinutes === minutes}
                className={`h-10 rounded-xl text-sm font-medium transition-all ${
                  durationMinutes === minutes
                    ? "bg-primary text-white shadow-[0_8px_16px_rgba(102,87,245,0.22)]"
                    : "bg-muted/70 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {minutes}p
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timer Circle */}
        <motion.div
          variants={item}
          className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#6657F5,#A08CFB)] p-7 shadow-[0_18px_42px_rgba(102,87,245,0.24)]"
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
              <div className="text-center text-white">
                <p
                  className="mb-2 text-6xl font-semibold tracking-[-0.06em]"
                  role="timer"
                  aria-label={`${formatTime(timeLeft)} còn lại`}
                >
                  {formatTime(timeLeft)}
                </p>
                <p className="text-sm opacity-90">
                  {isRunning ? "Phiên học đang diễn ra" : "Sẵn sàng bắt đầu"}
                </p>
              </div>
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
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Session Progress */}
        <motion.div variants={item} className="premium-card p-5">
          <h3 className="section-label mb-4">{t("timer.todayProgress")}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("timer.completedSessions")}
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
