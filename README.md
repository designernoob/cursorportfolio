# Pranav — Portfolio

An award-style, single-page portfolio built to feel like the work showcased on
[Awwwards](https://www.awwwards.com/). Dark editorial theme, kinetic typography,
custom cursor, smooth inertial scrolling, a magnetic call-to-action, film-grain
texture, and cursor-following project previews.

> **You don't need to know how to code to update this site.**
> 99% of the time you'll only touch **one file**: `src/content.ts`.

---

## What's inside

| Section | What it shows |
| --- | --- |
| Preloader | A counting intro that wipes away to reveal the page |
| Hero | Your big statement headline + intro |
| Marquee | A scrolling ticker of your skills |
| Work | Interactive list of your projects with hover previews |
| About | Your story, stats, and capabilities |
| Kind Words | Testimonials |
| Contact | A giant "let's talk" call-to-action, socials, and a live clock |

---

## ✏️ How to edit your content (no coding)

Open **`src/content.ts`** in any text editor. Everything is labelled with plain-English
comments. Change the text between the `"quotes"` and keep the quotes, commas, and
brackets exactly where they are.

Examples of what you can change there:

- Your **name, role, email, location, and social links** (`site`)
- The big **hero headline** (wrap a word in `*asterisks*` to make it a fancy italic accent)
- Your **projects** — title, company, role, dates, description, and tags
- The **about** paragraphs, stats, and capabilities list
- The **testimonials**

### Change the accent colour

Open `src/index.css` and edit this one line near the top:

```css
--accent: #d8fd51; /* electric lime accent */
```

Swap in any colour you like (for example `#ff5b26` for orange). The whole site
re-skins automatically.

---

## ▶️ Running it on your computer

You'll need [Node.js](https://nodejs.org/) installed (version 18 or newer).

1. Open a terminal in this folder.
2. Install the tools (only needed once):

   ```bash
   npm install
   ```

3. Start the site in preview mode:

   ```bash
   npm run dev
   ```

4. Open the link it prints (usually `http://localhost:5173`) in your browser.
   The page updates automatically as you edit `src/content.ts`.

To create the final optimized version for the web:

```bash
npm run build
```

The finished site lands in the `dist/` folder.

---

## 🚀 Putting it online (free)

The easiest path — no command line required:

1. Push this project to a **GitHub** repository.
2. Go to [vercel.com](https://vercel.com) (or [netlify.com](https://www.netlify.com)) and sign in with GitHub.
3. Click **New Project**, pick this repository, and hit **Deploy**.
4. Vercel auto-detects Vite. If asked, use:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

You'll get a live URL in under a minute. Every time you push a change to GitHub,
your site updates itself.

---

## 🛠 Tech (for the curious)

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
- Fonts: Space Grotesk, Instrument Serif, Inter (via Google Fonts)

Accessibility: the site respects `prefers-reduced-motion` — animations and smooth
scrolling are toned down for visitors who ask their system for less motion.
