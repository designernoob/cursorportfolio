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
  herName: "Diya",
  yourName: "Pranav",
  notifyEmail: "you@gmail.com",  // ← get emailed when she taps Yes
  customParagraphs: [ "..." ],
};
```

### Get notified when she taps Yes

Right now the buttons only show a message on *her* screen — you won't know unless you add your email:

1. Set `notifyEmail` in `config.js` to your email address
2. Deploy the site
3. **Important:** FormSubmit sends a one-time confirmation email the first time someone submits — click the link in it to activate
4. After that, every time she taps **"I'd love to"**, you get an email instantly

Set `notifyOnThink: true` if you also want a heads-up when she picks "Let me think about it".

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
