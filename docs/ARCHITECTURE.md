# Arquitetura

## Estrutura
- `site_desktop_neofi/`: app React + Vite (marketing + páginas de produto)
- `site_desktop_neofi/src/components/`: componentes reutilizáveis
- `site_desktop_neofi/src/pages/`: rotas/páginas (React Router)
- `site_desktop_neofi/src/lib/`: integrações (Supabase, WhatsApp, assetUrl)
- `site_desktop_neofi/supabase/`: funções/config do Supabase

## Deploy
O deploy ocorre via GitHub Actions para Vercel, usando `site_desktop_neofi/` como diretório de trabalho.
