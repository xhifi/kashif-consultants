# Kashif Consultants

A statically configured Next.js website for Kashif Consultants. Website copy, contact details, navigation, SEO metadata, and service descriptions live in the source files under `data/`.

## Run locally

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open the local URL printed by Next.js.

## Update website content

- Edit `data/site-settings.js` for site identity, contact details, page sections, navigation, and SEO settings.
- Edit `data/services.js` to change the services shown on the website.
- Set `contact.address`, `contact.email`, and `contact.phone` in `data/site-settings.js` to publish those details in the footer. Add real social profile URLs to `contact.socialLinks`; profiles are omitted until configured.
- Copy `.env.example` to `.env.local` and configure the SMTP host, port, secure mode, username, password, sender and recipient before using the enquiry form.

The branded Open Graph and Twitter social cards are generated from the site identity. Newsletter signups require explicit consent and are emailed to `CONTACT_EMAIL`; this project does not keep a mailing list, so the request must be added to any marketing list separately. Enquiry messages are also emailed and neither form submission is stored on the site.

The website has no CMS, authentication, dashboard, or database.
