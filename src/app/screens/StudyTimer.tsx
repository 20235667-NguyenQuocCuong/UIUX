import { FormEvent, useEffect, useState } from "react";
import { BookOpen, Flame, Pause, Play, RotateCcw, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";

const durationPresets = [10, 15, 25, 45, 60];
const minDuration = 1;
const maxDuration = 180;

export function StudyTimer() {
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("30");
  const [customError, setCustomError] = useState("");
  const [stats, setStats] = useState({
    totalMinutes: 127,
    sessions: 5,
    streak: 3,
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setStats((current) => ({
        ...current,
        totalMinutes: current.totalMinutes + durationMinutes,
        sessions: current.sessions + 1,
      }));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [durationMinutes, isRunning, timeLeft]);

  const totalSeconds = durationMinutes * 60;
  const isStarted = timeLeft < totalSeconds && timeLeft > 0;
  const isPaused = !isRunning && isStarted;
  const isFinished = timeLeft === 0;
  const isCustomDuration = !durationPresets.includes(durationMinutes);
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  const changeDuration = (minutes: number) => {
    setDurationMinutes(minutes);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  const handlePrimaryAction = () => {
    if (isFinished) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
      return;
    }

    setIsRunning((running) => !running);
  };

  const handleCustomSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const minutes = Number(customMinutes);

    if (!Number.isInteger(minutes) || minutes < minDuration || minutes > maxDuration) {
      setCustomError("Nhập số phút từ 1 đến 180.");
      return;
    }

    changeDuration(minutes);
    setCustomError("");
    setIsCustomOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const timerStatus = () => {
    if (isRunning) return "Đang tập trung";
    if (isPaused) return "Đã tạm dừng";
    if (isFinished) return "Hết giờ";
    return "Sẵn sàng bắt đầu";
  };

  const primaryLabel = () => {
    if (isRunning) return "Tạm dừng";
    if (isPaused) return "Tiếp tục";
    if (isFinished) return "Bắt đầu lại";
    return "Bắt đầu";
  };

  return (
    <div className="app-screen pb-32">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.04em] text-foreground">Bấm giờ học</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Tập trung học trong một phiên ngắn.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsCustomOpen((open) => !open)}
          className="flex h-11 items-center gap-2 rounded-full border border-border bg-white px-3.5 text-xs font-semibold text-muted-foreground shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
          aria-expanded={isCustomOpen}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Tùy chỉnh
        </button>
      </header>

      <section className="premium-card mb-5 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="section-label">Chọn thời lượng</h2>
          <span className="text-xs font-semibold text-muted-foreground">{durationMinutes} phút</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {durationPresets.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => changeDuration(minutes)}
              className={`h-12 rounded-2xl text-sm font-semibold transition-all ${
                durationMinutes === minutes
                  ? "bg-primary text-white shadow-[0_10px_20px_rgba(16,185,129,0.24)]"
                  : "border border-border bg-white text-slate-600 hover:bg-emerald-50 hover:text-primary"
              }`}
            >
              {minutes} phút
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsCustomOpen((open) => !open)}
            className={`h-12 rounded-2xl text-sm font-semibold transition-all ${
              isCustomDuration
                ? "bg-primary text-white shadow-[0_10px_20px_rgba(16,185,129,0.24)]"
                : "border border-dashed border-border bg-muted/45 text-slate-600 hover:bg-emerald-50 hover:text-primary"
            }`}
          >
            Tùy chỉnh
          </button>
        </div>

        {isCustomOpen && (
          <form onSubmit={handleCustomSubmit} className="mt-4 rounded-2xl bg-muted/55 p-3">
            <label htmlFor="custom-minutes" className="mb-2 block text-xs font-semibold text-muted-foreground">
              Nhập số phút
            </label>
            <div className="flex gap-2">
              <input
                id="custom-minutes"
                inputMode="numeric"
                pattern="[0-9]*"
                value={customMinutes}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");
                  setCustomMinutes(value);
                  setCustomError("");
                }}
                className="field h-12 flex-1"
                placeholder="1-180"
              />
              <button type="submit" className="h-12 rounded-2xl bg-primary px-4 text-sm font-semibold text-white">
                Lưu
              </button>
            </div>
            {customError && <p className="mt-2 text-xs font-semibold text-destructive">{customError}</p>}
          </form>
        )}
      </section>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="premium-card mb-5 p-6">
        <div className="relative mx-auto flex aspect-square w-full max-w-[306px] items-center justify-center">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 220" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <circle cx="110" cy="110" r="98" fill="none" stroke="#E2E8F0" strokeWidth="9" />
            <motion.circle
              cx="110"
              cy="110"
              r="98"
              fill="none"
              stroke="#F97316"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={616}
              strokeDashoffset={616 - (616 * progress) / 100}
              transform="rotate(-90 110 110)"
              animate={{ strokeDashoffset: 616 - (616 * progress) / 100 }}
              transition={{ duration: 0.35 }}
            />
          </svg>

          <div className="relative text-center">
            <p className="text-[58px] font-semibold leading-none tracking-[-0.05em] text-foreground" role="timer">
              {formatTime(timeLeft)}
            </p>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">{timerStatus()}</p>
          </div>
        </div>
      </motion.section>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={isRunning || isPaused ? resetTimer : resetTimer}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-100 text-sm font-semibold text-slate-600"
        >
          <RotateCcw className="h-5 w-5" />
          {isRunning || isPaused ? "Hủy" : "Đặt lại"}
        </button>
        <button
          type="button"
          onClick={handlePrimaryAction}
          className={`flex h-14 items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white shadow-[0_12px_24px_rgba(16,185,129,0.22)] ${
            isRunning ? "bg-accent" : "bg-primary"
          }`}
        >
          {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          {primaryLabel()}
        </button>
      </div>

      <section className="mb-5 grid grid-cols-3 gap-3">
        <Stat icon={BookOpen} value={stats.totalMinutes} label="phút học" color="bg-emerald-50 text-primary" />
        <Stat icon={Play} value={stats.sessions} label="phiên" color="bg-cyan-50 text-cyan-600" />
        <Stat icon={Flame} value={stats.streak} label="ngày liền" color="bg-orange-50 text-accent" />
      </section>

      <section className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 p-4">
        <h2 className="mb-2 text-sm font-semibold text-foreground">Mẹo học tập</h2>
        <p className="text-sm leading-6 text-muted-foreground">Đặt điện thoại xa tay và chỉ tập trung vào một việc trong phiên này.</p>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label, color }: { icon: typeof BookOpen; value: number; label: string; color: string }) {
  return (
    <div className="premium-card px-2 py-4 text-center">
      <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] leading-4 text-muted-foreground">{label}</p>
    </div>
  );
}
