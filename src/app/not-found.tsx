import type { Metadata } from "next";
import Link from "next/link";
import { InternalPageLayout } from "@/components/layout/InternalPageLayout";

// Next.js injeta automaticamente uma tag <meta name="robots" content="noindex">
// extra para esta rota especial (não é possível suprimi-la). Declarar o mesmo
// sentido aqui evita que ela fique conflitante com o `index: true` herdado do
// layout raiz — ambas as tags acabam apontando para noindex.
export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: {
    index: false,
    follow: true,
  },
};

const usefulLinks = [
  { label: "Ir para o início", href: "/" },
  { label: "Conhecer as palestras", href: "/palestras" },
  { label: "Ver o portfólio", href: "/portfolio" },
  { label: "Falar sobre contratação", href: "/contato" },
];

export default function NotFound() {
  return (
    <InternalPageLayout>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start px-6 py-24 sm:px-10 lg:px-14">
        <p className="mb-4 inline-flex items-center gap-3 border border-[#35F06A]/25 bg-[#35F06A]/[0.06] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#C8F8D2]">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#35F06A]" />
          Erro 404
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#F4F7F8] sm:text-4xl lg:text-5xl">
          Essa página não foi encontrada.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#D8DEE2] sm:text-lg">
          O conteúdo pode ter sido movido ou o endereço digitado está incorreto. Use os links abaixo para continuar
          navegando pelo site.
        </p>

        <nav aria-label="Links úteis" className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {usefulLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                index === 0
                  ? "inline-flex min-h-12 items-center justify-center border border-[#35F06A] bg-[#35F06A] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#050708] transition-all duration-200 hover:bg-[#C8F8D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]"
                  : "inline-flex min-h-12 items-center justify-center border border-white/15 bg-transparent px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#D8DEE2] transition-all duration-200 hover:border-[#35F06A]/45 hover:bg-[#35F06A]/[0.08] hover:text-[#F4F7F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </InternalPageLayout>
  );
}
