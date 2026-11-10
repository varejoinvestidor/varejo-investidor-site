# VI Publisher — Fase 5 (testes)

## Smoke automatizado (Playwright)

```bash
npm run verify:publisher
npm run test:publisher
```

Cobre: `/artigos`, `/admin/login`, `robots.txt`, cron sem token, `sitemap.xml`.

Variáveis opcionais:

- `PLAYWRIGHT_BASE_URL` — URL base (default `http://127.0.0.1:3000`)
- `PLAYWRIGHT_SKIP_WEBSERVER=1` — se o `dev` já estiver rodando

## Checklist manual

### Autenticação e permissões

- [ ] Login em `/admin/login` com usuário convidado
- [ ] Usuário **author** não publica nem exclui
- [ ] **editor/admin** publica e agenda
- [ ] **admin** altera roles em `/admin/usuarios`
- [ ] RLS: acesso anônimo não lê rascunhos (testar API REST com anon key)

### Editorial

- [ ] Criar rascunho → autosave → revisão → publicação
- [ ] Slug único por idioma
- [ ] Restaurar revisão anterior
- [ ] Upload mídia e URL na capa

### Público

- [ ] Artigo publicado em `/artigos/[slug]` (PT)
- [ ] Hub EN: `/en/artigos`
- [ ] Rascunho/agendado retorna 404 no público
- [ ] Menu e footer apontam para `/artigos` (PT) e `/en/artigos` (EN)

### Agendamento

- [ ] Status `scheduled` com data passada
- [ ] `curl -H "Authorization: Bearer $CRON_SECRET" https://.../api/cron/publish-scheduled`
- [ ] Artigo vira `published` e aparece no hub

### SEO e legado

- [ ] Canonical e Open Graph no view-source
- [ ] JSON-LD `Article` válido (Rich Results Test)
- [ ] `/artigos-globais` redireciona para `/artigos` (301)
- [ ] Import opcional: `npm run import:legacy-insights`

### Mobile

- [ ] Hub e artigo em 390px (sem overflow horizontal)
- [ ] Editor admin utilizável em tablet

### Integração site

- [ ] Homepage, sinais e idioma inalterados
- [ ] Language gate não afeta `/admin` nem `/artigos`

## Produção (Fase 6)

- [ ] Variáveis na Vercel (Supabase + `CRON_SECRET` + service role)
- [ ] Migrations aplicadas em produção
- [ ] Cron ativo no painel Vercel
- [ ] Primeiro admin e backup do projeto Supabase
