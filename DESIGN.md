# DESIGN.md — LP Paula Zagotta · Framework dos 5 C's

> Direção visual: **Dossiê Editorial** (revista premium impressa) em dark + dourado.
> Objetivo: fugir da estética genérica "cara de IA" (glass/glow/gradiente em tudo)
> e entregar algo intencional, com hierarquia e personalidade.

## Conceito

Uma landing que se lê como uma **matéria de revista sofisticada** sobre conteúdo
estratégico. Serifada de alto contraste como protagonista, numerais gigantes nos
5 C's, fios dourados finos, muito espaço negativo e composição assimétrica. O
dourado é **tinta de destaque**, não banho de luz.

## Tipografia

- **Display (títulos):** Playfair Display — serifada editorial, italic pra ênfase.
- **Corpo/UI:** Hanken Grotesk — grotesca quente e legível (substitui a Inter
  genérica; mais caráter sem perder leitura em tamanho pequeno).
- Carregadas **uma vez só** via `<link>` (sem `@import` duplicado).

## Cores (paleta original preservada + tokens de apoio)

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#0a0a0c` | Fundo base (quase preto, levemente quente) |
| `--paper-2` | `#101012` | Superfície elevada / seções alternadas |
| `--ink` | `#f4f1ea` | Texto principal (bone quente, menos "frio" que branco puro) |
| `--ink-soft` | `#cfc9be` | Texto secundário |
| `--ink-mute` | `#8a857c` | Legendas / metadados |
| `--gold` | `#e8a44a` | Accent principal (original) |
| `--gold-light` | `#f0c878` | Accent claro (original) |
| `--green` | `#4ade80` | **Preço final / com desconto** (tom pra fundo escuro) |
| `--red` | `#f4736b` | **Preço riscado / âncora** (tom pra fundo escuro) |

> ⚠️ Regra de oferta: o **preço riscado (âncora) é vermelho** e o **preço final é
> verde**, sempre. Tokens separados porque verde/vermelho de fundo claro não
> passam contraste no dark.

## Motion

- **1 carga orquestrada** no hero (reveals escalonados via `animation-delay`).
- Scroll reveal leve via `IntersectionObserver` (só `opacity`/`transform`).
- **Respeita `prefers-reduced-motion`** — sem loops infinitos de glow/spin.

## Regras de componente aplicadas

- **Botões:** texto único por CTA (tracking), sempre em 1 linha.
- **Autoridade:** `grid-template-areas` → mobile = `eyebrow+título → foto → texto`.
- **Mobile-first:** base mobile, `min-width` pra escalar.
- **Rodapé:** "Feito por Franca Marketing" → WhatsApp com mensagem automática.
