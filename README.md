# NeoFi Site

## Estrutura
- `site_desktop_neofi/`: app React + Vite
- `docs/`: documentação (contribuição, deploy, arquitetura)

## Setup local
```bash
cd site_desktop_neofi
npm ci
cp .env.example .env.local
npm run dev
```

## CI / Deploy
- CI: lint + typecheck + build em PRs e pushes
- Deploy (Vercel): preview em PR, staging em `develop`, produção em `main`

Detalhes em [DEPLOYMENT.md](file:///Users/maikao/Documents/Projects/neofi-site/docs/DEPLOYMENT.md).
Detalhes em docs/DEPLOYMENT.md.
