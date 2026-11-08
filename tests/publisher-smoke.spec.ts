import { test, expect } from "@playwright/test";

test.describe("VI Publisher — smoke", () => {
  test("portal /artigos responde", async ({ page }) => {
    const response = await page.goto("/artigos");
    expect(response?.status()).toBeLessThan(500);
    await expect(page.getByRole("heading", { name: /Artigos|Articles/i })).toBeVisible();
  });

  test("admin login exibe formulário ou aviso de config", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: "VI Publisher" })).toBeVisible();
    const email = page.locator("#email");
    const setup = page.getByText(/Configuração pendente/i);
    await expect(email.or(setup)).toBeVisible();
  });

  test("robots bloqueia admin", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.ok()).toBeTruthy();
    const body = await res.text();
    expect(body.toLowerCase()).toContain("admin");
  });

  test("cron rejeita sem token", async ({ request }) => {
    const res = await request.get("/api/cron/publish-scheduled");
    expect([401, 503]).toContain(res.status());
  });

  test("sitemap inclui /artigos", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.ok()).toBeTruthy();
    const xml = await res.text();
    expect(xml).toContain("/artigos");
  });

  test("health endpoint responde JSON", async ({ request }) => {
    const res = await request.get("/api/publisher/health");
    expect([200, 503]).toContain(res.status());
    const body = await res.json();
    expect(body).toHaveProperty("publisher");
  });
});
