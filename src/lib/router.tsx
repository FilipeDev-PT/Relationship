import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "../routes/__root";
import { Route as IndexRoute } from "../routes/index";
import { Route as AniversarioDelaRoute } from "../routes/aniversario-dela";
import { Route as AniversarioNamoroRoute } from "../routes/aniversario-namoro";
import { Route as CasamentoRoute } from "../routes/casamento";

const routeTree = rootRoute.addChildren([
  IndexRoute,
  AniversarioDelaRoute,
  AniversarioNamoroRoute,
  CasamentoRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
