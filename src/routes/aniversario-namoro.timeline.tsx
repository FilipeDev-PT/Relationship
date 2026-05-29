import { createRoute } from "@tanstack/react-router";
import { Route as namoroRoute } from "./aniversario-namoro";
import { AniversarioNamoroTimelinePage } from "../pages/aniversario-namoro/AniversarioNamoroTimelinePage";

export const Route = createRoute({
  getParentRoute: () => namoroRoute,
  path: "timeline",
  component: AniversarioNamoroTimelinePage,
});

