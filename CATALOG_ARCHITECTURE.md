# Approved catalog integration

## Data ownership

- `lib/catalog-data.json` is the central, typed public catalog: exactly 43 models and 81 selected colourways.
- `lib/products.ts` defines the model, future specifications, responsive image assets and search normalization. Stable BMC codes own identity; source codes remain searchable.
- `scripts/import-approved-catalog.py` reads the approved analysis and only its selected image files. It creates responsive WebP derivatives, never changes originals, never imports additional archives, and asserts counts and source hashes.
- The owner-only `catalog-master.internal.json`, Excel and CSV are OUTSIDE this repository. They preserve original filenames, absolute paths, hashes and all aliases. Never import this internal data in a client component or place it in public assets.
- Naming changes belong in catalog data, not page components. Re-running the importer restores analysis names, so changes must first be approved in the analysis or applied through a reviewed data update.

## Preview and future photography

Every current image has `imageKind: design-preview` and `productionConfirmed: false`. Public labels say Design Preview / Tasarım / تصميم. Approval of publication is not evidence of manufactured stock.

Replace a colourway image and its responsive sources/dimensions to introduce approved photography later. Keep its stable colourway code and product slug. Update imageKind, heroImage and gallery references consistently. No product page rebuild is needed.

## UX and routes

- Arabic, English and Turkish pages use stable `/{locale}/products/{bmc-code}` routes.
- Nine formerly published approved slugs remain aliases with canonical URLs pointing to BMC routes. Unapproved old models do not have aliases.
- Grid: 12 models initially, then increments of 12. Search covers BMC, source codes and all three names. Compact desktop filters and a mobile drawer use category, style and colour data.
- Colour selection stays on the product route and supplies the selected code to quote and WhatsApp actions.
- Quote forms have no backend or persistence. Required fields are validated; the message opens for user review in WhatsApp and is not automatically sent.

## Unknown information

All unverified technical values and PDFs are null and omitted from rendering. `lib/business.ts` supports future factory dimensions, employees, capacities, materials, certifications, exports, shipping, timing, custom work, media, projects, clients and applications. `FutureSections` only renders populated data.

Verified facts: established 2023, four machines and total order MOQ 8,000 m². No production capacity, stock, material or project claims are inferred from images.

## Deployment

The existing Vinext static export is retained. Run the existing build and `scripts/prepare-github-pages.mjs` to create clean-URL directories and localized HTML language/direction attributes. `NEXT_PUBLIC_SITE_URL` controls canonical/hreflang/Open Graph URLs; default remains the existing Vercel domain for future public publication.

Public publication was subsequently authorized. The verified production destination is `bin-mansoor-carpet.vercel.app`, connected in Vercel to `aemssh888-code/bin-mansoor-carpet`, branch `main`. Push explicitly to `vercel-github main`; the other remotes are not this Vercel production repository.

`pnpm pages:prepare` validates the approved release contract (43 unique models, 81 unique colorways), all 129 localized product pages, image files and absence of prototype copy. A failure stops the Vercel build. It also emits `/deployment-info.json` with the actual build commit, branch and catalog checksum, allowing direct verification of the live alias without relying solely on a GitHub success status. Intentional future catalog expansion must update the approved release contract together with the approved data.

Legacy website derivatives were moved to ignored `work/legacy-media-products`, not destroyed. No original catalog files were moved, deleted or renamed. Additional archive candidates and the 73 non-approved design groups remain excluded.
