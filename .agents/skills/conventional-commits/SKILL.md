---
name: conventional-commits
description: >-
  Padronização estrita de mensagens de commit seguindo Conventional Commits em linha única.
  Use sempre que for criar, sugerir ou executar commits no Git.
---

# Conventional Commits (Linha Única)

Esta skill estabelece o padrão obrigatório para todas as mensagens de commit no projeto SplitDocs.

## Regras Obrigatórias

1. **Apenas linha única:** O commit deve conter exclusivamente o título.
2. **Sem corpo:** É terminantemente proibido incluir corpo (body) no commit.
3. **Sem rodapé:** É terminantemente proibido incluir rodapé (footer) no commit.
4. **Minúsculas:** O tipo, escopo e descrição devem estar em letras minúsculas.
5. **Imperativo:** Use verbos no tempo presente/imperativo (ex: `add`, `fix`, `update`, `remove`).
6. **Sem ponto final:** Não finalize a mensagem com ponto `.`.

## Formato Estrito

```text
<tipo>(<escopo opcional>): <descrição no imperativo>
```

## Tipos Permitidos

- `feat`: Nova funcionalidade para o usuário ou aplicação.
- `fix`: Correção de bug.
- `docs`: Alterações exclusivamente em documentação.
- `style`: Ajustes visuais ou formatação de código sem alteração lógica.
- `refactor`: Refatoração de código sem alteração de funcionalidade.
- `perf`: Mudança focada em melhoria de desempenho.
- `test`: Criação ou ajuste de testes.
- `build`: Mudanças em dependências ou configurações de build (Vite, npm, tsconfig).
- `ci`: Configurações de integração contínua (GitHub Actions).
- `chore`: Tarefas de manutenção ou configuração geral.
- `revert`: Reversão de commit anterior.

## Escopos Recomendados

- `parser`: Parsers de documentos (`pdf`, `csv`, `srt`, `vtt`, `ass`, `txt`).
- `criteria`: Critérios de divisão (`bySize`, `byMarker`, `byTime`, `byColumns`, `byParts`).
- `formatter`: Formatadores de saída (`original`, `txt`, `md`).
- `ui`: Componentes de interface (`upload`, `preview`, `download`, `layout`, `common`).
- `store`: Gerenciamento de estado Pinia (`session`).
- `composables`: Hooks de lógica reativa.
- `i18n`: Arquivos de tradução e idiomas.
- `deps`: Dependências e pacotes.

## Exemplos Válidos

```bash
git commit -m "feat(ui): add progress indicator during zip generation"
git commit -m "fix(parser): handle empty lines in srt parser"
git commit -m "docs(readme): update local setup instructions"
git commit -m "chore(agents): add conventional commits skill"
```
