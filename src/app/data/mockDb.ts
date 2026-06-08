export type MockNote = {
  id: string;
  subject: string;
  semester: string;
  title: string;
  preview: string;
  date: string;
  color: string;
};

export const mockSemesters = ["2026.2", "2026.1", "2025.3", "2025.2", "2025.1"];

export const mockSubjects = [
  "Cấu trúc dữ liệu",
  "Phát triển Web",
  "Hệ quản trị CSDL",
  "Lập trình di động",
];

export const mockNotes: MockNote[] = [
  {
    id: "note-ds-tree",
    subject: "Cấu trúc dữ liệu",
    semester: "2026.2",
    title: "Cây tìm kiếm nhị phân",
    preview: "Tính chất và thao tác trên cây: chèn, xóa, tìm kiếm, duyệt theo thứ tự.",
    date: "24/03/2026",
    color: "bg-emerald-500",
  },
  {
    id: "note-react-hooks",
    subject: "Phát triển Web",
    semester: "2026.2",
    title: "React Hooks",
    preview: "Tóm tắt useState, useEffect, useContext và các lỗi thường gặp khi render.",
    date: "23/03/2026",
    color: "bg-cyan-500",
  },
  {
    id: "note-sql-joins",
    subject: "Hệ quản trị CSDL",
    semester: "2026.2",
    title: "Các phép nối SQL",
    preview: "INNER JOIN, LEFT JOIN, RIGHT JOIN và ví dụ truy vấn dữ liệu sinh viên.",
    date: "22/03/2026",
    color: "bg-green-500",
  },
  {
    id: "note-graph",
    subject: "Cấu trúc dữ liệu",
    semester: "2025.2",
    title: "Thuật toán đồ thị",
    preview: "DFS, BFS, Dijkstra và cách nhận biết bài toán đường đi ngắn nhất.",
    date: "20/03/2026",
    color: "bg-emerald-500",
  },
  {
    id: "note-android",
    subject: "Lập trình di động",
    semester: "2026.1",
    title: "Vòng đời Android",
    preview: "Các callback quan trọng và cách lưu trạng thái khi xoay màn hình.",
    date: "18/03/2026",
    color: "bg-orange-500",
  },
];

export const mockClasses = [
  {
    id: "it4441",
    semester: "2026.2",
    day: 26,
    mode: "Offline",
    time: "14:10 - 17:30",
    subject: "Giao diện và trải nghiệm người dùng",
    code: "IT4441",
    room: "D9-501",
    week: "40",
    lecturer: "TS. Nguyễn Minh Anh",
  },
  {
    id: "it3090",
    semester: "2026.2",
    day: 26,
    mode: "Online",
    time: "19:00 - 20:30",
    subject: "Cơ sở dữ liệu",
    code: "IT3090",
    room: "MS Teams",
    week: "40",
    lecturer: "ThS. Trần Bảo Nam",
  },
  {
    id: "it4785",
    semester: "2026.1",
    day: 28,
    mode: "Offline",
    time: "08:25 - 11:45",
    subject: "Phát triển ứng dụng Web",
    code: "IT4785",
    room: "D5-301",
    week: "40",
    lecturer: "PGS. Phạm Hoài Thu",
  },
];

export const mockDeadlines = [
  {
    id: "deadline-ui",
    title: "Nộp prototype đồ án UI/UX",
    subject: "Giao diện và trải nghiệm người dùng",
    dueDate: "28/03/2026",
    semester: "2026.2",
  },
];
