# Sales Outreach Assistant

Private Phase 1 workspace for preparing one reviewed email at a time. It does not send email, access Gmail credentials, scrape leads, or store lead data on the server.

## 1. Configure access

Create a strong Vercel Production environment variable named `OUTREACH_ADMIN_PASSWORD` (a unique generated passphrase of 12 or more characters is recommended). Do not place the value in source control or any `NEXT_PUBLIC_*` variable. Redeploy after adding or changing it.

For local testing, set the variable only in the terminal process or an ignored `.env.local` file.

## 2. Open the dashboard

Visit `/admin/outreach`. Unauthenticated requests are redirected to `/admin/outreach/login`. A successful server-side password check creates a 12-hour `HttpOnly`, `SameSite=Strict` session cookie scoped to the outreach route. Use **Sign out** when finished on a shared device.

## 3. XLSX and CSV import

Use **Import XLSX / CSV** to process a workbook locally in the browser. For the Saudi lead workbook, the importer selects the `العملاء_100` sheet and maps its Arabic headers automatically. It also accepts UTF-8 CSV files with either those Arabic headers or the exported English field names.

Only `companyName` / `الشركة` is required. A company without an email is retained as **Needs Contact Research**. Existing reviewed workbook rows keep their prior readiness only when the valid business email and public source evidence are both present. New research becomes **Ready to Contact** only after an accepted verification status and a public source are recorded. Invalid rows and possible duplicates are shown in a confirmation preview. Duplicate handling can either skip the new row or update the existing local record.

The target-role field is separate from an actual contact name and contact job title. Importing values such as `Procurement / Projects / FF&E` never creates a fictional contact person.

## 4. Research and campaign workflow

Use the **Contact Research** queue to work highest priority first. **Research Contact** opens the focused manual-research panel with official-site, contact-page, source, supplier-registration, and optional web-search links. No site is scraped. Record only public business details and keep the supporting URL.

The panel stores procurement, projects, business and general email separately and selects the recipient in that order. It also supports contact forms and supplier portals without inventing an email. These remain usable states—**Contact Form Available** or **Supplier Portal Available**—rather than being forced into email outreach. **Save & Next** opens the next highest-priority unresolved company. Domain mismatches and an email already used by another lead are warnings, never automatic rejection or merging.

Email actions remain disabled until a valid business email, an accepted verification status (`VERIFIED` or `FOUND_TARGET_CONTACT`), and a public research source are present. `DO NOT CONTACT` always blocks email generation.

The named working list stores up to 30 manually selected leads in this browser. It is a planning queue only and does not send bulk email.

## 5. Prepare an email

Open a lead, choose the email type, add an optional truthful Personal Opening Line, select MOQ/opt-out preferences and optionally include up to three existing BMC or WTW designs. Generate the draft, then edit TO, SUBJECT and BODY before using it.

## 6. Open Gmail

**Open in Gmail** opens the current browser's Gmail compose page with TO, SUBJECT and BODY filled. The dashboard never receives a Google password and never sends the email.

## 7. Mark as sent

Opening Gmail is not proof of sending. After manually sending in Gmail, return and click **Mark as Sent**. This records the time, sets status to `CONTACTED` and suggests a follow-up after four days.

## 8. Follow-up workflow

Due dates appear as `FOLLOW-UP DUE`. **Prepare Follow-Up** selects Follow-Up #1, then Follow-Up #2 based on local contact history. Follow-Up #2 does not schedule another follow-up automatically. `DO NOT CONTACT` blocks draft generation until the owner manually changes the status.

## 9. Export and backup

**Export CSV** exports the current lead table, including all research evidence, structured contact methods, verification state, and verification time. **Export Backup** saves the complete local state as JSON; **Import Backup** replaces the local browser database only after validation. Stored version-2 leads are normalized in place when loaded; the original 100-lead workbook does not need to be imported again.

## 10. Privacy limitations

Lead data, campaign selections, and the selected workbook are processed only in the current browser profile. Lead records are stored in IndexedDB and campaign selections in local storage. Nothing is uploaded by the importer, synchronized between devices, committed with the site, or sent to analytics. Browser site data can be cleared, so keep encrypted device-level protection and regular JSON backups. Do not import sensitive personal data beyond legitimate business-contact information.
