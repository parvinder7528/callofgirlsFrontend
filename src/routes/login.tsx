import { createFileRoute, redirect } from "@tanstack/react-router";
import Login from "@/pages/Login";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const isAuthenticated = 
      typeof window !== 'undefined' ? !!localStorage.getItem('call_accessToken') : false;
    if (isAuthenticated) {
      throw redirect({
        to: "/myprofile",
      });
    }
  },
  head: () => ({ meta: [{ title: "Login — LuxeCompanions" }] }),
  component: Login,
});