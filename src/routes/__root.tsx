import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-950/50 via-purple-950/45 to-indigo-950/50 text-white">
      <p className="text-xl">Página não encontrada</p>
    </div>
  ),
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950/50 via-purple-950/45 to-indigo-950/50">
      <Outlet />
    </div>
  );
}
