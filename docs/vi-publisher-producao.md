# VI Publisher — Fase 6 (produção)

Runbook para colocar o Publisher em **www.varejoinvestidor.com** sem quebrar o site existente.

## 1. Pré-requisitos

- [ ] Build local OK: `npm run build`
- [ ] Smoke OK: `npm run test:publisher`
- [ ] Env OK: `npm run verify:publisher`
- [ ] Projeto Vercel ligado ao repositório (deploy padrão do site)

## 2. Migrations Supabase (ordem obrigatória)

Execute no **SQL Editor** do projeto de **produção** (não apenas dev):

1. `supabase/migrations/20260308120000_publisher_foundation.sql`
2. `supabase/migrations/20260308120001_storage_publisher_media.sql`
3. `supabase/migrations/20260308130000_publisher_public_views.sql`

Confirme:

```sql
select count(*) from public.categories;  -- esperado: 10
select id from storage.buckets where id = 'publisher-media';
```

## 3. Variáveis na Vercel

**Settings → Environment Variables** (Production + Preview recomendado):

| Variável | Produção | Preview |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Sim | Sim (pode ser mesmo projeto ou staging) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim | Sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Sim | Opcional |
| `CRON_SECRET` | Sim (string longa aleatória) | Igual ou outra |
| `PUBLISHER_SITE_TIMEZONE` | `America/Sao_Paulo` | Idem |

**Nunca** commite `.env.local` nem a service role no cliente.

Após alterar env: **Redeploy** o último deployment.

## 4. Supabase Auth (produção)

- **Site URL:** `https://www.varejoinvestidor.com`
- **Redirect URLs:**  
  `https://www.varejoinvestidor.com/auth/callback`  
  (manter `http://localhost:3000/auth/callback` só se usar dev no mesmo projeto)
- **Sign-up público:** desligado
- Criar usuário admin + SQL `update profiles set role = 'admin'`

## 5. Cron Vercel

O `vercel.json` na raiz declara:

- Path: `/api/cron/publish-scheduled`
- Schedule: `*/5 * * * *`

A Vercel envia automaticamente `Authorization: Bearer <CRON_SECRET>` quando a variável existe.

Teste pós-deploy:

```bash
curl -i -H "Authorization: Bearer SEU_CRON_SECRET" https://www.varejoinvestidor.com/api/cron/publish-scheduled
```

Resposta esperada: `{"ok":true,"published":0}` ou número de artigos publicados.

## 6. Deploy

1. Merge na branch que a Vercel usa (ex. `main`).
2. Aguardar build verde.
3. Não é necessário alterar rotas existentes — Publisher é módulo adicional.

## 7. Validação pós-deploy (15 min)

### Público (visitante)

| URL | Esperado |
|-----|----------|
| `https://www.varejoinvestidor.com/` | Home normal + language gate |
| `https://www.varejoinvestidor.com/artigos` | Hub (vazio ou com posts) |
| `https://www.varejoinvestidor.com/artigos-globais` | Arquivo legado intacto |
| `https://www.varejoinvestidor.com/sinais` | Sem regressão |
| `https://www.varejoinvestidor.com/robots.txt` | Contém `Disallow: /admin` |
| `https://www.varejoinvestidor.com/sitemap.xml` | Contém `/artigos` |

### Admin

| URL | Esperado |
|-----|----------|
| `/admin/login` | Login (não indexado) |
| `/admin` | Redirect login ou dashboard |
| Publicar artigo teste | Aparece em `/artigos/{slug}` em até 60s (ISR) |

### SEO

- View-source do artigo: canonical, `og:*`, JSON-LD `Article`
- Google Rich Results Test (URL do artigo publicado)

### Opcional — import editorial legado

Com service role em máquina local (`.env.local` de prod **só se conscientemente**):

```bash
npm run import:legacy-insights
```

Importa os 5 JSON de `content/insights/pt` como `legacy_import` (não remove `/artigos-globais`).

## 8. Rollback

- **Código:** revert do commit na Vercel ou deploy anterior.
- **Supabase:** tabelas Publisher podem permanecer; o site legado não depende delas.
- **Cron:** remover `CRON_SECRET` ou desativar cron no dashboard Vercel para parar publicações automáticas.

## 9. Operação contínua

- Backup: habilitar **PITR / backups** no Supabase (plano pago).
- Novos usuários: criar no Auth → ajustar `role` em `profiles`.
- Monitorar: logs Vercel para `/api/cron/publish-scheduled` e erros 5xx em `/artigos`.

## 10. Critérios de entrega (VI Publisher 1.0)

Marque quando validado em produção:

- [ ] Admin acessa painel e convida equipe (Auth manual + roles)
- [ ] Permissões por perfil funcionam
- [ ] Autor salva; editor publica; artigo no site
- [ ] Imagens Storage + capa
- [ ] Agendamento + cron
- [ ] SEO / sitemap
- [ ] Mobile hub + artigo
- [ ] Rascunhos não públicos
- [ ] Site original operacional
