import { CalendarPlus, FilePlus2, Plus } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const actions = [
    { label: "Thêm ghi chú", path: "/notes", icon: FilePlus2, state: { openAddNote: true } },
    { label: "Thêm deadline", path: "/deadlines/add", icon: CalendarPlus },
  ];

  if (!["/", "/notes", "/calendar", "/deadlines"].includes(location.pathname)) {
    return null;
  }

  return (
    <div className="absolute bottom-24 right-5 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 mb-2 flex flex-col gap-2.5"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  navigate(action.path, action.state ? { state: action.state } : undefined);
                  setIsOpen(false);
                }}
                aria-label={action.label}
                className="flex items-center gap-2 whitespace-nowrap rounded-2xl border border-white/90 bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-[0_12px_32px_rgba(20,20,45,0.12)]"
              >
                <action.icon className="h-4 w-4 text-primary" />
                {action.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Đóng menu tạo mới" : "Mở menu tạo mới"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#10B981,#06B6D4)] text-white shadow-[0_14px_28px_rgba(16,185,129,0.32)]"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </div>
  );
}
