import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LuxeCompanions — Find Premium Companions Near You" },
      { name: "description", content: "Discover verified, elite companions for any occasion. Discreet, elegant, and always available." },
    ],
  }),
  component: Home,
});
