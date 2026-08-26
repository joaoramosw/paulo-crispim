import fs from "node:fs";
import path from "node:path";

export type PartnerLogo = {
  src: string;
  alt: string;
};

const PARTNERS_DIR = path.join(process.cwd(), "public", "parceiros-logos");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

/**
 * Nomes que o slug do arquivo nao consegue reconstruir sozinho (siglas,
 * caixa interna, razao social abreviada). Chave = nome do arquivo sem extensao.
 */
const PARTNER_NAMES: Record<string, string> = {
  "agnus-logo": "Agnus",
  "ceneged-logo": "Ceneged",
  "hvidal-solucoesemeng-logo": "HVidal Soluções em Engenharia",
};

function toPartnerName(fileName: string) {
  const base = fileName.replace(/\.[^.]+$/, "");
  const mapped = PARTNER_NAMES[base.toLowerCase()];

  if (mapped) return mapped;

  return base
    .replace(/-logo$/i, "")
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getPartnerLogos(): PartnerLogo[] {
  let fileNames: string[] = [];

  try {
    fileNames = fs.readdirSync(PARTNERS_DIR);
  } catch {
    return [];
  }

  return fileNames
    .filter((fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
    .sort()
    .map((fileName) => ({
      src: `/parceiros-logos/${fileName}`,
      alt: `Logotipo ${toPartnerName(fileName)}`,
    }));
}
