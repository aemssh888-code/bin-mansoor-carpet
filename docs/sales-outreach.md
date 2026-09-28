# Sales Outreach Assistant

Private Phase 1 workspace for preparing one reviewed email at a time. It does not send email, access Gmail credentials, scrape leads, or store lead data on the server.

## 1. Configure access

Create a strong Vercel Production environment variable named `OUTREACH_ADMIN_PASSWORD` (minimum 12 characters; a unique generated passphrase is recommended). Do not place the value in source control or any `NEXT_PUBLIC_*` variable. Redeploy after adding or changing it.

For local testing, set the variable only in the terminal process or an ignored `.env.local` file.

## 2. Open the dashboard

Visit `/admin/outreach`. Unauthenticated requests are redirected to `/admin/outreach/login`. A successful server-side password check creates a 12-hour `HttpOnly`, `SameSite=Strict` session cookie scoped to the outreach route. Use **Sign out** when finished on a shared device.

## 3. CSV import

UTF-8 CSV headers: `companyName,contactName,jobTitle,email,phone,city,country,sector,website,source,language,notes`.

`companyName` and a valid `email` are required. Invalid and duplicate rows are shown for review rather than silently deleted. Supported languages are `en` and `ar`.

## 4. Prepare an email

Open a lead, choose the email type, add an optional truthful Personal Opening Line, select MOQ/opt-out preferences and optionally include up to three existing BMC or WTW designs. Generate the draft, then edit TO, SUBJECT and BODY before using it.

## 5. Open Gmail

**Open in Gmail** opens the current browser's Gmail compose page with TO, SUBJECT and BODY filled. The dashboard never receives a Google password and never sends the email.

## 6. Mark as sent

Opening Gmail is not proof of sending. After manually sending in Gmail, return and click **Mark as Sent**. This records the time, sets status to `CONTACTED` and suggests a follow-up after four days.

## 7. Follow-up workflow

Due dates appear as `FOLLOW-UP DUE`. **Prepare Follow-Up** selects Follow-Up #1, then Follow-Up #2 based on local contact history. Follow-Up #2 does not schedule another follow-up automatically. `DO NOT CONTACT` blocks draft generation until the owner manually changes the status.

## 8. Export and backup

**Export CSV** exports the current lead table. **Export Backup** saves the complete local state as JSON; **Import Backup** replaces the local browser database only after validation.

## 9. Privacy limitations

Lead data is stored in IndexedDB in the current browser profile. It is not synchronized between devices and can be lost if browser site data is cleared. Keep encrypted device-level protection and regular JSON backups. Do not import sensitive personal data beyond legitimate business-contact information. No third-party analytics or server-side lead database is used.
