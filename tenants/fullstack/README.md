# TheFullStack Guys tenant

- Hostnames: `thefullstackguys.com` and `www.thefullstackguys.com`.
- Website name: TheFullStack Guys.
- Business and brand: MORGAN RETAILERS.
- GSTIN: 07ANVPC6122B1ZA.
- Address: 1st Floor, House No-29, Tiggipur, New Delhi, North Delhi, Delhi, PIN 110036, India.

This tenant runs inside the existing Next.js app. It uses the existing database connection, AI-provider credentials, and administrator credentials. Its `morgan_retailers_*` tables, admin cookie, browser session keys, page sources, assets, canonical URLs, sitemap and robots file are separate. No existing records were migrated, deleted or rewritten during implementation. Tenant tables are initialized by the existing storage pattern when those features are first used.

`proxy.ts` matches the actual Host header, removes untrusted tenant headers, and rewrites supported public paths to this tenant. Internal route paths cannot be requested directly. The public URL remains unchanged. The other hostname routes retain their existing behavior.

The public contact route uses the website inquiry form and published postal address. A business email, phone, and booking-calendar link have not yet been supplied for this tenant, so none are invented. Add verified contacts when supplied. Privacy, terms and refund policy text must continue to match actual operational practices.

Portfolio images and the new silent portfolio reel use local tenant assets. No advertising pixels, heatmaps or conversion endpoints are active in this tenant. Claims about marketplace reviews and credentials from another identity were not carried over.

## Local verification

```sh
npm run dev -- --hostname localhost --port 3002
```

Open `http://thefullstackguys.localhost:3002` for this tenant and `http://localhost:3002` for the default site. The `.localhost` alias is only recognized in development.

```sh
npm test
npm start -- --hostname localhost --port 3003
node scripts/verify-fullstack-http.mjs
```

HTTP checks use the actual production hostname in the Host header against a loopback server. They check pages, delivered JavaScript, metadata, assets, unsupported routes, and default-host behavior without writing database records. Browser inquiry tests use mocked responses.

No deployment or domain configuration change is part of this local implementation. Ad approval remains an independent platform decision; policy text alone is not a guarantee. The business identity, GST registration, authorization to use portfolio work, and operational privacy procedures must be accurate.
