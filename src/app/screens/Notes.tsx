import { FormEvent, useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { mockNotes, mockSemesters, mockSubjects, MockNote } from "../data/mockDb";

const subjectColors: Record<string, string> = {
  "Cấu trúc dữ liệu": "bg-emerald-500",
  "Phát triển Web": "bg-cyan-500",
  "Hệ quản trị CSDL": "bg-green-500",
  "Lập trình di động": "bg-orange-500",
};

export function Notes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<MockNote[]>(mockNotes);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");
  const [form, setForm] = useState({
    title: "",
    preview: "",
    subject: mockSubjects[0],
    semester: mockSemesters[0],
  });

  useEffect(() => {
    const routeState = location.state as { openAddNote?: boolean } | null;
    if (routeState?.openAddNote) {
      setIsAddOpen(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  const filteredNotes = notes.filter((note) => {
    const normalizedSearch = searchQuery.toLowerCase();
    const matchesSearch =
      note.title.toLowerCase().includes(normalizedSearch) ||
      note.preview.toLowerCase().includes(normalizedSearch);
    const matchesSubject = filterSubject === "all" || note.subject === filterSubject;
    const matchesSemester = filterSemester === "all" || note.semester === filterSemester;
    return matchesSearch && matchesSubject && matchesSemester;
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = form.title.trim();
    const preview = form.preview.trim();

    if (!title || !preview) return;

    const newNote: MockNote = {
      id: `note-${Date.now()}`,
      title,
      preview,
      subject: form.subject,
      semester: form.semester,
      date: new Intl.DateTimeFormat("vi-VN").format(new Date()),
      color: subjectColors[form.subject] ?? "bg-primary",
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);
    setSearchQuery("");
    setFilterSubject("all");
    setFilterSemester("all");
    setForm({
      title: "",
      preview: "",
      subject: mockSubjects[0],
      semester: mockSemesters[0],
    });
    setIsAddOpen(false);
  };

  return (
    <div className="app-screen">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1>Ghi chú</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ghi chú theo môn học và học kỳ.</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_24px_rgba(16,185,129,0.24)]"
          aria-label="Tạo ghi chú"
        >
          <Plus className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="relative mb-5">
        <label htmlFor="note-search" className="sr-only">Tìm kiếm ghi chú</label>
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          id="note-search"
          placeholder="Tìm kiếm ghi chú..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="field pl-12"
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Học kỳ</span>
          <select
            value={filterSemester}
            onChange={(event) => setFilterSemester(event.target.value)}
            className="field h-12 px-3"
          >
            <option value="all">Tất cả học kỳ</option>
            {mockSemesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Môn học</span>
          <select
            value={filterSubject}
            onChange={(event) => setFilterSubject(event.target.value)}
            className="field h-12 px-3"
          >
            <option value="all">Tất cả môn</option>
            {mockSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-4 text-xs font-medium text-muted-foreground" role="status">
        {filteredNotes.length} ghi chú được tìm thấy
      </p>

      <motion.div initial="hidden" animate="show" className="space-y-4">
        {filteredNotes.map((note, index) => (
          <motion.button
            type="button"
            key={note.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            whileTap={{ scale: 0.98 }}
            className="premium-card w-full cursor-pointer p-5 text-left transition-shadow hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)]"
          >
            <div className="flex items-start gap-3">
              <div className={`${note.color} h-20 w-1 rounded-full`} />
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{note.title}</h3>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    {note.semester}
                  </span>
                </div>
                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{note.preview}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="soft-chip max-w-[190px] truncate">{note.subject}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{note.date}</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {filteredNotes.length === 0 && (
        <div className="py-12 text-center">
          <p className="mb-4 text-muted-foreground">Không tìm thấy ghi chú</p>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setIsAddOpen(true)} className="primary-action inline-flex gap-2">
            <Plus className="h-5 w-5" />
            Tạo ghi chú
          </motion.button>
        </div>
      )}

      {isAddOpen && (
        <div className="absolute inset-0 z-50 flex items-end bg-slate-950/30 px-4 pb-4 backdrop-blur-sm">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="w-full rounded-[28px] border border-white/90 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.22)]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2>Thêm ghi chú</h2>
                <p className="mt-1 text-sm text-muted-foreground">Ghi lại nội dung học nhanh.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                aria-label="Đóng form thêm ghi chú"
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Tiêu đề ghi chú</span>
                <input
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="field"
                  placeholder="Ví dụ: Checklist ôn thi giữa kỳ"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Nội dung ngắn</span>
                <textarea
                  value={form.preview}
                  onChange={(event) => setForm((current) => ({ ...current, preview: event.target.value }))}
                  className="field min-h-[98px] resize-none py-3"
                  placeholder="Tóm tắt ý chính, công thức hoặc việc cần nhớ..."
                  required
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Môn học</span>
                  <select
                    value={form.subject}
                    onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                    className="field h-12 px-3"
                  >
                    {mockSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block px-1 text-xs font-semibold text-muted-foreground">Học kỳ</span>
                  <select
                    value={form.semester}
                    onChange={(event) => setForm((current) => ({ ...current, semester: event.target.value }))}
                    className="field h-12 px-3"
                  >
                    {mockSemesters.map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button type="submit" className="primary-action w-full">
                Lưu ghi chú
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
}
