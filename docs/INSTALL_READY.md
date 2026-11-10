# Entrega pronta — VI Analytics + artigos (vídeo)

## 1. Deploy do código

Faça deploy na Vercel (push na branch de produção). O painel já inclui:

- Auto-instalação de schema (admin + `POSTGRES_URL`)
- Cron GitHub: `vi-analytics-maintain` a cada 5 min
- Fallback de top páginas via views do Publisher

## 2. Variáveis na Vercel (obrigatórias)

| Variável | Uso |
|----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | Site + API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente |
| `SUPABASE_SERVICE_ROLE_KEY` | Telemetria + admin |
| `POSTGRES_URL_NON_POOLING` | Migrations automáticas |
| `CRON_SECRET` | Cron (mesmo no GitHub Actions) |

## 3. Instalar schema (escolha uma)

### A) Pela sua máquina (recomendado)

```bash
vercel env pull .env.vercel.production --environment=production
npm run install:publisher-incremental
npm run verify:supabase
```

Só analytics:

```bash
npm run install:vi-analytics
```

### B) Pela produção (após deploy)

```bash
npm run bootstrap:vi-analytics-prod
```

### C) Painel admin

Abra `/admin/vi-administrador` logado como **admin** (com `POSTGRES` na Vercel).

### D) SQL Editor Supabase

Rode, nesta ordem:

1. `supabase/migrations/20260318150000_article_youtube_videos.sql`
2. `supabase/migrations/20260318120000_vi_analytics.sql`
3. `supabase/migrations/20260319120000_vi_analytics_regions.sql`

## 4. Validar

```bash
node --env-file=.env.vercel.production scripts/verify-supabase-schema.mjs
```

Navegue no **site público** (não `/admin`) e confira `/admin/vi-administrador/relatorios` após ~1 min.
