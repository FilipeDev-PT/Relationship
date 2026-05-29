import { createRoute } from "@tanstack/react-router";
import { Route as namoroRoute } from "./aniversario-namoro";
import { CacaPalavrasPage } from "../pages/aniversario-namoro/CacaPalavrasPage";

export const Route = createRoute({
  getParentRoute: () => namoroRoute,
  path: "cacapalavras",
  component: CacaPalavrasPage,
});
