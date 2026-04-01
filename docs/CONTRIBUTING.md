# Contribuindo

## Pré-requisitos
- Node.js 18+ e npm

## Setup local
```bash
cd site_desktop_neofi
npm ci
cp .env.example .env.local
```

## Rodar o projeto
```bash
cd site_desktop_neofi
npm run dev
```

## Padrão de branches
- main: produção
- develop: staging
- feature/*, fix/*: trabalho diário via PR para develop (ou main quando necessário)

## Checklist antes de abrir PR
```bash
cd site_desktop_neofi
npm run lint
npm run typecheck
npm run build
```

## Convenção de commits
Use Conventional Commits:
- feat:
- fix:
- docs:
- chore:
- refactor:
