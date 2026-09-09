import Image from "next/image";
import type { PartnerLogo } from "@/lib/partners";

type SipatPartnersProps = {
  eyebrow: string;
  title: string;
  description: string;
  credentialsLabel: string;
  credentials: { title: string; description: string }[];
  logos: PartnerLogo[];
};

/**
 * Prova social da landing.
 *
 * Duas colunas que se sustentam: à esquerda os logos de quem já contratou, à
 * direita a razão pela qual a mensagem chega — logo sozinho é decoração, e
 * credencial sozinha é autoelogio. Os logos vêm de `getPartnerLogos()`, que lê
 * `public/parceiros-logos/`: acrescentar um arquivo novo já o coloca na grade,
 * sem tocar em código. A legenda com o nome abaixo de cada placa existe porque
 * boa parte dos logotipos é assinatura gráfica que ninguém reconhece a 84px.
 */
export function SipatPartners({
  eyebrow,
  title,
  description,
  credentialsLabel,
  credentials,
  logos,
}: SipatPartnersProps) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <div className="min-w-0">
        <p className="sipat-display m-0 text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.16em] text-[#7D8686]">
          {eyebrow}
        </p>
        <h2 className="sipat-display mb-3 mt-3.5 max-w-[22ch] text-[clamp(1.375rem,4.4vw,1.875rem)] font-semibold leading-[1.16] tracking-[-0.02em] text-white">
          {title}
        </h2>
        <p className="m-0 max-w-[46ch] text-[0.96875rem] leading-[1.6] text-[#A9B1B1]">{description}</p>

        {logos.length > 0 ? (
          /*
            Uma única fileira, sem quebra: cada placa recebe a proporção do
            próprio arquivo e cresce na mesma medida (`flexGrow` = proporção,
            `flexBasis` = 0). Como largura e proporção crescem juntas, as três
            alturas saem idênticas e só a placa deitada fica mais larga — em
            qualquer viewport, porque tudo é relativo ao espaço disponível.
            Sem legenda: os três logotipos já trazem o nome no próprio desenho,
            e o nome segue anunciado a leitores de tela pelo alt.
          */
          <ul className="mt-8 flex list-none items-center gap-3 p-0 sm:gap-4">
            {logos.map((logo) => (
              <li key={logo.src} style={{ flexGrow: logo.aspectRatio, flexBasis: 0 }} className="min-w-0">
                <div
                  style={{ aspectRatio: logo.aspectRatio }}
                  className="relative w-full overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)] ring-1 ring-white/10 transition duration-300 ease-out hover:-translate-y-0.5 hover:ring-[#22C07A]/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(min-width: 1024px) 260px, 32vw"
                    className="object-contain p-2.5 sm:p-4"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="min-w-0">
        <p className="sipat-display m-0 mb-6 text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.16em] text-[#22C07A]">
          {credentialsLabel}
        </p>
        <ul className="m-0 grid list-none gap-5 p-0">
          {credentials.map((credential, index) => (
            <li key={credential.title} className="flex gap-4 border-t border-white/[0.14] pt-5">
              <span className="sipat-display shrink-0 text-[0.8125rem] font-semibold leading-[1.7] tracking-[-0.01em] text-[#22C07A]/90">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="sipat-display m-0 text-[1rem] font-semibold leading-[1.3] tracking-[-0.015em] text-white">
                  {credential.title}
                </h3>
                <p className="m-0 mt-1.5 text-[0.90625rem] leading-[1.55] text-[#A9B1B1]">{credential.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
