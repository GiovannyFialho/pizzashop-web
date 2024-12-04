import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { router } from "@/routes";

import "@/index.css";

export function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <Toaster richColors />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
