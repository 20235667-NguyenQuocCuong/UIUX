import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function AddDeadline() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [taskName, setTaskName] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(true);

  const subjects = [
    { key: "subjects.dataStructures", value: "Cấu Trúc Dữ Liệu" },
    { key: "subjects.webDevelopment", value: "Phát Triển Web" },
    { key: "subjects.database", value: "Hệ Quản Trị CSDL" },
    { key: "subjects.mobile", value: "Lập Trình Di Động" },
    { key: "subjects.ai", value: "Trí Tuệ Nhân Tạo & Học Máy" },
    { key: "subjects.software", value: "Công Nghệ Phần Mềm" },
  ];

  const priorities = [
    { labelKey: "deadlines.normal", value: "normal", color: "bg-accent" },
    { labelKey: "deadlines.high", value: "high", color: "bg-warning" },
    { labelKey: "deadlines.urgent", value: "urgent", color: "bg-destructive" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - navigate back
    navigate("/deadlines");
  };

  return (
    <div className="app-screen pb-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/deadlines")}
          className="rounded-2xl border border-border bg-white p-3 text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        <div>
          <h1 className="text-[26px] font-semibold tracking-[-0.04em]">{t("addDeadline.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Lập kế hoạch để không bỏ lỡ công việc quan trọng.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="premium-card space-y-5 p-5">
        <div>
          <label className="block text-sm mb-2">{t("addDeadline.taskName")}</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder={t("addDeadline.taskPlaceholder")}
            className="field"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-2">{t("addDeadline.subject")}</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="field"
            required
          >
            <option value="">{t("addDeadline.selectSubject")}</option>
            {subjects.map((s) => (
              <option key={s.value} value={s.value}>
                {t(s.key)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">{t("addDeadline.dueDate")}</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="field"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-3">{t("addDeadline.priority")}</label>
          <div className="segment-bar">
            {priorities.map((p) => (
              <motion.button
                key={p.value}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setPriority(p.value)}
                className={`segment-item ${
                  priority === p.value
                    ? "segment-item-active"
                    : ""
                }`}
              >
                {t(p.labelKey)}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2">{t("addDeadline.description")}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("addDeadline.descPlaceholder")}
            rows={4}
            className="field h-auto min-h-28 resize-none py-4"
          />
        </div>

        <div className="rounded-2xl border border-border bg-muted/45 p-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">{t("addDeadline.setReminder")}</p>
              <p className="text-sm text-muted-foreground">
                {t("addDeadline.reminderDesc")}
              </p>
            </div>
            <input
              type="checkbox"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
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
            {t("addDeadline.cancel")}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="primary-action flex-1"
          >
            {t("addDeadline.save")}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
