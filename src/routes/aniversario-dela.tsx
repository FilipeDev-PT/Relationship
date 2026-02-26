import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { SpecialDayPage } from "../pages/SpecialDayPage";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aniversario-dela",
  component: () => <SpecialDayPage title="Aniversário dela" />,
});
