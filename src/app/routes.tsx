import { createBrowserRouter } from "react-router";
import { Root } from "./layouts/Root";
import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { StudyTimer } from "./screens/StudyTimer";
import { Deadlines } from "./screens/Deadlines";
import { AddDeadline } from "./screens/AddDeadline";
import { Calendar } from "./screens/Calendar";
import { Notes } from "./screens/Notes";
import { GPA } from "./screens/GPA";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "study-timer", Component: StudyTimer },
      { path: "deadlines", Component: Deadlines },
      { path: "deadlines/add", Component: AddDeadline },
      { path: "calendar", Component: Calendar },
      { path: "notes", Component: Notes },
      { path: "gpa", Component: GPA },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
    ],
  },
]);