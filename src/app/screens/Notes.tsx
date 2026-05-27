import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Notes() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");

  const subjects = [
    "Cấu Trúc Dữ Liệu",
    "Phát Triển Web",
    "Hệ Quản Trị CSDL",
    "Lập Trình Di Động",
  ];

  const semesters = ["Học kỳ Xuân 2026", "Học kỳ Thu 2025", "Học kỳ Xuân 2025"];

  const notes = [
    {
      subject: "Cấu Trúc Dữ Liệu",
      semester: "Học kỳ Xuân 2026",
      title: "Cây tìm kiếm nhị phân",
      preview: "Tính chất và thao tác trên cây: chèn, xóa, tìm kiếm...",
      date: "24/03/2026",
      color: "bg-purple-500",
    },
    {
      subject: "Phát Triển Web",
      semester: "Học kỳ Xuân 2026",
      title: "Hướng dẫn React Hooks",
      preview: "Tổng quan và ví dụ về useState, useEffect, useContext...",
      date: "23/03/2026",
      color: "bg-blue-500",
    },
    {
      subject: "Hệ Quản Trị CSDL",
      semester: "Học kỳ Xuân 2026",
      title: "Các phép nối SQL",
      preview: "Phép nối trong, nối ngoài, nối trái và nối phải kèm ví dụ...",
      date: "22/03/2026",
      color: "bg-green-500",
    },
    {
      subject: "Cấu Trúc Dữ Liệu",
      semester: "Học kỳ Thu 2025",
      title: "Thuật toán đồ thị",
      preview: "DFS, BFS, thuật toán Dijkstra và bài toán đường đi ngắn nhất...",
      date: "20/03/2026",
      color: "bg-purple-500",
    },
    {
      subject: "Phát Triển Web",
      semester: "Học kỳ Thu 2025",
      title: "Thiết kế API REST",
      preview: "Các thực hành tốt khi thiết kế API REST và phương thức HTTP...",
      date: "19/03/2026",
      color: "bg-blue-500",
    },
    {
      subject: "Lập Trình Di Động",
      semester: "Học kỳ Xuân 2026",
      title: "Vòng đời Android",
      preview: "Tìm hiểu vòng đời màn hình và cách quản lý trạng thái...",
      date: "18/03/2026",
      color: "bg-orange-500",
    },
  ];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSubject =
      filterSubject === "all" || note.subject === filterSubject;
    const matchesSemester =
      filterSemester === "all" || note.semester === filterSemester;
    return matchesSearch && matchesSubject && matchesSemester;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
        <h1>{t("notes.title")}</h1>
        <p className="text-muted-foreground">{t("notes.subtitle")}</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder={t("notes.search")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="field pl-12"
        />
      </div>

      {/* Filters - Dropdown Style */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 px-1">
            {t("notes.semester")}
          </label>
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="field h-12 px-3"
          >
            <option value="all">{t("notes.allSemesters")}</option>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1.5 px-1">
            {t("notes.subject")}
          </label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="field h-12 px-3"
          >
            <option value="all">{t("notes.allSubjects")}</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {filteredNotes.map((note, index) => (
          <motion.div
            key={index}
            variants={item}
            whileTap={{ scale: 0.98 }}
            className="premium-card cursor-pointer p-5 transition-shadow hover:shadow-[0_14px_34px_rgba(28,22,70,0.10)]"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`${note.color} w-1 h-16 rounded-full`} />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-2">{note.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {note.preview}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="soft-chip"
                  >
                    {note.subject}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {note.date}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">{t("notes.noNotes")}</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="primary-action inline-flex gap-2"
          >
            <Plus className="w-5 h-5" />
            {t("notes.createNote")}
          </motion.button>
        </div>
      )}
    </div>
  );
}
