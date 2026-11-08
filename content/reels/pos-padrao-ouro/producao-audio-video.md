# Reels · O mundo depois da quebra do padrão-ouro

Formato **9:16** · **1080×1920** · **até 1:40** · sem neon · estética roxo/dourado editorial (referência: moedas do Brasil).

## Arquivo pronto (MP4)

- **Entrega:** `content/reels/pos-padrao-ouro/pos-padrao-ouro-instagram.mp4`
- **Formato:** 1080×1920 · H.264 · **~1:08** · cortes rápidos · voz **pt-BR-AntonioNeural** (+12%, impacto)
- **Regenerar:** `npm run export:reel:pos-padrao-ouro` (use `SKIP_BUILD=1` para pular build se o site já estiver compilado)

## Prévia e gravação do vídeo

1. Subir o site: `npm run dev`
2. Abrir: [http://localhost:3000/reels/pos-padrao-ouro](http://localhost:3000/reels/pos-padrao-ouro)
3. **Modo gravação** → ocultar UI → **Play prévia** (100 s sincronizado com `REEL_DURATION_SEC`)
4. Gravar com **OBS** (canvas 1080×1920) ou gravador do CapCut/IG em tela cheia
5. Antes de exportar: ativar **Ocultar guias IG** para remover linhas tracejadas de safe zone

### Zona segura Instagram

- Top ~230 px (nome do perfil / UI)
- Bottom ~420 px (legenda, botões, áudio)
- Conteúdo principal já está dentro dessa área no componente

## Áudio

| Tempo | Cena | Narração | SFX / música |
|------|------|----------|----------------|
| 0–8 | Nixon 1971 | ver `narracao-voz-masculina.txt` | impacto grave + bed orquestral baixo |
| 8–18 | Bretton Woods | | rustle de papel, whoosh suave |
| 18–30 | Economias locais | | tick metrônomo 60 BPM muito baixo |
| 30–45 | Dólar âncora | | moedas, whoosh lateral |
| 45–58 | Globalização | | pulsos discretos, sem synth neon |
| 58–78 | Bancos centrais | | batida grave, ambiente “sala de máquinas” |
| 78–92 | Investidor local | | lift / reveal suave |
| 92–100 | Fechamento | | fade out musical 2 s |

**Trilha:** documentário financeiro, cordas + baixo, **sem** drops agressivos nem synth brilhante.

**Mix:** narração −16 LUFS alvo · música −28 a −32 sob fala · SFX −24 pontuais.

## Legenda (opcional IG)

Não coloque texto crítico na faixa inferior 25% — use legendas automáticas do IG apenas para acessibilidade.

## Capas / thumbnail

Frase sugerida: **“1971: o dia que o ouro soltou o dólar”**  
Sub: **Pós-padrão-ouro · moedas · BCs · globalização**
