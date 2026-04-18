# Foz Mineral Park — site oficial

Site institucional e de vendas do **Foz Mineral Park** (Foz do Iguaçu, PR).
Reconstrução completa do site anterior, com foco em SEO real, conformidade
com LGPD e funil de conversão funcional.

## Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** com design tokens inspirados em gemas
- **Vercel Analytics** + **Speed Insights** (sem cookies, LGPD-friendly)
- **Resend** para e-mail transacional (opcional na configuração inicial)
- **Sonner** para notificações de formulário
- **Lucide** para ícones

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run start      # servidor de produção
npm run lint       # ESLint
```

Node 20+ recomendado. O projeto é testado em Node 25.

## Variáveis de ambiente

Todas opcionais no setup inicial.

| Variável | Descrição |
|---|---|
| `RESEND_API_KEY` | API key Resend. Sem ela, o formulário de contato loga no servidor em vez de enviar e-mail. |
| `CONTACT_EMAIL` | Destino das mensagens (default: `contato@fozmineralpark.com.br`). |

## Estrutura

```
src/
├── app/          rotas App Router (home, atracoes/[slug], ingressos, contato, ...)
├── components/   UI primitivos (Button, Container, Navbar, Footer, ...)
└── lib/
    ├── site.ts   fonte única de copy, contatos, atrações, horário
    └── utils.ts  cn() helper
```

## Deploy

Pipeline pensado para Vercel:

1. `vercel link` no diretório do projeto.
2. Definir `RESEND_API_KEY` e `CONTACT_EMAIL` em Project Settings.
3. Apontar o domínio `fozmineralpark.com.br` (após registro no Registro.br).
4. Push na branch `main` → deploy automático.

## Segurança

Headers configurados em `next.config.ts`: CSP, HSTS (preload), X-Content-Type-Options,
X-Frame-Options: DENY, Referrer-Policy, Permissions-Policy, COOP/CORP. HTTPS é
garantido pelo Vercel. Não há tracking de terceiros além do Vercel Analytics.

`/.well-known/security.txt` está publicado conforme RFC 9116.

## Licença

© Foz Mineral Park LTDA — todos os direitos reservados.
