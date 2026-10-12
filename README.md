# Doge Pepe ($DOPE)

Website for Doge Pepe ($DOPE) on BNB Chain. Next.js (App Router) + Tailwind v4, Inter (self-hosted), light/dark theme, BNB Chain wallet sign-in for the members-only Dope Den.

## Run

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to your real domain
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Deploy to Vercel as-is. Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables so canonical URLs, `sitemap.xml`, `robots.txt` and social cards use your domain.

## Where things live

| What | Where |
| --- | --- |
| Token address, Buy / X / BscScan links, nav | `src/lib/site.ts` |
| Landing page sections and copy | `src/app/page.tsx` |
| Members area (wallet-gated) | `src/app/den/` |
| Wallet logic (EIP-1193 / EIP-6963, BNB Chain) | `src/lib/wallet.ts` |
| Design tokens, light/dark, animations | `src/app/globals.css` |
| Favicon, app icons, OG/Twitter image | `src/app/` (`icon.png`, `apple-icon.png`, `favicon.ico`, `opengraph-image.png`) |

## Wallet gate: what it is and isn't

Visitors connect a BNB Chain wallet (MetaMask, Trust Wallet, anything EIP-6963/EIP-1193) and sign a free message. That unlocks `/den` in the browser. It is a front-end gate with no backend: it keeps casual visitors out, but the Den's contents are not secret. Don't put anything private behind it without adding server-side verification (e.g. SIWE with a session cookie).

## Quality checklist (all handled)

Unique titles and meta descriptions, canonical URLs, Open Graph + Twitter image, custom favicon and app icons, `sitemap.xml`, `robots.txt`, web manifest, one `<h1>` per page, alt text on all images, custom 404 and error pages, branded loading states, no `console.*` calls, no source maps in production, small JS bundle, no horizontal overflow on mobile, no dead links or buttons.
