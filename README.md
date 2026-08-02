# Date Letter 💌

An animated web experience — tap an envelope, read a handwritten letter, ask her out.

## Quick start (no coding needed)

1. **Deploy** (see below) to get a link like `https://your-site.netlify.app`
2. **Share with Diya:** `https://your-site.netlify.app?v=diya`
3. **Get notified:** when she taps "Yes", you'll get an email at `officialpsmitan@gmail.com`

---

## Deploy for free (stays online)

**Easiest: Netlify Drop**

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this entire project folder onto the page
3. You get a free link instantly (e.g. `https://random-name.netlify.app`)
4. It stays hosted **for free** as long as you don't delete it

**Other free options:** Vercel, GitHub Pages — all free for a small static site like this.

| Question | Answer |
|----------|--------|
| Is it free? | Yes, on Netlify/Vercel/GitHub Pages |
| Does it stay online forever? | Yes, until you delete the site or the platform shuts down (unlikely) |
| Do I need to pay? | No |
| Do I need to keep my laptop on? | No — it runs on their servers |

---

## Multiple people (variants)

**Don't reuse one link and edit each time.** Instead, give each person their own link:

| Person | Link to share |
|--------|---------------|
| Diya | `yoursite.netlify.app?v=diya` |
| Someone new | `yoursite.netlify.app?v=sarah` |

### Adding a new person

1. Duplicate `variants/_template.js` → rename to `variants/sarah.js`
2. Edit her name, message, etc. in that file
3. Redeploy (drag folder to Netlify again, or it auto-deploys if connected to GitHub)
4. Share `yoursite.netlify.app?v=sarah`

Each person gets a unique link. Old links keep working with their own content.

---

## Email notifications

1. `notifyEmail` is set in each variant file (e.g. `variants/diya.js`)
2. FormSubmit sends a **one-time confirmation email** — click the link once
3. After that, every "Yes" tap emails you instantly

---

## Files

| File | What it does |
|------|-------------|
| `index.html` | The page |
| `styles.css` | Design & animations |
| `script.js` | Interactions |
| `variants/diya.js` | Diya's letter content |
| `variants/_template.js` | Copy this for new people |
| `config.js` | Fallback loader (don't edit) |

---

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080?v=diya`

Good luck. 🤞
