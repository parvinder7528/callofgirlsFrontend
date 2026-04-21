import { createFileRoute } from "@tanstack/react-router";
import Categories from "@/pages/Categories";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — LuxeCompanions" },
      { name: "description", content: "Browse companions by service category." },
    ],
  }),
  component: Categories,
});
