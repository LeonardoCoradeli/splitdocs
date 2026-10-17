# SplitDocs 📄✂️

> **Aplicação web 100% client-side para divisão inteligente de documentos, planilhas e legendas em múltiplas partes.**

[![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0-FFD859?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Live Demo](https://img.shields.io/badge/Demo_Online-centralutil.com.br-0A66C2?style=for-the-badge&logo=googlechrome&logoColor=white)](https://dividir-documentos.centralutil.com.br)

---

## 🎯 Visão Geral

O **SplitDocs** é uma ferramenta web desenvolvida para dividir arquivos grandes de texto, documentos PDF, planilhas CSV e arquivos de legenda em partes menores e estruturadas.

Todo o processamento ocorre **100% no navegador do usuário (Client-Side)** utilizando Web APIs (`FileReader`, `Blob`, `Uint8Array`), `pdf-lib` e `JSZip` — garantindo **privacidade total dos dados** (nenhum arquivo é enviado para servidores externos), baixa latência e suporte a arquivos de até **50 MB**.

🔗 **Acesse em produção:** [dividir-documentos.centralutil.com.br](https://dividir-documentos.centralutil.com.br)

---

## ✨ Principais Funcionalidades

* **🔒 Processamento 100% Client-Side:** Parsing, fragmentação e reconstrução de binários (como páginas PDF e pacotes ZIP) executados integralmente na memória do navegador.
* **📂 Suporte Multi-Formato (6 Parsers Dedicados):**
  * **Documentos & Dados:** `.pdf`, `.txt`, `.csv`
  * **Legendas de Vídeo:** `.srt`, `.vtt`, `.ass`
  * **Entrada Direta:** Área de colagem rápida de texto bruto (*Paste Area*).
* **⚙️ 5 Critérios de Divisão Modulares:**
  1. **Tamanho Fixo (`bySize`):** Divisão exata por quantidade de linhas, palavras ou caracteres.
  2. **Número de Partes (`byParts`):** Distribuição equilibrada do documento em $N$ arquivos.
  3. **Marcador Estrutural (`byMarker`):** Quebra baseada em delimitadores, cabeçalhos ou expressões personalizadas.
  4. **Intervalo de Tempo (`byTime`):** Divisão cronológica em segundos ou minutos (específico para legendas `.srt`, `.vtt` e `.ass`).
  5. **Por Colunas (`byColumns`):** Extração e segmentação vertical/estrutural para arquivos tabulares (`.csv`).
* **👁️ Pré-visualização Interativa (`PreviewModal`):** Inspeção em tempo real de cada parte gerada (com contagem de linhas, palavras e caracteres) antes da exportação.
* **📦 Exportação Flexível & Lote ZIP:** Conversão para o formato original, `.txt` ou `.md`, renomeação individual de partes e download unificado em `.zip`.
* **🌍 Internacionalização (i18n) & Temas:** Interface disponível em **Português (`pt-BR`)** e **Inglês (`en`)**, com suporte nativo a **Dark Mode / Light Mode**.

---

## 🏗️ Arquitetura do Projeto

O projeto segue os padrões modernos do ecossistema **Vue 3 (`<script setup>` Composition API)** com tipagem estrita em **TypeScript**:

```text
src/
├── assets/css/        # Variáveis CSS (Design Tokens) e estilização global (Light/Dark)
├── components/
│   ├── common/        # Componentes base reutilizáveis (AppButton, AppModal, ProgressBar, StatsBar)
│   ├── upload/        # DropZone (Drag & Drop), TextPasteArea e CriteriaSection
│   ├── preview/       # PreviewModal, PartRow e SkeletonBlock para pré-visualização das partes
│   └── download/      # FileList, FileRow e RenameInput para gestão dos arquivos gerados
├── composables/       # Lógica reativa isolada (useSplitEngine, useFileReader, useDownloadZip, useStats, useHistory, useI18n, useDarkMode)
├── i18n/              # Dicionários de tradução (pt-BR.json, en.json)
├── pages/             # Rotas principais (index.vue e downloads.vue)
├── stores/            # Gerenciamento de estado global da sessão com Pinia (session.ts)
├── types/             # Contratos e interfaces TypeScript (criteria, file, history, part)
└── utils/
    ├── parsers/       # Parsers específicos por formato (parsePdf, parseCsv, parseTxt, parseSrt, parseVtt, parseAss)
    ├── criteria/      # Algoritmos puros de divisão (bySize, byParts, byMarker, byTime, byColumns)
    └── formatters/    # Serializadores de saída (formatOriginal, formatTxt, formatMd)
```

---

## 🛠️ Stack Tecnológica

* **Core:** [Vue 3.5](https://vuejs.org/) (Composition API) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
* **Gerenciamento de Estado & Rotas:** [Pinia](https://pinia.vuejs.org/) + [Vue Router 4](https://router.vuejs.org/)
* **Utilitários & Internacionalização:** [VueUse](https://vueuse.org/) (`@vueuse/core`, `@vueuse/head`) + [Vue I18n](https://vue-i18n.intlify.dev/)
* **Manipulação de Arquivos:** [`pdf-lib`](https://pdf-lib.js.org/) (extração e geração de páginas PDF) + [`jszip`](https://stuk.github.io/jszip/) (compactação em lote no navegador)
* **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`) com build tipado (`vue-tsc`) e deploy automatizado para o GitHub Pages com domínio customizado.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
* **Node.js** (v18+ recomendado)
* **npm** ou **pnpm**

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/LeonardoCoradeli/splitdocs.git
cd splitdocs

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
* `npm run dev` — Inicia o ambiente de desenvolvimento local com HMR.
* `npm run lint` — Executa a verificação estática de tipos (`vue-tsc --noEmit`).
* `npm run build` — Valida a tipagem TypeScript e gera o bundle otimizado de produção em `dist/`.
* `npm run preview` — Serve localmente o build de produção para validação.
