# Sales Outreach Assistant

Private workspace for preparing one reviewed email at a time. It does not send email, access Gmail credentials, scrape leads, or store lead data on the server. The browser workspace is designed for at least 5,000 local records.

## 1. Configure access

Create a strong Vercel Production environment variable named `OUTREACH_ADMIN_PASSWORD` (a unique generated passphrase of 12 or more characters is recommended). Do not place the value in source control or any `NEXT_PUBLIC_*` variable. Redeploy after adding or changing it.

For local testing, set the variable only in the terminal process or an ignored `.env.local` file.

## 2. Open the dashboard

Visit `/admin/outreach`. Unauthenticated requests are redirected to `/admin/outreach/login`. A successful server-side password check creates a 12-hour `HttpOnly`, `SameSite=Strict` session cookie scoped to the outreach route. Use **Sign out** when finished on a shared device.

## 3. XLSX and CSV import

Use **Import XLSX / CSV** to process a workbook locally in the browser. For the original Saudi lead workbook, the importer selects the `العملاء_100` sheet and maps its Arabic headers automatically. It also accepts the expanded `saudi_5000_master.xlsx` workbook and UTF-8 CSV files with either the legacy Arabic headers or the exported English field names.

Only `companyName` / `الشركة` is required. A company without an email is retained as **Needs Contact Research**. Existing reviewed workbook rows keep their prior readiness only when the valid business email and public source evidence are both present. New research becomes **Ready to Contact** only after an accepted verification status and a public source are recorded. Invalid rows and possible duplicates are shown in a confirmation preview. Duplicate handling can either skip the new row or update the existing local record.

The target-role field is separate from an actual contact name and contact job title. Importing values such as `Procurement / Projects / FF&E` never creates a fictional contact person.

## 4. Research and campaign workflow

Use the **Contact Research** queue to work highest priority first. **Research Contact** opens the focused manual-research panel with official-site, contact-page, source, supplier-registration, and optional web-search links. No site is scraped. Record only public business details and keep the supporting URL.

The panel stores procurement, projects, business and general email separately and selects the recipient in that order. It also supports contact forms and supplier portals without inventing an email. These remain usable states—**Contact Form Available** or **Supplier Portal Available**—rather than being forced into email outreach. **Save & Next** opens the next highest-priority unresolved company. Domain mismatches and an email already used by another lead are warnings, never automatic rejection or merging.

Email actions remain disabled until a valid business email, an accepted verification status (`VERIFIED` or `FOUND_TARGET_CONTACT`), and a public research source are present. `DO NOT CONTACT` always blocks email generation.

Large lists are paginated at 50, 100 or 250 rows per page. Search covers company, normalized company name, domain, public business email, registration identifier and target role. Filters cover priority, sector, city, region, readiness/status, contact method and source.

The named working list stores up to 30 manually selected leads in this browser. Safe bulk actions are limited to selecting the current page, exporting selected rows, or adding selected rows to that 30-lead queue. They never send email or change contact status.

## 5. Prepare an email

Open a lead, choose the email type, add an optional truthful Personal Opening Line, select MOQ/opt-out preferences and optionally include up to three existing BMC or WTW designs. Generate the draft, then edit TO, SUBJECT and BODY before using it.

## 6. Open Gmail

**Open in Gmail** opens the current browser's Gmail compose page with TO, SUBJECT and BODY filled. The dashboard never receives a Google password and never sends the email.

## 7. Mark as sent

Opening Gmail is not proof of sending. After manually sending in Gmail, return and click **Mark as Sent**. This records the time, sets status to `CONTACTED` and suggests a follow-up after four days.

## 8. Follow-up workflow

Due dates appear as `FOLLOW-UP DUE`. **Prepare Follow-Up** selects Follow-Up #1, then Follow-Up #2 based on local contact history. Follow-Up #2 does not schedule another follow-up automatically. `DO NOT CONTACT` blocks draft generation until the owner manually changes the status.

## 9. Export and backup

**Export CSV** exports the current lead table, including scoring, deduplication review, source traceability, registration ID, research evidence, structured contact methods, verification state, and verification time. **Export Backup** saves the complete local state as JSON; **Import Backup** replaces the local browser database only after validation. At 500 or more records the dashboard reminds the owner when no backup has been exported in the last seven days.

The private delivery package includes checkpoint backups at 500, 1,000, 2,000, 3,000, 4,000 and 5,000 leads. Store those outside the public repository.

## 10. Privacy limitations

Lead data, campaign selections, and the selected workbook are processed only in the current browser profile. Lead records are stored in IndexedDB and campaign selections in local storage. Nothing is uploaded by the importer, synchronized between devices, committed with the site, or sent to analytics. Browser site data can be cleared, so keep encrypted device-level protection and regular JSON backups. Do not import sensitive personal data beyond legitimate business-contact information.
