# Deploy

## Vercel (recomendado)

Este repositório usa GitHub Actions para deploy no Vercel.

### Secrets necessários no GitHub
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

### Estratégia
- PR para main: gera Preview Deploy
- Push em develop: staging
- Push em main: produção

### Diretório do projeto
O app Vite está em `site_desktop_neofi/`. Os workflows rodam e fazem deploy a partir desse diretório.

## Variáveis de ambiente
As variáveis locais devem ficar em `site_desktop_neofi/.env.local`. Use como base `site_desktop_neofi/.env.example`.
