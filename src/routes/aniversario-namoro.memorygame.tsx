import { createRoute } from "@tanstack/react-router";
import { Route as namoroRoute } from "./aniversario-namoro";
import { MemoryGamePage } from "../pages/aniversario-namoro/MemoryGamePage";

export const Route = createRoute({
  getParentRoute: () => namoroRoute,
  path: "memorygame",
  component: MemoryGamePage,
});

