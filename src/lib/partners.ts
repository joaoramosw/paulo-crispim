import fs from "node:fs";
import path from "node:path";

export type PartnerLogo = {
  src: string;
  /** Razao social exibivel (ex.: "Ceneged"), usada como legenda ao lado do logo. */
  name: string;
  alt: string;
  /**
   * Proporcao largura/altura do arquivo (1 = quadrado, 1.88 = deitado). Quem
   * exibe pode dar ao container a forma do proprio logo, em vez de encaixar
   * tudo numa caixa unica onde o logo deitado sobra e o quadrado fica solto.
   * Cai para 1 quando o formato nao permite ler o cabecalho.
   */
  aspectRatio: number;
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

/**
 * Le as dimensoes direto do cabecalho do arquivo, sem dependencia externa —
 * roda em build, uma vez por logo. Cobre PNG e JPEG, os dois formatos que
 * existem em `public/parceiros-logos` hoje; para SVG e WebP devolve undefined
 * e quem chama assume quadrado, que e o formato mais comum de logo.
 */
function readImageAspectRatio(filePath: string): number | undefined {
  let buffer: Buffer;

  try {
    buffer = fs.readFileSync(filePath);
  } catch {
    return undefined;
  }

  // PNG: IHDR e sempre o primeiro chunk, com largura e altura em big endian.
  if (buffer.length > 24 && buffer.toString("ascii", 12, 16) === "IHDR") {
    const height = buffer.readUInt32BE(20);
    return height > 0 ? buffer.readUInt32BE(16) / height : undefined;
  }

  // JPEG: percorre os segmentos ate um marcador SOF, que carrega as dimensoes.
  if (buffer.length < 4 || buffer.readUInt16BE(0) !== 0xffd8) return undefined;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) return undefined;

    const marker = buffer[offset + 1];
    // SOF0-3, SOF5-7, SOF9-11 e SOF13-15. Os buracos (C4, C8, CC) sao tabelas.
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;

    if (isStartOfFrame) {
      const height = buffer.readUInt16BE(offset + 5);
      return height > 0 ? buffer.readUInt16BE(offset + 7) / height : undefined;
    }

    offset += 2 + buffer.readUInt16BE(offset + 2);
  }

  return undefined;
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
    .map((fileName) => {
      const name = toPartnerName(fileName);

      return {
        src: `/parceiros-logos/${fileName}`,
        name,
        alt: `Logotipo ${name}`,
        aspectRatio: readImageAspectRatio(path.join(PARTNERS_DIR, fileName)) ?? 1,
      };
    });
}
