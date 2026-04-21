import { createFileRoute } from "@tanstack/react-router";
import Explore from "@/pages/Explore";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Companions — LuxeCompanions" },
      { name: "description", content: "Browse all verified premium companions across India." },
    ],
  }),
  component: Explore,
});
