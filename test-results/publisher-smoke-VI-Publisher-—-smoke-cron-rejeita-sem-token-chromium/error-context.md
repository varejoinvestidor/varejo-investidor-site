# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: publisher-smoke.spec.ts >> VI Publisher — smoke >> cron rejeita sem token
- Location: tests\publisher-smoke.spec.ts:25:3

# Error details

```
Error: apiRequestContext.get: connect ECONNREFUSED 127.0.0.1:3000
Call log:
  - → GET http://127.0.0.1:3000/api/cron/publish-scheduled
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/158.0.8127.18 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("VI Publisher — smoke", () => {
  4  |   test("portal /artigos responde", async ({ page }) => {
  5  |     const response = await page.goto("/artigos");
  6  |     expect(response?.status()).toBeLessThan(500);
  7  |     await expect(page.getByRole("heading", { name: /Artigos|Articles/i })).toBeVisible();
  8  |   });
  9  | 
  10 |   test("admin login exibe formulário ou aviso de config", async ({ page }) => {
  11 |     await page.goto("/admin/login");
  12 |     await expect(page.getByRole("heading", { name: "VI Publisher" })).toBeVisible();
  13 |     const email = page.locator("#email");
  14 |     const setup = page.getByText(/Configuração pendente/i);
  15 |     await expect(email.or(setup)).toBeVisible();
  16 |   });
  17 | 
  18 |   test("robots bloqueia admin", async ({ request }) => {
  19 |     const res = await request.get("/robots.txt");
  20 |     expect(res.ok()).toBeTruthy();
  21 |     const body = await res.text();
  22 |     expect(body.toLowerCase()).toContain("admin");
  23 |   });
  24 | 
  25 |   test("cron rejeita sem token", async ({ request }) => {
> 26 |     const res = await request.get("/api/cron/publish-scheduled");
     |                               ^ Error: apiRequestContext.get: connect ECONNREFUSED 127.0.0.1:3000
  27 |     expect([401, 503]).toContain(res.status());
  28 |   });
  29 | 
  30 |   test("sitemap inclui /artigos", async ({ request }) => {
  31 |     const res = await request.get("/sitemap.xml");
  32 |     expect(res.ok()).toBeTruthy();
  33 |     const xml = await res.text();
  34 |     expect(xml).toContain("/artigos");
  35 |   });
  36 | 
  37 |   test("health endpoint responde JSON", async ({ request }) => {
  38 |     const res = await request.get("/api/publisher/health");
  39 |     expect([200, 503]).toContain(res.status());
  40 |     const body = await res.json();
  41 |     expect(body).toHaveProperty("publisher");
  42 |   });
  43 | });
  44 | 
```