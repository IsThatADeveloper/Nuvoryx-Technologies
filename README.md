# Northstar IT — Vercel-ready consultation website

## Files
- `index.html`: responsive website and form
- `content.json`: editable website text, contact display email, and SEO copy
- `logo.svg`: header and favicon logo
- `api/consultation.js`: Vercel serverless form handler that sends consultation inquiries to **eshaanshah24@gmail.com** via Resend

## Deploy on Vercel
1. Create an account at [Vercel](https://vercel.com/) and deploy this folder (ideally as a GitHub repository). It is a static HTML site with one `/api/consultation` Vercel Function. Do not deploy a nested folder that excludes `api`.
2. Create a [Resend](https://resend.com/) account and create an API key. Verify a domain you control in Resend to send from a branded address, e.g. `Northstar IT <consultations@yourdomain.com>`.
3. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = your private Resend API key
   - `RESEND_FROM_EMAIL` = `Northstar IT <consultations@yourdomain.com>` (must be an authorized sender)
4. Redeploy your Vercel project to activate environment variables.
5. Submit a real test inquiry on your deployed domain. Check the Gmail inbox **eshaanshah24@gmail.com** and spam folder.

**Important:** The destination email is set on the server in `api/consultation.js`. `content.json` only changes visible website copy, *not* email routing. The API key must never be placed in browser JavaScript, HTML, or `content.json`. Without provider configuration, the form will display an error and will not send email.

## Edit content
Edit values in `content.json` and redeploy. Preview with `python -m http.server 8000` for static copy, but form submissions require Vercel or an equivalent dev server with the API function enabled.

## Production considerations
- Add anti-spam protections such as rate limiting and CAPTCHA/Turnstile before running large campaigns; a honeypot field is included as a minimal deterrent, not sufficient on its own.
- Publish a privacy policy explaining how inquiry data is processed and retained. Avoid gathering sensitive information in this form.
- Use a verified business domain as the **sender**; the destination may remain the Gmail address.
- Form delivery is not yet verified until you deploy and configure a live Resend API key/domain.
