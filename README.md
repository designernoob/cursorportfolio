# Date Invite 💌

A beautiful, animated web experience — an envelope that opens into a handwritten letter asking her out.

## Quick start

1. **Personalize** the letter in `config.js` (her name, your name, date idea, etc.)
2. **Open locally** — double-click `index.html`, or run a local server:
   ```bash
   python3 -m http.server 8080
   ```
   Then visit `http://localhost:8080`
3. **Deploy** to get a shareable link (see below)

## Customize the letter

Edit `config.js`:

```js
const INVITE_CONFIG = {
  herName: "Sarah",
  yourName: "Alex",
  suggestedDate: "Saturday evening",
  suggestedActivity: "coffee and a walk by the water",
  // Or write your own paragraphs:
  customParagraphs: [
    "Your opening line...",
    "Your ask...",
    "Your closing thought...",
  ],
};
```

## Deploy (free options)

| Platform | Steps |
|----------|-------|
| **Netlify Drop** | Drag the project folder onto [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel --yes` in this folder |
| **GitHub Pages** | Push to a repo → Settings → Pages → deploy from branch |

Share the URL in your Instagram DM.

## Features

- Envelope with wax seal — tap to open
- Smooth flap, letter slide, and unfold animations
- Floating particle background
- Fully responsive (mobile-first, landscape-safe)
- Respects `prefers-reduced-motion`
- Optional Yes / "Let me think" response buttons

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `styles.css` | Visual design & animations |
| `script.js` | Interactions & particles |
| `config.js` | **Edit this** to personalize |

Good luck. 🤞
