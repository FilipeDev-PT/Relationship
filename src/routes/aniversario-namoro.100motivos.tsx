import { createRoute } from "@tanstack/react-router";
import { Route as namoroRoute } from "./aniversario-namoro";
import { CemMotivosPage } from "../pages/aniversario-namoro/CemMotivosPage";

export const Route = createRoute({
  getParentRoute: () => namoroRoute,
  path: "100motivos",
  component: CemMotivosPage,
});
