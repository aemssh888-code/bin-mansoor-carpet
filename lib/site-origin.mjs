// NEXT_PUBLIC_SITE_URL may override the verified production origin when required.
// Shared by application metadata, design links and static export/verification scripts.
export const siteUrl=new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://binmansoor.com').origin;
