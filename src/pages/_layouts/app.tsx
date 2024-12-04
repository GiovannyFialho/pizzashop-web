import { Outlet } from "react-router";

import { Header } from "@/components/Header";
import { ThemeProvider } from "../../components/theme/theme-provider";

export function AppLayout() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <div className="flex min-h-screen flex-col antialiased">
        <Header />

        <div className="flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
