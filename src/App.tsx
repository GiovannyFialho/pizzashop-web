import { RouterProvider } from "react-router";
import { Toaster } from "sonner";

import { router } from "@/routes";

import "@/index.css";

export function App() {
  return (
    <>
      <Toaster richColors />
      <RouterProvider router={router} />
    </>
  );
}
