# FDIC API Documentation Portal

This repository hosts the documentation site for the **FDIC Bank Data API (Beta)**.  
It is a Next.js 16 application configured with [Fumadocs](https://fumadocs.dev) to render:

- Narrative guides and how‑to articles written in MDX
- Auto-generated endpoint reference pages sourced from `openapi.json`
- Search, navigation, and theming provided by Fumadocs UI components

Visit `https://api.fdic.gov/banks` to access the live FDIC API referenced throughout this site.

## Getting Started

```bash
pnpm install
pnpm dev        # starts Next.js dev server on http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
```

Additional scripts:

- `pnpm lint` – run Biome checks
- `pnpm format` – format files with Biome
- `pnpm types:check` – generate Fumadocs MDX metadata, refresh Next.js typegen, and run TypeScript

## Project Structure

| Path | Purpose |
| --- | --- |
| `app/(home)` | Landing page and marketing content. |
| `app/docs` | Documentation layout powered by Fumadocs. |
| `app/api/search/route.ts` | Route handler backing on-site search. |
| `content/docs/*.mdx` | Source articles describing FDIC endpoints (structure, financials, failures, demographics, etc.). |
| `openapi.json` | FDIC Bank Data API schema rendered through `fumadocs-openapi`. |
| `lib/source.ts` | Fumadocs content loader definition. |
| `lib/layout.shared.tsx` | Site-wide layout configuration (theme, links, metadata). |
| `mdx-components.tsx` | Custom MDX components, including the `<Card>` grid used on the home page. |

## Updating Content

1. **Guides & landing copy** – edit the relevant `.mdx` files under `content/docs`. Frontmatter (`title`, `description`, etc.) drives navigation labels.
2. **OpenAPI reference** – update `openapi.json` with the latest FDIC schema, then restart the dev server to regenerate endpoint pages automatically.
3. **Shared UI** – tweak navigation, footer links, or design tokens in `lib/layout.shared.tsx`.

## Incorporating FDIC Variable Definitions

The canonical field list provided by the FDIC lives in `fdicapi/fdic-reference-variable-definitions.csv`. Surface it inside the site so readers can look up codes without leaving the docs:

1. **Convert the CSV to typed data** – add a small build script (for example `scripts/build-variable-reference.ts`) that reads the CSV, normalizes the headers, and writes a consumable module under `lib/data/variable-definitions.ts`.

   ```ts
   // scripts/build-variable-reference.ts
   import { parse } from 'csv-parse/sync';
   import { readFileSync, writeFileSync } from 'node:fs';

   const csv = readFileSync('fdicapi/fdic-reference-variable-definitions.csv', 'utf8');
   const rows = parse(csv, { columns: true, skip_empty_lines: true });

   const body = `export type VariableDefinition = {
     variable: string;
     title: string;
     definition: string;
   };
   export const variableDefinitions: VariableDefinition[] = ${JSON.stringify(rows, null, 2)};`;

   writeFileSync('lib/data/variable-definitions.ts', body);
   ```

   Run it manually with `pnpm tsx scripts/build-variable-reference.ts` or hook it into `types:check` so the file stays fresh whenever the CSV changes.

2. **Render the data inside MDX** – create a small React table component (for example `components/ui/variable-reference-table.tsx`) that accepts `variableDefinitions` and supports filtering, then import it from a new `content/docs/variable-reference.mdx` page:

   ```mdx
   import { VariableReferenceTable } from '@/components/ui/variable-reference-table';
   import { variableDefinitions } from '@/lib/data/variable-definitions';

   # Variable Reference

   <VariableReferenceTable items={variableDefinitions} />
   ```

   Because MDX runs in the same bundler pipeline, the table automatically updates whenever the generated module changes.

3. **Link and surface search** – add the page to the docs navigation (`content/docs/index.mdx`) so it is easy to find, and rely on Fumadocs search to index the rendered content (ensure `includeProcessedMarkdown` remains enabled in `source.config.ts`).

## Deployment

1. Build locally with `pnpm build`.  
2. Deploy the `.next` output to your hosting provider (Vercel is the default choice for Next.js).  
3. Ensure the FDIC API base URL (`https://api.fdic.gov/banks`) remains accessible from the deployed environment for live examples.

## Support

For questions about the FDIC Bank Data API itself, contact **PublicDataFeedback@fdic.gov**.  
For issues with this documentation site, open an issue or pull request in this repository.
