---
name: step-approval
description: >-
  Obrigatoriedade de listar todos os passos e comandos auxiliares e solicitar aprovação prévia do usuário antes de executar qualquer ação.
  Use sempre antes de iniciar qualquer execução ou tarefa no projeto.
---

# Aprovação Prévia de Passos e Comandos

Esta skill define o protocolo mandatório de alinhamento e autorização prévia antes de qualquer execução autônoma.

## Protocolo Obrigatório

Mesmo operando em modo autônomo com permissão para rodar comandos e editar arquivos, **nenhuma alteração ou comando deve ser executado de forma precipitada**.

Antes de executar qualquer ação no projeto, siga rigorosamente as etapas abaixo:

### 1. Apresentar a Lista Detalhada de Passos
Apresente uma lista clara e estruturada contendo:
- Cada arquivo que será criado, modificado ou removido, com link para o arquivo.
- O propósito específico de cada modificação.

### 2. Listar Todos os Comandos Auxiliares
Liste explicitamente todo e qualquer comando de terminal que pretende executar, incluindo:
- Comandos de instalação (`npm install`, etc.).
- Comandos de verificação e build (`npm run lint`, `npm run build`, `npm test`, etc.).
- Comandos Git (`git status`, `git add`, `git commit`, `git checkout`, etc.).

### 3. Solicitar Aprovação Explícita
Finalize sempre perguntando se o plano está "ok" ou se o usuário deseja algum ajuste.

### 4. Aguardar Confirmação
- **Não execute** comandos ou edições antes do "sim", "ok" ou confirmação explícita do usuário.
- Se o usuário solicitar ajustes, refine o plano e pergunte novamente.
- Após aprovado, execute exatamente o que foi planejado.
