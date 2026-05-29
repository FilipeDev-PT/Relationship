import { createRoute } from "@tanstack/react-router";
import { Route as namoroRoute } from "./aniversario-namoro";
import { AniversarioNamoroLivroPage } from "../pages/aniversario-namoro/AniversarioNamoroLivroPage";

export const Route = createRoute({
  getParentRoute: () => namoroRoute,
  path: "livro",
  component: AniversarioNamoroLivroPage,
});

