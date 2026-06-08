import { useState } from "react";
import { Award, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockSemesters } from "../data/mockDb";

const subjectGrades = [
  {
    id: "ds",
    subject: "Cấu trúc dữ liệu",
    grade: "A",
    gpa: 4.0,
    credits: 4,
    semester: "2026.2",
    color: "bg-emerald-500",
  },
  {
    id: "web",
    subject: "Phát triển Web",
    grade: "B+",
    gpa: 3.5,
    credits: 3,
    semester: "2026.2",
    color: "bg-cyan-500",
  },
  {
    id: "db",
    subject: "Hệ quản trị CSDL",
    grade: "A",
    gpa: 4.0,
    credits: 4,
    semester: "2026.2",
    color: "bg-green-500",
  },
  {
    id: "mobile",
    subject: "Lập trình di động",
    grade: "B+",
    gpa: 3.3,
    credits: 3,
    semester: "2026.1",
    color: "bg-orange-500",
  },
  {
    id: "ai",
    subject: "Trí tuệ nhân tạo & học máy",
    grade: "B+",
    gpa: 3.5,
    credits: 4,
    semester: "2025.2",
    color: "bg-pink-500",
  },
];

const semesterData = [
  { id: "2025-2", semester: "2025.2", GPA: 3.5 },
  { id: "2026-1", semester: "2026.1", GPA: 3.62 },
  { id: "2026-2", semester: "2026.2", GPA: 3.76 },
];

const gradeDistribution = [
  { id: "grade-a", grade: "A", "Tổng TC": 8 },
  { id: "grade-b-plus", grade: "B+", "Tổng TC": 10 },
  { id: "grade-b", grade: "B", "Tổng TC": 0 },
];

export function GPA() {
  const [semester, setSemester] = useState("2026.2");
  const visibleGrades = subjectGrades.filter((subject) => subject.semester === semester);

  return (
    <div className="app-screen">
      <motion.div initial="hidden" animate="show" className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-card relative p-7">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="mb-2 text-sm opacity-90">GPA hiện tại</p>
              <p className="mb-2 text-5xl font-semibold tracking-[-0.06em]">3.76</p>
              <p className="text-sm opacity-80">Học kỳ {semester}</p>
            </div>
            <Award className="h-12 w-12 opacity-80" />
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "94%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-white"
            />
          </div>
          <p className="mt-2 text-xs opacity-80">Kết quả học tập đang rất tốt.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="segment-bar" role="tablist" aria-label="Chọn học kỳ">
          {mockSemesters.slice(0, 3).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSemester(option)}
              role="tab"
              aria-selected={semester === option}
              className={`segment-item ${semester === option ? "segment-item-active" : ""}`}
            >
              {option}
            </button>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-5">
          <h3 className="section-label mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Xu hướng GPA
          </h3>
          <div role="img" aria-label="Biểu đồ xu hướng GPA theo học kỳ">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={semesterData}>
                <CartesianGrid vertical={false} strokeDasharray="4 6" stroke="#eceef6" />
                <XAxis dataKey="semester" stroke="#64748b" fontSize={12} />
                <YAxis domain={[0, 4]} stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e8eaf2",
                    borderRadius: "14px",
                    boxShadow: "0 10px 24px rgba(28,22,70,0.08)",
                  }}
                />
                <Line type="monotone" dataKey="GPA" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-5">
          <h3 className="section-label mb-4">Phân bổ điểm</h3>
          <div role="img" aria-label="Biểu đồ phân bổ điểm chữ">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid vertical={false} strokeDasharray="4 6" stroke="#eceef6" />
                <XAxis dataKey="grade" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e8eaf2",
                    borderRadius: "14px",
                    boxShadow: "0 10px 24px rgba(28,22,70,0.08)",
                  }}
                />
                <Bar dataKey="Tổng TC" fill="#06B6D4" radius={[10, 10, 10, 10]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <h3 className="section-label mb-4">Điểm môn học</h3>
          {visibleGrades.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="premium-card p-4"
            >
              <div className="flex items-center gap-4">
                <div className={`${subject.color} h-11 w-1 flex-shrink-0 rounded-full`} />
                <div className="min-w-0 flex-1">
                  <p className="mb-1 font-medium">{subject.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {subject.credits} tín chỉ · {subject.semester}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-primary">{subject.grade}</p>
                  <p className="text-xs text-muted-foreground">{subject.gpa.toFixed(1)}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {visibleGrades.length === 0 && (
            <div className="premium-card p-6 text-center text-sm text-muted-foreground">Chưa có điểm cho học kỳ {semester}.</div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-5">
          <h3 className="section-label mb-4">Thống kê học kỳ</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="mb-1 text-2xl text-primary">18</p>
              <p className="text-xs text-muted-foreground">Tổng tín chỉ</p>
            </div>
            <div>
              <p className="mb-1 text-2xl text-secondary">{visibleGrades.length}</p>
              <p className="text-xs text-muted-foreground">Môn học</p>
            </div>
            <div>
              <p className="mb-1 text-2xl text-accent">3</p>
              <p className="text-xs text-muted-foreground">Điểm A</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
