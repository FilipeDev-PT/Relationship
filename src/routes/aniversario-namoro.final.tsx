import { createRoute } from "@tanstack/react-router";
import { Route as namoroRoute } from "./aniversario-namoro";
import { AniversarioNamoroFinalPage } from "../pages/aniversario-namoro/AniversarioNamoroFinalPage";

export const Route = createRoute({
  getParentRoute: () => namoroRoute,
  path: "final",
  component: AniversarioNamoroFinalPage,
});
