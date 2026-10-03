# Production audit — 2026-10-03

Scope: existing `binmansoor.com` site and `main` of `aemssh888-code/bin-mansoor-carpet`. Initial deployed GitHub commit: `ebe73019e1681dc7000d4c2ac57df2a4c68bb54c` (GitHub Vercel status: success). The unrelated untracked `public/media/hero-review/` directory was not changed.

## Confirmed issues

| Severity | Page and reproduction | Cause | Fix |
| --- | --- | --- | --- |
| Low | `/ar/wall-to-wall`: inspect a card with seven previews; it said `7 ألوان`. English and Turkish likewise called them colours. | Card copy treated approved colour/design previews as distinct colours. | Use localized preview terminology without changing the 173 approved previews or their codes. |
| Low | `/ar/wall-to-wall/wtw-058` and `/tr/wall-to-wall/wtw-058`: inspect the Style/الطابع field; Arabic showed `Minimal · Soft`, Turkish mixed untranslated terms. | Raw approved taxonomy values were printed directly. | Translate display labels for all ten approved style values while preserving stored taxonomy and search/filter keys. |
| Low | `/` with JavaScript disabled or unavailable: the loading message remains, with no way to reach a locale. | Locale selection relies on a client-side redirect. | Add a `<noscript>` locale-link fallback; keep the current automatic redirect for normal browsers. |

## Checked without a confirmed defect

- Approved data remained 43 BMC models/81 colourways and 65 active WTW models/173 previews; retired WTW-005 and WTW-007 remain reserved, and WTW-065 remains Geometric.
- All 324 localized product-detail URLs plus three locale home URLs returned successful HTTP responses. Existing build verification also checks generated routes, images, codes, null technical fields, sitemap and robots.
- Live Home, About, Contact, both catalogs, representative BMC/WTW details and Quote were inspected. Arabic, English and Turkish routes and the Arabic RTL direction were checked. No broken loaded images, browser-console errors or horizontal overflow were observed in the sampled pages at 390, 768 and 1440 px.
- Public rug and WTW search/filter interactions, WTW preview switching, route-preserving language switch, and mixed BMC + WTW quote-list storage were exercised in a separate browser session. WhatsApp and call links were inspected but not activated; no external message was sent.
- Live `/admin/outreach` redirected an unauthenticated session to login (307), with private no-store/noindex headers. Public assets were checked for lead data. The owner's authenticated browser-local database was not accessed, imported, cleared or replaced. Import/export, status, search, filter and sorting logic was covered by existing automated tests, not by destructive live operations.
- Localized canonical/hreflang metadata, sitemap/robots, and HTTPS HSTS were observed. A full accessibility conformance audit, Core Web Vitals field measurement, authenticated dashboard browser journey and third-party WhatsApp/tel handoff remain outside what could be safely established in this pass.

## Deferred suggestions

- Consider a measured accessibility audit with automated WCAG scans plus keyboard/screen-reader testing; no claim of full WCAG compliance is made here.
- Consider a staged Content Security Policy and other response headers after inventorying all third-party assets and testing the private dashboard. A blanket policy could break existing flows, so it was not added blindly.
- Consider server-side root locale negotiation later if no-JavaScript visitors are material. This would require a deliberate choice about preserving the current local-language preference behaviour.
