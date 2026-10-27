# Regras do Projeto SplitDocs

Este documento define as diretrizes mandatórias de operação neste repositório.

## 1. Aprovação Prévia Obrigatória de Passos e Comandos

Antes de executar qualquer tarefa prática (edição de código, criação de arquivos ou comandos de terminal):
1. **Liste detalhadamente todos os passos** que pretende executar.
2. **Liste todos os comandos auxiliares** de terminal que pretende rodar (testes, lint, git, builds, etc.).
3. **Pergunte se está "ok"** e aguarde a autorização explícita do usuário.
4. **Somente execute** após a confirmação do usuário.

## 2. Padrão Estrito de Commits (Conventional Commits)

Todas as mensagens de commit devem seguir estritamente o padrão Conventional Commits em **linha única**:
- Formato: `<tipo>(<escopo opcional>): <descrição no imperativo>`
- **Sem corpo:** Jamais adicione corpo (body) ao commit.
- **Sem rodapé:** Jamais adicione rodapé (footer) ao commit.
- **Minúsculas:** Tipo, escopo e descrição sempre em letras minúsculas.
- **Sem ponto final** no término da mensagem.
- Tipos aceitos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Exemplo: `git commit -m "feat(ui): add progress indicator during zip generation"`
