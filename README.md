# Northstar IT website — editable JSON

## Files
- `index.html`: complete responsive site and animations
- `content.json`: editable website copy, company name, email, SEO title and description
- `logo.svg`: scalable header/footer logo and browser favicon

## Edit website text
Open `content.json` in a text editor. Change values inside `site` and `text` (do not change the key names), save, and refresh your website. Use double quotes and keep commas between entries. The `hero.highlight` key changes the highlighted words in the heading.

Example:
```json
"site": {
  "companyName": "Your Company Name",
  "contactEmail": "sales@yourcompany.com",
  "pageTitle": "Your Company — Managed IT & AI",
  "metaDescription": "IT support and AI consulting for businesses"
}
```

## Preview locally
Browsers block fetching local JSON from a `file://` page. Start a simple local web server from the website folder:

```bash
python -m http.server 8000
```

Then open **http://localhost:8000** in your browser. You can upload all three website files to any standard static host (Netlify, Vercel, GitHub Pages, etc.). `content.json` must remain beside `index.html`. When JSON fails to load, the built-in text is displayed as a fallback.

## Important before launch
- Replace `hello@yourcompany.com` with your real email in `content.json`. The contact form uses `mailto:` and does not store submissions.
- Replace the temporary Northstar IT company name and adapt the logo if desired.
- Only publish capabilities and claims your team can deliver.
- You can edit `logo.svg` colors in any text editor.
