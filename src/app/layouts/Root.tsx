import { Outlet, useLocation } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { FloatingActionButton } from "../components/FloatingActionButton";

export function Root() {
  const location = useLocation();
  const isFocusedFlow = location.pathname === "/deadlines/add";

  return (
    <div className="flex h-dvh items-start justify-center overflow-hidden bg-[linear-gradient(180deg,#efecff_0%,#f6f7fc_34%,#f6f7fc_100%)] py-0 md:py-7">
      <div className="relative flex h-dvh w-full max-w-md flex-col overflow-hidden bg-background md:h-[860px] md:max-h-[calc(100dvh-3.5rem)] md:rounded-[34px] md:border md:border-white/80 md:shadow-[0_24px_70px_rgba(34,25,76,0.14)]">
        <main className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
        {!isFocusedFlow && (
          <div className="shrink-0 bg-transparent">
            <BottomNav />
          </div>
        )}
        {!isFocusedFlow && <FloatingActionButton />}
      </div>
    </div>
  );
}
