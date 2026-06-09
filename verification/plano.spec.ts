import { expect, test } from "@playwright/test";

const storageKey = "paulo-crispim-project-tracker-v1";
const route = "http://localhost:3000/plano";

test("plano tracker updates, persists and clears state", async ({ page }) => {
  const consoleIssues: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleIssues.push(message.text());
    }
  });

  await page.goto(route);
  await page.evaluate((key) => window.localStorage.removeItem(key), storageKey);
  await page.reload();

  await expect(page.locator("article")).toHaveCount(10);
  await expect(page.locator('input[type="checkbox"]')).toHaveCount(71);

  await page.getByLabel("Confirmar objetivo principal do projeto.").check();
  await page
    .getByLabel("Observações da etapa 1")
    .fill("Aguardando definição do foco comercial.");

  await expect(page.getByText("1 de 71 itens concluídos")).toBeVisible();
  await expect(page.locator("article").first().getByText("Em andamento")).toBeVisible();

  await page.reload();
  await expect(page.getByLabel("Confirmar objetivo principal do projeto.")).toBeChecked();
  await expect(page.getByLabel("Observações da etapa 1")).toHaveValue(
    "Aguardando definição do foco comercial.",
  );

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Marcar todos os itens");
    await dialog.accept();
  });
  await page.getByRole("button", { name: "Marcar tudo como concluído" }).click();
  await expect(page.getByText("71 de 71 itens concluídos")).toBeVisible();

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Limpar apenas o progresso");
    await dialog.accept();
  });
  await page.getByRole("button", { name: "Limpar progresso" }).click();
  await expect(page.locator('input[type="checkbox"]:checked')).toHaveCount(0);
  await expect(page.getByLabel("Observações da etapa 1")).toHaveValue(
    "Aguardando definição do foco comercial.",
  );

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Apagar progresso e observações");
    await dialog.accept();
  });
  await page.getByRole("button", { name: "Apagar progresso e observações" }).click();
  await expect(page.getByLabel("Observações da etapa 1")).toHaveValue("");
  expect(consoleIssues).toEqual([]);
});

test.describe("responsive layout", () => {
  const viewports = [
    { name: "desktop", width: 1440, height: 1100, maxFirstRow: 4 },
    { name: "tablet", width: 834, height: 1112, maxFirstRow: 2 },
    { name: "mobile", width: 390, height: 900, maxFirstRow: 1 },
  ];

  for (const viewport of viewports) {
    test(`${viewport.name} keeps readable card columns`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(route);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewport.width + 1);

      const boxes = await page.locator("article").evaluateAll((articles) =>
        articles.map((article) => {
          const box = article.getBoundingClientRect();

          return {
            top: Math.round(box.top),
            width: Math.round(box.width),
          };
        }),
      );

      expect(boxes).toHaveLength(10);

      const firstTop = boxes[0].top;
      const firstRowCount = boxes.filter((box) => Math.abs(box.top - firstTop) <= 8).length;
      const minCardWidth = Math.min(...boxes.map((box) => box.width));

      expect(firstRowCount).toBeLessThanOrEqual(viewport.maxFirstRow);

      if (viewport.name !== "mobile") {
        expect(minCardWidth).toBeGreaterThanOrEqual(300);
      }
    });
  }
});
