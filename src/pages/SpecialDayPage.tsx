import { Link } from "@tanstack/react-router";
import { ROUTES } from "../constants/routes";

type SpecialDayPageProps = {
  title: string;
};

/**
 * Página placeholder para cada dia especial.
 * Conteúdo será definido nos próximos prompts; por ora apenas título e voltar.
 */
export function SpecialDayPage({ title }: SpecialDayPageProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-900 mb-6 text-center">
        {title}
      </h1>
      <p className="text-purple-800/90 mb-8 text-center max-w-md">
        Esta página será preenchida em breve com o conteúdo especial deste dia.
      </p>
      <Link
        to={ROUTES.HOME}
        className="rounded-xl bg-purple-400/50 hover:bg-purple-500/60 text-white font-medium px-5 py-2.5 transition-colors focus-visible:ring-2 focus-visible:ring-purple-400"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
