// Set NEXT_PUBLIC_SITE_URL only after the custom domain serves this production site.
// Shared by application metadata, design links and static export/verification scripts.
export const siteUrl=new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://bin-mansoor-carpet.vercel.app').origin;
