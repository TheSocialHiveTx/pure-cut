# Pure Cut Outdoor Services

Responsive static website using only vanilla HTML, CSS and JavaScript. No package installation, build step, framework, API keys or backend required. All images are included locally and all asset paths are relative, so the site works on GitHub Pages project URLs.

## Publish on GitHub Pages

1. Extract this ZIP on your computer.
2. Create a GitHub repository, or open the repository you want to use.
3. Upload the **contents** of the extracted folder into the repository root. `index.html` must be at the root, alongside `styles.css`, `script.js`, `.nojekyll` and `assets/`. Do not upload the ZIP itself or place everything inside an extra folder.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select **main** and **/ (root)**, then click **Save**.
7. Wait for deployment and open the URL shown in Pages settings.

## Files

- `index.html`: page content, search metadata and structured business data.
- `styles.css`: responsive layout and styling.
- `script.js`: mobile menu and current copyright year.
- `assets/pure-cut-logo.jpg`: supplied company logo.
- `assets/pure-cut-services.png`: supplied promotional banner.
- `.nojekyll`: disables Jekyll processing.

## Contact and content

The site uses the company information visible in the supplied images: Pure Cut Outdoor Services, family-owned, Tulsa metropolitan area, (832) 519-7554, listed outdoor services, free estimates and 24-hour storm cleanup contact. The Facebook URL is the one supplied by the client. Facebook blocked automated retrieval, so additional profile details have not been assumed. Confirm the phone number and service details before publishing.

Phone buttons use `tel:` and text buttons use `sms:`. These open the visitor's installed phone or messaging application; they do not send a message automatically. Desktop support depends on installed applications. Facebook opens in a new tab. There is no form or external data collection.

The banner is promotional artwork supplied by the client; it is not presented as a portfolio photo or proof of completed work. No reviews, physical address, licenses, insurance claims or pricing have been invented. Copy is newly written around the supplied services.

To edit the phone number, update both its readable text and `tel:`/`sms:` URLs in `index.html`, plus the structured-data telephone value. To add a custom domain, configure it in GitHub Pages settings and add its `CNAME` file. Add canonical and absolute social image URLs after the final domain is known.

## Local preview

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit http://localhost:8000. The basic page and navigation also work without JavaScript.
