import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ANIVERSARIO_NAMORO_NAV_EXCLUDED_PREFIXES } from "../../constants/aniversarioNamoroNav";
import { ROUTES } from "../../constants/routes";

/**
 * Layout do aniversário de namoro: topo com voltar ao início.
 * Exceções à barra superior: prefixos em `ANIVERSARIO_NAMORO_NAV_EXCLUDED_PREFIXES`.
 */
export function AniversarioNamoroLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const hideTopBar = ANIVERSARIO_NAMORO_NAV_EXCLUDED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  return (
    <div className="min-h-screen pb-10">
      {!hideTopBar && (
        <div className="sticky top-0 z-20 border-b border-white/10 bg-gradient-to-b from-indigo-950/85 to-indigo-950/50 px-4 py-4 backdrop-blur-md sm:px-6">
          <div className="mx-auto flex max-w-4xl items-center justify-end">
            <Link
              to={ROUTES.HOME}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

