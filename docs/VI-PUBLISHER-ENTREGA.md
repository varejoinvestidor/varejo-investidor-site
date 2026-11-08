# VI Publisher 1.0 — links de entrega

Código publicado em: `https://github.com/varejoinvestidor/varejo-investidor-site` (branch `main`). Deploy de produção no projeto Vercel `varejo-investidor-site-m9uy` (domínio **www.varejoinvestidor.com**).

**Correção 404:** o cron `*/5` no `vercel.json` quebrava deploy no plano Hobby; cron passou para GitHub Actions (`.github/workflows/publisher-cron.yml`).

## Links oficiais (produção)

| Ambiente | URL |
|----------|-----|
| **Painel (login)** | https://www.varejoinvestidor.com/admin/login |
| **Dashboard** | https://www.varejoinvestidor.com/admin |
| **Portal artigos (PT)** | https://www.varejoinvestidor.com/artigos |
| **Portal artigos (EN)** | https://www.varejoinvestidor.com/en/artigos |
| **Arquivo legado (PT)** | https://www.varejoinvestidor.com/artigos-globais |
| **Saúde Publisher** | https://www.varejoinvestidor.com/api/publisher/health |

## Ativar editorial (obrigatório após deploy)

Sem Supabase na Vercel o painel mostra “Configuração pendente” e `/artigos` pode ficar vazio.

1. Migrations: ver `docs/vi-publisher-producao.md`
2. Variáveis na Vercel: `NEXT_PUBLIC_SUPABASE_*`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`
3. Redeploy
4. Primeiro admin: `docs/vi-publisher-setup.md`
5. `npm run verify:publisher` (local) antes de publicar

## O que o VI Publisher inclui

- Admin completo (`/admin/*`) com Tiptap, autosave, revisões, mídia, roles
- Público `/artigos` + ISR + SEO + sitemap
- Cron de agendamento (`vercel.json`)
- Legado do site preservado (`/artigos-globais`, locales, sinais, etc.)

Documentação: `vi-publisher-setup.md`, `vi-publisher-testes.md`, `vi-publisher-producao.md`.
