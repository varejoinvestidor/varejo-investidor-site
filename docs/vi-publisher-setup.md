# VI Publisher — instalação (Fase 2)

## 1. Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **Authentication → Providers**, mantenha e-mail/senha habilitado e **desative sign-up público** (invite only / apenas usuários criados pelo dashboard).
3. Em **SQL Editor**, execute o conteúdo de (nesta ordem):
   - `supabase/migrations/20260308120000_publisher_foundation.sql`
   - `supabase/migrations/20260308120001_storage_publisher_media.sql`
   - `supabase/migrations/20260308130000_publisher_public_views.sql`
4. Em **Authentication → URL configuration**, adicione:
   - Site URL: `https://www.varejoinvestidor.com` (e `http://localhost:3000` em dev)
   - Redirect URLs: `http://localhost:3000/auth/callback`, `https://www.varejoinvestidor.com/auth/callback`, `https://www.varejoinvestidor.com/auth/callback?next=/admin/atualizar-senha`

## 2. Variáveis de ambiente

Copie `.env.example` → `.env.local` e preencha:

| Variável | Onde obter |
|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API (somente servidor) |
| `CRON_SECRET` | String aleatória (Fase 4) |
| `PUBLISHER_SITE_TIMEZONE` | `America/Sao_Paulo` |

Na Vercel, replique as mesmas variáveis no projeto do site.

## 3. Primeiro administrador

> Produção: após migrations (`RUN_ALL_PUBLISHER.sql` no SQL Editor, ou `POST /api/publisher/bootstrap-schema` com `Authorization: Bearer CRON_SECRET`), use o dashboard Supabase ou `POST /api/publisher/bootstrap-admin` (mesmo token) uma vez, depois prefira criar usuários pelo Auth.

**Relatório Elite** — guia completo em [`docs/supabase-elite.md`](./supabase-elite.md). Resumo: **Copiar SQL** no admin, ou `RUN_ELITE.sql` / `RUN_SUPABASE_INCREMENTAL.sql` no SQL Editor; na Vercel use `POSTGRES_URL_NON_POOLING` + botão **Instalar tabelas Elite**.

1. **Authentication → Users → Add user** (e-mail + senha).
2. No SQL Editor:

```sql
update public.profiles
set role = 'admin', full_name = 'Administrador'
where email = 'seu-email@dominio.com';
```

3. Acesse `/admin/login` e entre com esse usuário.

Convites futuros: criar usuário no dashboard ou via API Admin (Fase 3), sempre ajustando `role` em `profiles`.

## 4. Storage

Bucket `publisher-media` (público para leitura de capas). Políticas no arquivo `20260308120001_storage_publisher_media.sql`.

Com `NEXT_PUBLIC_SUPABASE_URL` definida no build (Vercel), o `next.config.mjs` adiciona automaticamente o host do Storage em `images.remotePatterns`.

## 5. Decisões de produto (aprovadas)

- **URLs:** hub canônico `/artigos` (PT) na Fase 4, com redirects graduais de `/artigos-globais`.
- **Legado:** `generatedPosts` permanecem indexados; novos artigos só via Publisher (`source = publisher`).
- **Idiomas MVP no admin:** `pt` e `en` (config em `site_settings.publisher_mvp_languages`).

## 6. Rotas

| Rota | Função |
|------|--------|
| `/admin` | Dashboard (protegido) |
| `/admin/login` | Login |
| `/admin/artigos` | Lista e filtros |
| `/admin/artigos/novo` | Cria rascunho e abre o editor |
| `/admin/artigos/[id]` | Editor Tiptap + autosave |
| `/auth/callback` | OAuth / magic link |

O middleware **não** aplica o language gate em `/admin` e `/auth`.

## 8. Cron (Fase 4)

Na Vercel, defina `CRON_SECRET` e aplique a migration `20260308130000_publisher_public_views.sql`.

O arquivo `vercel.json` agenda `GET /api/cron/publish-scheduled` a cada 5 minutos com header:

`Authorization: Bearer <CRON_SECRET>`

Teste local:

```bash
curl -H "Authorization: Bearer SEU_CRON_SECRET" http://localhost:3000/api/cron/publish-scheduled
```

## 9. Portal público

- Hub: `/artigos` (somente artigos `published` do Publisher, idioma `pt`)
- Post: `/artigos/[slug]`
- Arquivo legado: `/artigos-globais` (conteúdo estático anterior)
- Sitemap e JSON-LD Article atualizados automaticamente quando Supabase está configurado

## 7. Uso editorial (Fase 3)

1. **Novo artigo** → preencha título, corpo, SEO, categoria e tags.
2. Autosave a cada ~2 s; use **Salvar agora** para forçar.
3. **Enviar revisão** (autor) ou **Publicar** / **Agendar** (editor/admin).
4. **Biblioteca de mídia** → upload; copie a URL para capa ou imagens no editor.
5. **Histórico** → restaurar revisões anteriores no painel lateral.

## 10. Produção

Runbook completo: [`docs/vi-publisher-producao.md`](vi-publisher-producao.md)

Comandos úteis:

```bash
npm run verify:publisher    # variáveis locais
npm run test:publisher      # smoke Playwright
curl https://www.varejoinvestidor.com/api/publisher/health
```
