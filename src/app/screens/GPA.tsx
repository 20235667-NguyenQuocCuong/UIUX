import { useState } from "react";
import { TrendingUp, Award } from "lucide-react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useLanguage } from "../contexts/LanguageContext";

export function GPA() {
  const { t } = useLanguage();
  const [semester, setSemester] = useState("Học kỳ Xuân 2026");

  const subjectGrades = [
    {
      id: "ds",
      subject: "Cấu Trúc Dữ Liệu",
      grade: "A",
      gpa: 4.0,
      credits: 4,
      color: "bg-purple-500",
    },
    {
      id: "web",
      subject: "Phát Triển Web",
      grade: "A-",
      gpa: 3.7,
      credits: 3,
      color: "bg-blue-500",
    },
    {
      id: "db",
      subject: "Hệ Quản Trị CSDL",
      grade: "A",
      gpa: 4.0,
      credits: 4,
      color: "bg-green-500",
    },
    {
      id: "mobile",
      subject: "Lập Trình Di Động",
      grade: "B+",
      gpa: 3.3,
      credits: 3,
      color: "bg-orange-500",
    },
    {
      id: "ai",
      subject: "Trí Tuệ Nhân Tạo & Học Máy",
      grade: "A-",
      gpa: 3.7,
      credits: 4,
      color: "bg-pink-500",
    },
  ];

  const semesterData = [
    { id: "fall25", semester: "Thu '25", gpa: 3.5 },
    { id: "spring26", semester: "Xuân '26", gpa: 3.76 },
  ];

  const gradeDistribution = [
    { id: "grade-a", grade: "A", count: 3 },
    { id: "grade-a-minus", grade: "A-", count: 2 },
    { id: "grade-b-plus", grade: "B+", count: 1 },
    { id: "grade-b", grade: "B", count: 0 },
  ];

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
        <h1>{t("gpa.title")}</h1>
        <p className="text-muted-foreground">{t("gpa.subtitle")}</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        {/* Current GPA Card */}
        <motion.div
          variants={item}
          className="gradient-card relative p-7"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm opacity-90 mb-2">{t("gpa.currentGPA")}</p>
              <p className="mb-2 text-5xl font-semibold tracking-[-0.06em]">3.76</p>
              <p className="text-sm opacity-80">{t("gpa.outOf")}</p>
            </div>
            <Award className="w-12 h-12 opacity-80" />
          </div>
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "94%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-white h-full rounded-full"
            />
          </div>
          <p className="text-xs opacity-80 mt-2">{t("gpa.excellent")}</p>
        </motion.div>

        {/* Semester Filter */}
        <motion.div variants={item} className="segment-bar" role="tablist" aria-label="Chọn học kỳ">
          {["Học kỳ Xuân 2026", "Học kỳ Thu 2025"].map((option) => (
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

        {/* GPA Trend Chart */}
        <motion.div variants={item} className="premium-card p-5">
          <h3 className="section-label mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t("gpa.trend")}
          </h3>
          <div role="img" aria-label="Biểu đồ xu hướng GPA từ học kỳ Thu 2025 đến Xuân 2026">
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
              <Line
                type="monotone"
                dataKey="gpa"
                stroke="#6657F5"
                strokeWidth={3}
                dot={{ fill: "#6657F5", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Grade Distribution */}
        <motion.div variants={item} className="premium-card p-5">
          <h3 className="section-label mb-4">{t("gpa.gradeDistribution")}</h3>
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
              <Bar dataKey="count" fill="#8978FC" radius={[10, 10, 10, 10]} />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subject Grades */}
        <motion.div variants={item} className="space-y-3">
          <h3 className="section-label mb-4">{t("gpa.subjectGrades")}</h3>
          {subjectGrades.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="premium-card p-4"
            >
              <div className="flex items-center gap-4">
                <div className={`${subject.color} h-11 w-1 rounded-full flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium mb-1">{subject.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {subject.credits} {t("gpa.credits")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-primary">
                    {subject.grade}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {subject.gpa.toFixed(1)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="premium-card p-5">
          <h3 className="section-label mb-4">{t("gpa.semesterStats")}</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl text-primary mb-1">18</p>
              <p className="text-xs text-muted-foreground">{t("gpa.totalCredits")}</p>
            </div>
            <div>
              <p className="text-2xl text-secondary mb-1">5</p>
              <p className="text-xs text-muted-foreground">{t("gpa.subjects")}</p>
            </div>
            <div>
              <p className="text-2xl text-accent mb-1">3</p>
              <p className="text-xs text-muted-foreground">{t("gpa.aGrades")}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
