import fs from "node:fs";
import path from "node:path";

export type PartnerLogo = {
  src: string;
  alt: string;
};

const PARTNERS_DIR = path.join(process.cwd(), "public", "parceiros-logos");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

function toAltText(fileName: string) {
  const base = fileName.replace(/\.[^.]+$/, "").replace(/-logo$/i, "");

  return base
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
      alt: toAltText(fileName),
    }));
}
