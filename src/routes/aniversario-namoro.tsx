import { createRoute, redirect } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { ROUTES } from "../constants/routes";
import { AniversarioNamoroLayout } from "../pages/aniversario-namoro/AniversarioNamoroLayout";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aniversario-namoro",
  beforeLoad: ({ location }) => {
    const path = location.pathname.replace(/\/$/, "") || "/";
    if (path === ROUTES.ANIVERSARIO_NAMORO) {
      throw redirect({ to: ROUTES.ANIVERSARIO_NAMORO_TIMELINE });
    }
  },
  component: AniversarioNamoroLayout,
});
