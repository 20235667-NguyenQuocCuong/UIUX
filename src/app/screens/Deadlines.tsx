import { useState } from "react";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { motion } from "motion/react";

type PeriodFilter = "all" | "today" | "week" | "month";
type StatusFilter = "all" | "completed" | "pending" | "overdue";
type DeadlineStatus = "pending" | "overdue";

const periodFilters: { label: string; value: PeriodFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Hôm nay", value: "today" },
  { label: "Tuần này", value: "week" },
  { label: "Tháng này", value: "month" },
];

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Đã làm", value: "completed" },
  { label: "Chưa làm", value: "pending" },
  { label: "Quá hạn", value: "overdue" },
];

export function Deadlines() {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deadlines, setDeadlines] = useState([
    {
      id: "algorithm",
      task: "Bài tập Thuật toán",
      subject: "Cấu trúc dữ liệu",
      dueDate: "Hôm nay, 23:59",
      period: "today",
      priority: "urgent",
      status: "pending" as DeadlineStatus,
      completed: false,
    },
    {
      id: "proposal",
      task: "Đề xuất dự án",
      subject: "Phát triển Web",
      dueDate: "28/03/2026",
      period: "week",
      priority: "high",
      status: "overdue" as DeadlineStatus,
      completed: false,
    },
    {
      id: "report",
      task: "Báo cáo thực hành",
      subject: "Hệ quản trị CSDL",
      dueDate: "30/03/2026",
      period: "week",
      priority: "normal",
      status: "pending" as DeadlineStatus,
      completed: false,
    },
    {
      id: "research",
      task: "Bài nghiên cứu",
      subject: "Trí tuệ nhân tạo & học máy",
      dueDate: "05/04/2026",
      period: "month",
      priority: "high",
      status: "pending" as DeadlineStatus,
      completed: false,
    },
    {
      id: "quiz",
      task: "Ôn tập kiểm tra",
      subject: "Lập trình di động",
      dueDate: "27/03/2026",
      period: "week",
      priority: "normal",
      status: "pending" as DeadlineStatus,
      completed: true,
    },
  ]);

  const getDisplayStatus = (deadline: (typeof deadlines)[number]) => {
    if (deadline.completed) return "completed";
    return deadline.status;
  };

  const filteredDeadlines = deadlines.filter((deadline) => {
    const matchesPeriod =
      periodFilter === "all" ||
      periodFilter === "month" ||
      (periodFilter === "week" && (deadline.period === "today" || deadline.period === "week")) ||
      deadline.period === periodFilter;
    const displayStatus = getDisplayStatus(deadline);
    const matchesStatus = statusFilter === "all" || statusFilter === displayStatus;

    return matchesPeriod && matchesStatus;
  });

  const completedCount = deadlines.filter((deadline) => deadline.completed).length;

  const toggleCompleted = (id: string) => {
    setDeadlines((current) =>
      current.map((deadline) =>
        deadline.id === id ? { ...deadline, completed: !deadline.completed } : deadline
      )
    );
  };

  const cardClass = (deadline: (typeof deadlines)[number]) => {
    const displayStatus = getDisplayStatus(deadline);
    if (displayStatus === "completed") return "border-emerald-100 bg-emerald-50/80";
    if (displayStatus === "overdue") return "border-red-100 bg-red-50/80";
    return "bg-white";
  };

  const statusLabel = (deadline: (typeof deadlines)[number]) => {
    const displayStatus = getDisplayStatus(deadline);
    if (displayStatus === "completed") return "Đã làm";
    if (displayStatus === "overdue") return "Quá hạn";
    return "Chưa làm";
  };

  const statusBadgeClass = (deadline: (typeof deadlines)[number]) => {
    const displayStatus = getDisplayStatus(deadline);
    if (displayStatus === "completed") return "bg-emerald-100 text-primary";
    if (displayStatus === "overdue") return "bg-red-100 text-destructive";
    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="app-screen">
      <div className="screen-heading">
        <h1>Deadline</h1>
        <p className="text-muted-foreground">
          {completedCount}/{deadlines.length} deadline đã hoàn thành
        </p>
      </div>

      <div className="premium-card mb-6 grid grid-cols-2 gap-3 p-4">
        <label className="block">
          <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Thời gian</span>
          <select
            value={periodFilter}
            onChange={(event) => setPeriodFilter(event.target.value as PeriodFilter)}
            className="field h-12 px-3"
          >
            {periodFilters.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Trạng thái</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="field h-12 px-3"
          >
            {statusFilters.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <motion.div initial="hidden" animate="show" className="space-y-3">
        {filteredDeadlines.map((deadline, index) => {
          const displayStatus = getDisplayStatus(deadline);

          return (
            <motion.div
              key={deadline.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className={`premium-card p-5 ${cardClass(deadline)}`}
            >
              <div className="flex items-start gap-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleCompleted(deadline.id)}
                  aria-label={deadline.completed ? `Đánh dấu ${deadline.task} chưa làm` : `Đánh dấu ${deadline.task} đã làm`}
                  aria-pressed={deadline.completed}
                  className="-m-2 mt-[-0.375rem] rounded-full p-2.5"
                >
                  {deadline.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : (
                    <Circle className={`h-6 w-6 ${displayStatus === "overdue" ? "text-destructive" : "text-muted-foreground"}`} />
                  )}
                </motion.button>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className={`font-medium ${deadline.completed ? "text-muted-foreground line-through" : ""}`}>
                      {deadline.task}
                    </h3>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusBadgeClass(deadline)}`}>
                      {statusLabel(deadline)}
                    </span>
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="soft-chip">{deadline.subject}</span>
                    {deadline.priority === "urgent" && (
                      <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold text-destructive">
                        <AlertCircle className="h-3 w-3" />
                        Khẩn cấp
                      </span>
                    )}
                    {deadline.priority === "high" && (
                      <span className="rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-semibold text-warning">
                        Cao
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">Deadline: {deadline.dueDate}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {filteredDeadlines.length === 0 && (
        <div className="premium-card py-12 text-center" role="status">
          <p className="text-muted-foreground">Không có deadline phù hợp với bộ lọc này</p>
        </div>
      )}
    </div>
  );
}
