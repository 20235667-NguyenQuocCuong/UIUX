import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "vi" | "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const translations = {
  vi: {
    // Login
    "login.welcome": "Chào mừng đến UniMate",
    "login.subtitle": "Người bạn đồng hành học tập",
    "login.continueWithGoogle": "Tiếp tục với Google",
    "login.continueWithMicrosoft": "Tiếp tục với Microsoft",
    "login.orEmail": "Hoặc tiếp tục với email",
    "login.email": "Email",
    "login.password": "Mật khẩu",
    "login.forgotPassword": "Quên mật khẩu?",
    "login.loginButton": "Đăng nhập",
    "login.noAccount": "Chưa có tài khoản?",
    "login.signUp": "Đăng ký",

    // Dashboard
    "dashboard.goodMorning": "Chào buổi sáng, DucAnh Chan!",
    "dashboard.ready": "Sẵn sàng làm việc hiệu quả chưa?",
    "dashboard.todaySchedule": "Lịch học hôm nay",
    "dashboard.upcomingDeadlines": "Hạn nộp sắp tới",
    "dashboard.viewAll": "Xem tất cả",
    "dashboard.currentGPA": "GPA hiện tại",
    "dashboard.tasks": "Nhiệm vụ",
    "dashboard.remaining": "còn lại",
    "dashboard.thisWeek": "Tuần này",
    "dashboard.classes": "Lớp học",
    "dashboard.assignments": "Bài tập",
    "dashboard.exams": "Kỳ thi",
    "dashboard.urgent": "Khẩn cấp",
    "dashboard.due": "Hạn",

    // Study Timer
    "timer.title": "Đồng hồ học tập",
    "timer.subtitle": "Thiết lập thời gian học theo nhịp của bạn",
    "timer.todayProgress": "Tiến trình hôm nay",
    "timer.completedSessions": "Phiên đã hoàn thành",
    "timer.sessionsToday": "phiên học hôm nay",
    "timer.statistics": "Thống kê",
    "timer.minutes": "phút",
    "timer.sessions": "phiên",
    "timer.streak": "ngày liên tiếp",
    "timer.tips": "💡 Mẹo học tập hiệu quả",
    "timer.tip1": "• Tắt thông báo trong suốt phiên học đã đặt",
    "timer.tip2": "• Chọn thời lượng phù hợp với độ khó của môn học",
    "timer.tip3": "• Nghỉ vài phút giữa các phiên để duy trì năng lượng",

    // Notes
    "notes.title": "Ghi chú",
    "notes.subtitle": "Ghi chú học tập của bạn",
    "notes.search": "Tìm kiếm ghi chú...",
    "notes.semester": "Học kỳ",
    "notes.subject": "Môn học",
    "notes.allSemesters": "Tất cả học kỳ",
    "notes.allSubjects": "Tất cả môn",
    "notes.noNotes": "Không tìm thấy ghi chú",
    "notes.createNote": "Tạo ghi chú",

    // Calendar
    "calendar.title": "Lịch học",
    "calendar.subtitle": "Lịch trình học tập của bạn",
    "calendar.viewSchedule": "Xem lịch trình và hạn nộp",
    "calendar.eventsFor": "Sự kiện ngày",
    "calendar.class": "Lớp học",
    "calendar.deadline": "Hạn nộp",
    "calendar.dueToday": "Hạn hôm nay",

    // Days of week
    "days.sun": "CN",
    "days.mon": "T2",
    "days.tue": "T3",
    "days.wed": "T4",
    "days.thu": "T5",
    "days.fri": "T6",
    "days.sat": "T7",

    // GPA
    "gpa.title": "Theo dõi GPA",
    "gpa.subtitle": "Theo dõi kết quả học tập",
    "gpa.currentGPA": "GPA hiện tại",
    "gpa.outOf": "Trên thang điểm 4.0",
    "gpa.excellent": "Kết quả xuất sắc!",
    "gpa.trend": "xu hướng GPA",
    "gpa.gradeDistribution": "Phân bổ điểm",
    "gpa.subjectGrades": "Điểm môn học",
    "gpa.credits": "Tín chỉ",
    "gpa.semesterStats": "Thống kê học kỳ",
    "gpa.totalCredits": "Tổng tín chỉ",
    "gpa.subjects": "Môn học",
    "gpa.aGrades": "Điểm A",

    // Profile
    "profile.title": "Hồ sơ",
    "profile.subtitle": "Quản lý tài khoản của bạn",
    "profile.accountInfo": "Thông tin tài khoản",
    "profile.email": "Email",
    "profile.major": "Chuyên ngành",
    "profile.quickSettings": "Cài đặt nhanh",
    "profile.notifications": "Thông báo",
    "profile.darkMode": "Chế độ tối",
    "profile.moreSettings": "Cài đặt khác",
    "profile.logout": "Đăng xuất",
    "profile.gpa": "GPA",
    "profile.credits": "Tín chỉ",

    // Settings
    "settings.title": "Cài đặt",
    "settings.subtitle": "Quản lý thông báo và đồng bộ",
    "settings.universityAccount": "Tài khoản trường",
    "settings.autoSync": "Đồng bộ tự động từ hệ thống trường",
    "settings.autoSyncDesc": "Kết nối với tài khoản trường để tự động cập nhật thông tin môn học, lịch học, và điểm số",
    "settings.connected": "Đã kết nối với hệ thống",
    "settings.connectAccount": "Kết nối tài khoản",
    "settings.autoSyncLabel": "Đồng bộ tự động",
    "settings.syncEvery": "Cập nhật mỗi 6 giờ",
    "settings.syncNow": "Đồng bộ ngay",
    "settings.notifications": "Thông báo",
    "settings.deadlineNotif": "Hạn nộp sắp tới",
    "settings.deadlineNotifDesc": "Nhắc nhở về hạn nộp bài tập",
    "settings.classReminders": "Lịch học sắp tới",
    "settings.classRemindersDesc": "Nhắc nhở về lớp học sắp diễn ra",
    "settings.notifTiming": "Thời gian nhắc nhở",
    "settings.notifTimingDesc": "Nhận thông báo trước bao lâu",
    "settings.15min": "15 phút trước",
    "settings.30min": "30 phút trước",
    "settings.1hour": "1 giờ trước",
    "settings.2hours": "2 giờ trước",
    "settings.1day": "1 ngày trước",
    "settings.devices": "Thiết bị",
    "settings.pushNotif": "Thông báo đẩy",
    "settings.pushNotifDesc": "Nhận thông báo trên thiết bị di động",
    "settings.enable": "Bật",
    "settings.infoTip": "💡 Gợi ý: Bật tất cả thông báo để không bỏ lỡ hạn nộp và lịch học quan trọng. Kết nối tài khoản trường để tự động cập nhật thông tin mới nhất.",
    "settings.language": "Ngôn ngữ",
    "settings.chooseLanguage": "Chọn ngôn ngữ hiển thị",
    "settings.languageDesc": "Thay đổi ngôn ngữ giao diện ứng dụng",

    // Deadlines
    "deadlines.title": "Hạn nộp",
    "deadlines.subtitle": "Quản lý hạn nộp của bạn",
    "deadlines.keepTrack": "Theo dõi bài tập của bạn",
    "deadlines.search": "Tìm kiếm hạn nộp...",
    "deadlines.all": "Tất cả",
    "deadlines.today": "Hôm nay",
    "deadlines.week": "Tuần này",
    "deadlines.month": "Tháng này",
    "deadlines.urgent": "Khẩn cấp",
    "deadlines.high": "Cao",
    "deadlines.normal": "Bình thường",
    "deadlines.noDeadlines": "Không có hạn nộp",
    "deadlines.noDeadlinesForPeriod": "Không có hạn nộp trong thời gian này",
    "deadlines.due": "Hạn",

    // Common
    "common.add": "Thêm",
    "common.edit": "Sửa",
    "common.delete": "Xóa",
    "common.save": "Lưu",
    "common.cancel": "Hủy",
    "common.search": "Tìm kiếm",
    "common.filter": "Lọc",
    "common.all": "Tất cả",

    // Bottom Nav
    "nav.dashboard": "Trang chủ",
    "nav.timer": "Đồng hồ",
    "nav.calendar": "Lịch",
    "nav.notes": "Ghi chú",
    "nav.gpa": "GPA",

    // Floating Action Button
    "fab.addNote": "Thêm ghi chú",
    "fab.addDeadline": "Thêm hạn nộp",

    // Add Deadline
    "addDeadline.title": "Thêm hạn nộp",
    "addDeadline.taskName": "Tên nhiệm vụ",
    "addDeadline.taskPlaceholder": "VD: Bài tập Thuật toán",
    "addDeadline.subject": "Môn học",
    "addDeadline.selectSubject": "Chọn môn học",
    "addDeadline.dueDate": "Hạn nộp",
    "addDeadline.priority": "Độ ưu tiên",
    "addDeadline.description": "Mô tả (Tùy chọn)",
    "addDeadline.descPlaceholder": "Thêm ghi chú hoặc chi tiết...",
    "addDeadline.setReminder": "Đặt nhắc nhở",
    "addDeadline.reminderDesc": "Nhận thông báo trước hạn nộp",
    "addDeadline.cancel": "Hủy",
    "addDeadline.save": "Lưu hạn nộp",

    // Subjects
    "subjects.dataStructures": "Cấu trúc dữ liệu",
    "subjects.webDevelopment": "Phát triển Web",
    "subjects.database": "Hệ quản trị CSDL",
    "subjects.mobile": "Lập trình di động",
    "subjects.ai": "Trí tuệ nhân tạo & học máy",
    "subjects.software": "Công nghệ phần mềm",
  },
  en: {
    // Login
    "login.welcome": "Welcome to UniMate",
    "login.subtitle": "Your study companion",
    "login.continueWithGoogle": "Continue with Google",
    "login.continueWithMicrosoft": "Continue with Microsoft",
    "login.orEmail": "Or continue with email",
    "login.email": "Email",
    "login.password": "Password",
    "login.forgotPassword": "Forgot password?",
    "login.loginButton": "Login",
    "login.noAccount": "Don't have an account?",
    "login.signUp": "Sign up",

    // Dashboard
    "dashboard.goodMorning": "Good Morning! 👋",
    "dashboard.ready": "Ready to be productive?",
    "dashboard.todaySchedule": "Today's Schedule",
    "dashboard.upcomingDeadlines": "Upcoming Deadlines",
    "dashboard.viewAll": "View All",
    "dashboard.currentGPA": "Current GPA",
    "dashboard.tasks": "Tasks",
    "dashboard.remaining": "remaining",
    "dashboard.thisWeek": "This Week",
    "dashboard.classes": "Classes",
    "dashboard.assignments": "Assignments",
    "dashboard.exams": "Exams",
    "dashboard.urgent": "Urgent",
    "dashboard.due": "Due",

    // Study Timer
    "timer.title": "Study Timer",
    "timer.subtitle": "Set a study duration that works for you",
    "timer.todayProgress": "Today's Progress",
    "timer.completedSessions": "Sessions completed",
    "timer.sessionsToday": "sessions today",
    "timer.statistics": "Statistics",
    "timer.minutes": "minutes",
    "timer.sessions": "sessions",
    "timer.streak": "day streak",
    "timer.tips": "💡 Effective Study Tips",
    "timer.tip1": "• Turn off notifications during your study session",
    "timer.tip2": "• Choose a duration that fits the difficulty of the subject",
    "timer.tip3": "• Rest briefly between sessions to maintain energy",

    // Notes
    "notes.title": "Notes",
    "notes.subtitle": "Your study notes in one place",
    "notes.search": "Search notes...",
    "notes.semester": "Semester",
    "notes.subject": "Subject",
    "notes.allSemesters": "All semesters",
    "notes.allSubjects": "All subjects",
    "notes.noNotes": "No notes found",
    "notes.createNote": "Create Note",

    // Calendar
    "calendar.title": "Calendar",
    "calendar.subtitle": "Your class schedule",
    "calendar.viewSchedule": "View your schedule and deadlines",
    "calendar.eventsFor": "Events for",
    "calendar.class": "Class",
    "calendar.deadline": "Deadline",
    "calendar.dueToday": "Due Today",

    // Days of week
    "days.sun": "Sun",
    "days.mon": "Mon",
    "days.tue": "Tue",
    "days.wed": "Wed",
    "days.thu": "Thu",
    "days.fri": "Fri",
    "days.sat": "Sat",

    // GPA
    "gpa.title": "GPA Tracker",
    "gpa.subtitle": "Monitor your academic performance",
    "gpa.currentGPA": "Current GPA",
    "gpa.outOf": "Out of 4.0",
    "gpa.excellent": "Excellent performance!",
    "gpa.trend": "GPA Trend",
    "gpa.gradeDistribution": "Grade Distribution",
    "gpa.subjectGrades": "Subject Grades",
    "gpa.credits": "Credits",
    "gpa.semesterStats": "Semester Stats",
    "gpa.totalCredits": "Total Credits",
    "gpa.subjects": "Subjects",
    "gpa.aGrades": "A Grades",

    // Profile
    "profile.title": "Profile",
    "profile.subtitle": "Manage your account settings",
    "profile.accountInfo": "Account Information",
    "profile.email": "Email",
    "profile.major": "Major",
    "profile.quickSettings": "Quick Settings",
    "profile.notifications": "Notifications",
    "profile.darkMode": "Dark Mode",
    "profile.moreSettings": "More Settings",
    "profile.logout": "Logout",
    "profile.gpa": "GPA",
    "profile.credits": "Credits",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Manage notifications and sync",
    "settings.universityAccount": "University Account",
    "settings.autoSync": "Auto Sync From University System",
    "settings.autoSyncDesc": "Connect with your university account to automatically update course information, schedules, and grades",
    "settings.connected": "Connected to system",
    "settings.connectAccount": "Connect Account",
    "settings.autoSyncLabel": "Auto Sync",
    "settings.syncEvery": "Updates every 6 hours",
    "settings.syncNow": "Sync Now",
    "settings.notifications": "Notifications",
    "settings.deadlineNotif": "Upcoming Deadlines",
    "settings.deadlineNotifDesc": "Reminders for assignment deadlines",
    "settings.classReminders": "Class Reminders",
    "settings.classRemindersDesc": "Reminders for upcoming classes",
    "settings.notifTiming": "Reminder Timing",
    "settings.notifTimingDesc": "How early to receive notifications",
    "settings.15min": "15 minutes before",
    "settings.30min": "30 minutes before",
    "settings.1hour": "1 hour before",
    "settings.2hours": "2 hours before",
    "settings.1day": "1 day before",
    "settings.devices": "Devices",
    "settings.pushNotif": "Push Notifications",
    "settings.pushNotifDesc": "Receive notifications on mobile device",
    "settings.enable": "Enable",
    "settings.infoTip": "💡 Tip: Enable all notifications to never miss important deadlines and classes. Connect your university account for automatic updates.",
    "settings.language": "Language",
    "settings.chooseLanguage": "Choose display language",
    "settings.languageDesc": "Change the app interface language",

    // Deadlines
    "deadlines.title": "Deadlines",
    "deadlines.subtitle": "Manage your deadlines",
    "deadlines.keepTrack": "Keep track of your assignments",
    "deadlines.search": "Search deadlines...",
    "deadlines.all": "All",
    "deadlines.today": "Today",
    "deadlines.week": "Week",
    "deadlines.month": "Month",
    "deadlines.urgent": "Urgent",
    "deadlines.high": "High",
    "deadlines.normal": "Normal",
    "deadlines.noDeadlines": "No deadlines",
    "deadlines.noDeadlinesForPeriod": "No deadlines for this period",
    "deadlines.due": "Due",

    // Common
    "common.add": "Add",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.all": "All",

    // Bottom Nav
    "nav.dashboard": "Dashboard",
    "nav.timer": "Timer",
    "nav.calendar": "Calendar",
    "nav.notes": "Notes",
    "nav.gpa": "GPA",

    // Floating Action Button
    "fab.addNote": "Add Note",
    "fab.addDeadline": "Add Deadline",

    // Add Deadline
    "addDeadline.title": "Add Deadline",
    "addDeadline.taskName": "Task Name",
    "addDeadline.taskPlaceholder": "e.g., Algorithm Assignment",
    "addDeadline.subject": "Subject",
    "addDeadline.selectSubject": "Select a subject",
    "addDeadline.dueDate": "Due Date",
    "addDeadline.priority": "Priority",
    "addDeadline.description": "Description (Optional)",
    "addDeadline.descPlaceholder": "Add notes or details...",
    "addDeadline.setReminder": "Set Reminder",
    "addDeadline.reminderDesc": "Get notified before deadline",
    "addDeadline.cancel": "Cancel",
    "addDeadline.save": "Save Deadline",

    // Subjects
    "subjects.dataStructures": "Data Structures",
    "subjects.webDevelopment": "Web Development",
    "subjects.database": "Database Systems",
    "subjects.mobile": "Mobile Computing",
    "subjects.ai": "AI & Machine Learning",
    "subjects.software": "Software Engineering",
  },
  ja: {
    // Login
    "login.welcome": "UniMateへようこそ",
    "login.subtitle": "あなたの学習パートナー",
    "login.continueWithGoogle": "Googleで続ける",
    "login.continueWithMicrosoft": "Microsoftで続ける",
    "login.orEmail": "またはメールで続ける",
    "login.email": "メール",
    "login.password": "パスワード",
    "login.forgotPassword": "パスワードをお忘れですか？",
    "login.loginButton": "ログイン",
    "login.noAccount": "アカウントをお持ちではありませんか？",
    "login.signUp": "登録",

    // Dashboard
    "dashboard.goodMorning": "おはようございます！ 👋",
    "dashboard.ready": "生産的な一日を始めましょう！",
    "dashboard.todaySchedule": "今日のスケジュール",
    "dashboard.upcomingDeadlines": "締め切り一覧",
    "dashboard.viewAll": "すべて表示",
    "dashboard.currentGPA": "現在のGPA",
    "dashboard.tasks": "タスク",
    "dashboard.remaining": "残り",
    "dashboard.thisWeek": "今週",
    "dashboard.classes": "授業",
    "dashboard.assignments": "課題",
    "dashboard.exams": "試験",
    "dashboard.urgent": "緊急",
    "dashboard.due": "期限",

    // Study Timer
    "timer.title": "学習タイマー",
    "timer.subtitle": "自分に合う学習時間を設定しましょう",
    "timer.todayProgress": "今日の進捗",
    "timer.completedSessions": "完了したセッション",
    "timer.sessionsToday": "今日のセッション",
    "timer.statistics": "統計",
    "timer.minutes": "分",
    "timer.sessions": "セッション",
    "timer.streak": "日連続",
    "timer.tips": "💡 効果的な学習のヒント",
    "timer.tip1": "• 学習セッション中は通知をオフにしましょう",
    "timer.tip2": "• 科目の難易度に合う時間を選びましょう",
    "timer.tip3": "• セッションの間に短い休憩を取りましょう",

    // Notes
    "notes.title": "ノート",
    "notes.subtitle": "学習ノートをまとめて管理",
    "notes.search": "ノートを検索...",
    "notes.semester": "学期",
    "notes.subject": "科目",
    "notes.allSemesters": "すべての学期",
    "notes.allSubjects": "すべての科目",
    "notes.noNotes": "ノートが見つかりません",
    "notes.createNote": "ノートを作成",

    // Calendar
    "calendar.title": "カレンダー",
    "calendar.subtitle": "授業スケジュール",
    "calendar.viewSchedule": "スケジュールと締め切りを表示",
    "calendar.eventsFor": "イベント",
    "calendar.class": "授業",
    "calendar.deadline": "締め切り",
    "calendar.dueToday": "今日期限",

    // Days of week
    "days.sun": "日",
    "days.mon": "月",
    "days.tue": "火",
    "days.wed": "水",
    "days.thu": "木",
    "days.fri": "金",
    "days.sat": "土",

    // GPA
    "gpa.title": "GPA追跡",
    "gpa.subtitle": "学業成績を監視",
    "gpa.currentGPA": "現在のGPA",
    "gpa.outOf": "4.0満点中",
    "gpa.excellent": "素晴らしい成績です！",
    "gpa.trend": "GPAトレンド",
    "gpa.gradeDistribution": "成績分布",
    "gpa.subjectGrades": "科目成績",
    "gpa.credits": "単位",
    "gpa.semesterStats": "学期統計",
    "gpa.totalCredits": "合計単位",
    "gpa.subjects": "科目",
    "gpa.aGrades": "A評価",

    // Profile
    "profile.title": "プロフィール",
    "profile.subtitle": "アカウント設定を管理",
    "profile.accountInfo": "アカウント情報",
    "profile.email": "メール",
    "profile.major": "専攻",
    "profile.quickSettings": "クイック設定",
    "profile.notifications": "通知",
    "profile.darkMode": "ダークモード",
    "profile.moreSettings": "その他の設定",
    "profile.logout": "ログアウト",
    "profile.gpa": "GPA",
    "profile.credits": "単位",

    // Settings
    "settings.title": "設定",
    "settings.subtitle": "通知と同期を管理",
    "settings.universityAccount": "大学アカウント",
    "settings.autoSync": "大学システムから自動同期",
    "settings.autoSyncDesc": "大学アカウントに接続して、コース情報、スケジュール、成績を自動的に更新します",
    "settings.connected": "システムに接続済み",
    "settings.connectAccount": "アカウントを接続",
    "settings.autoSyncLabel": "自動同期",
    "settings.syncEvery": "6時間ごとに更新",
    "settings.syncNow": "今すぐ同期",
    "settings.notifications": "通知",
    "settings.deadlineNotif": "締め切り通知",
    "settings.deadlineNotifDesc": "課題の締め切りのリマインダー",
    "settings.classReminders": "授業のリマインダー",
    "settings.classRemindersDesc": "今後の授業のリマインダー",
    "settings.notifTiming": "リマインダータイミング",
    "settings.notifTimingDesc": "通知を受け取るタイミング",
    "settings.15min": "15分前",
    "settings.30min": "30分前",
    "settings.1hour": "1時間前",
    "settings.2hours": "2時間前",
    "settings.1day": "1日前",
    "settings.devices": "デバイス",
    "settings.pushNotif": "プッシュ通知",
    "settings.pushNotifDesc": "モバイルデバイスで通知を受け取る",
    "settings.enable": "有効にする",
    "settings.infoTip": "💡 ヒント: すべての通知を有効にして、重要な締め切りや授業を逃さないようにしましょう。大学アカウントに接続すると自動更新されます。",
    "settings.language": "言語",
    "settings.chooseLanguage": "表示言語を選択",
    "settings.languageDesc": "アプリのインターフェース言語を変更",

    // Deadlines
    "deadlines.title": "締め切り",
    "deadlines.subtitle": "締め切りを管理",
    "deadlines.keepTrack": "課題を追跡する",
    "deadlines.search": "締め切りを検索...",
    "deadlines.all": "すべて",
    "deadlines.today": "今日",
    "deadlines.week": "今週",
    "deadlines.month": "今月",
    "deadlines.urgent": "緊急",
    "deadlines.high": "高",
    "deadlines.normal": "通常",
    "deadlines.noDeadlines": "締め切りはありません",
    "deadlines.noDeadlinesForPeriod": "この期間に締め切りはありません",
    "deadlines.due": "期限",

    // Common
    "common.add": "追加",
    "common.edit": "編集",
    "common.delete": "削除",
    "common.save": "保存",
    "common.cancel": "キャンセル",
    "common.search": "検索",
    "common.filter": "フィルター",
    "common.all": "すべて",

    // Bottom Nav
    "nav.dashboard": "ダッシュボード",
    "nav.timer": "タイマー",
    "nav.calendar": "カレンダー",
    "nav.notes": "ノート",
    "nav.gpa": "GPA",

    // Floating Action Button
    "fab.addNote": "ノートを追加",
    "fab.addDeadline": "締め切りを追加",

    // Add Deadline
    "addDeadline.title": "締め切りを追加",
    "addDeadline.taskName": "タスク名",
    "addDeadline.taskPlaceholder": "例: アルゴリズム課題",
    "addDeadline.subject": "科目",
    "addDeadline.selectSubject": "科目を選択",
    "addDeadline.dueDate": "期限",
    "addDeadline.priority": "優先度",
    "addDeadline.description": "説明（任意）",
    "addDeadline.descPlaceholder": "メモや詳細を追加...",
    "addDeadline.setReminder": "リマインダーを設定",
    "addDeadline.reminderDesc": "締め切り前に通知を受け取る",
    "addDeadline.cancel": "キャンセル",
    "addDeadline.save": "締め切りを保存",

    // Subjects
    "subjects.dataStructures": "データ構造",
    "subjects.webDevelopment": "Web開発",
    "subjects.database": "データベースシステム",
    "subjects.mobile": "モバイルコンピューティング",
    "subjects.ai": "AI & 機械学習",
    "subjects.software": "ソフトウェア工学",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("vi");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.vi] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
