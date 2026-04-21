/**
 * main.tsx — App entry point reference.
 * In TanStack Start, the real entry is wired automatically by the framework
 * (no manual ReactDOM.createRoot needed). The router lives in src/router.tsx.
 * This file documents the entry concept for familiarity with classic Vite apps.
 */
// import "./index.css";
// export { getRouter } from "./router";


import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
