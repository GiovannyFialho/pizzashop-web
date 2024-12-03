import { RouterProvider } from "react-router";

import { router } from "@/routes";

import "@/index.css";

export function App() {
  return <RouterProvider router={router} />;
}
