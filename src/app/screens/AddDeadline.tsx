import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function AddDeadline() {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(true);

  const subjects = [
    "Cấu trúc dữ liệu",
    "Phát triển Web",
    "Hệ quản trị CSDL",
    "Lập trình di động",
    "Trí tuệ nhân tạo & học máy",
    "Công nghệ phần mềm",
  ];

  const priorities = [
    { label: "Bình thường", value: "normal", dot: "bg-accent", selected: "bg-accent/10 text-accent" },
    { label: "Cao", value: "high", dot: "bg-warning", selected: "bg-warning/10 text-warning" },
    { label: "Khẩn cấp", value: "urgent", dot: "bg-destructive", selected: "bg-destructive/10 text-destructive" },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/deadlines");
  };

  return (
    <div className="app-screen pb-6">
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/deadlines")}
          aria-label="Quay lại danh sách deadline"
          className="rounded-2xl border border-border bg-white p-3 text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-6 w-6" />
        </motion.button>
        <div>
          <h1 className="text-[26px] font-semibold tracking-[-0.04em]">Thêm deadline</h1>
          <p className="mt-1 text-sm text-muted-foreground">Lập kế hoạch để không bỏ lỡ công việc quan trọng.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="premium-card space-y-5 p-5">
        <div>
          <label htmlFor="task-name" className="mb-2 block text-sm">Tên nhiệm vụ</label>
          <input
            id="task-name"
            type="text"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            placeholder="VD: Bài tập thuật toán"
            className="field"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-sm">Môn học</label>
          <select
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="field"
            required
          >
            <option value="">Chọn môn học</option>
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="due-date" className="mb-2 block text-sm">Deadline</label>
          <input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="field"
            required
          />
        </div>

        <div>
          <label className="mb-3 block text-sm">Độ ưu tiên</label>
          <div className="segment-bar" role="radiogroup" aria-label="Độ ưu tiên">
            {priorities.map((item) => (
              <motion.button
                key={item.value}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setPriority(item.value)}
                role="radio"
                aria-checked={priority === item.value}
                className={`segment-item flex items-center justify-center gap-2 ${
                  priority === item.value ? `${item.selected} shadow-sm` : ""
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm">Mô tả (tùy chọn)</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Thêm ghi chú hoặc chi tiết..."
            rows={4}
            className="field h-auto min-h-28 resize-none py-4"
          />
        </div>

        <div className="rounded-2xl border border-border bg-muted/45 p-4">
          <label htmlFor="deadline-reminder" className="flex cursor-pointer items-center justify-between">
            <div>
              <p className="font-medium">Đặt nhắc nhở</p>
              <p className="text-sm text-muted-foreground">Nhận thông báo trước deadline</p>
            </div>
            <input
              id="deadline-reminder"
              type="checkbox"
              checked={reminder}
              onChange={(event) => setReminder(event.target.checked)}
              className="h-5 w-5 accent-primary"
            />
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate("/deadlines")}
            className="secondary-action flex-1"
          >
            Hủy
          </motion.button>
          <motion.button whileTap={{ scale: 0.98 }} type="submit" className="primary-action flex-1">
            Lưu deadline
          </motion.button>
        </div>
      </form>
    </div>
  );
}
