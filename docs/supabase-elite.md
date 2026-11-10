# Supabase — Relatório Elite e incrementos

## Sintoma

Admin **Relatório Elite** mostra `Could not find the table 'public.elite_operations'` (PGRST205).

As tabelas ainda não existem no projeto Supabase de produção, ou o cache da API não foi recarregado.

## Solução rápida (recomendada)

1. **Admin** → **Relatório Elite**
2. **Copiar SQL para Supabase**
3. Abra **Abrir SQL Editor** (ou Supabase Dashboard → SQL Editor)
4. Cole e **Run**
5. Aguarde ~1 minuto e recarregue o admin

Arquivo equivalente no repositório: `supabase/migrations/RUN_ELITE.sql`

## Projeto já com Publisher (RUN_ALL)

Execute no SQL Editor o arquivo:

`supabase/migrations/RUN_SUPABASE_INCREMENTAL.sql`

(banners em artigos + Elite + reload PostgREST)

## Instalação automática (Vercel)

1. Em **Vercel → Environment Variables**, adicione:
   - `POSTGRES_URL_NON_POOLING` = connection string **Direct** (Supabase → Database → URI, não pooler)
2. Redeploy
3. No admin Elite: **Instalar tabelas Elite** ou **Instalar Publisher + Elite (admin)**

Alternativa CLI/cron:

```http
POST /api/publisher/install-elite-schema
Authorization: Bearer <CRON_SECRET>
```

(sessão admin/editor logada também é aceita neste endpoint.)

## Diagnóstico

| Endpoint | Quem |
|----------|------|
| `GET /api/publisher/health` | público — `eliteReady`, `postgresConfigured`, `tables` |
| `GET /api/publisher/schema-status` | admin/editor logado — detalhe por tabela |

Local:

```bash
node --env-file=.env.local scripts/verify-supabase-schema.mjs
```

## Permissões

RLS usa `public.is_elite_editor()` (`profiles.role` = `admin` ou `editor`). Confirme seu usuário:

```sql
select email, role from public.profiles where email = 'seu@email.com';
```
