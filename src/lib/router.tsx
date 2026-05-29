import { createRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "../routes/__root";
import { Route as IndexRoute } from "../routes/index";
import { Route as AniversarioNamoroRoute } from "../routes/aniversario-namoro";
import { Route as AniversarioNamoroTimelineRoute } from "../routes/aniversario-namoro.timeline";
import { Route as AniversarioNamoroMemorygameRoute } from "../routes/aniversario-namoro.memorygame";
import { Route as AniversarioNamoroCacaPalavrasRoute } from "../routes/aniversario-namoro.cacapalavras";
import { Route as AniversarioNamoro100MotivosRoute } from "../routes/aniversario-namoro.100motivos";
import { Route as AniversarioNamoroLivroRoute } from "../routes/aniversario-namoro.livro";
import { Route as CasamentoRoute } from "../routes/casamento";

const routeTree = rootRoute.addChildren([
  IndexRoute,
  AniversarioNamoroRoute.addChildren([
    AniversarioNamoroTimelineRoute,
    AniversarioNamoroMemorygameRoute,
    AniversarioNamoroCacaPalavrasRoute,
    AniversarioNamoro100MotivosRoute,
    AniversarioNamoroLivroRoute,
  ]),
  CasamentoRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
