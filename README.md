# FPL4FLIGHT Company Website

Standalone Next.js company profile for the FPL4FLIGHT mobile application.
Includes responsive company and product sections, interactive app illustrations,
hero and scroll animations, Privacy Policy, and Terms & Conditions.

## Getting started

Requires Node.js 22 or later and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3002.

## Production

```sh
npm run build
npm start
```

Deploy this repository as a Next.js project with the repository root as the
project directory. No mobile app code or Supabase credentials are required.

## Customization

- Company copy and footer: `app/page.tsx`.
- Visual styles and animation: `app/globals.css` and `components/site-motion.tsx`.
- Policies: `lib/legal-content.ts`, with `/privacy` and `/terms` routes.
- Public support address: set `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` or the
  hosting environment. The default is `support@fpl4flight.io`.

The contact form prepares an email in the visitor's email application; it does
not send messages or store submissions. The phone preview is illustrative.
Legal content mirrors the mobile app's August 19, 2026 policies. Privacy inquiries
use `privacy@fpl4flight.io`. Confirm public contact addresses before deployment.

Animations respect reduced-motion preferences and pause the hero when offscreen
or when the browser tab is hidden. Fonts use Google Fonts with system fallbacks.
