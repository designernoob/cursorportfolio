# Date Letter 💌

An animated web experience — tap an envelope, read a handwritten letter, ask her out.

---

## Deploy to Netlify (step by step)

You don't need to know code. This takes about 5 minutes.

### Step 1: Get the project files on your computer

**Option A — Download from GitHub (easiest)**

1. Open [github.com/designernoob/dateletter](https://github.com/designernoob/dateletter)
2. Click the green **Code** button
3. Click **Download ZIP**
4. Unzip the folder. You should see files like `index.html`, `styles.css`, a `variants` folder, etc.

**Option B — If you already have the folder from Cursor, use that.**

---

### Step 2: Create a free Netlify account

1. Go to [netlify.com](https://www.netlify.com)
2. Click **Sign up** (you can sign up with Google or GitHub — both are fine)
3. Verify your email if asked

---

### Step 3: Deploy the site

**Method 1 — Netlify Drop (fastest, no Git needed)**

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire **dateletter** project folder onto the page
3. Wait 10–20 seconds
4. Netlify gives you a link like `https://random-name-123.netlify.app`
5. Click the link to test it. Add `?v=diya` at the end:  
   `https://random-name-123.netlify.app?v=diya`

**Method 2 — Connect GitHub (auto-updates when you push changes)**

1. In Netlify dashboard, click **Add new site** → **Import an existing project**
2. Choose **GitHub** and authorize Netlify
3. Select the **dateletter** repository
4. Leave all settings as default, click **Deploy site**
5. Wait ~1 minute for deploy to finish

---

### Step 4: Customize your link (optional)

1. In Netlify dashboard, click your site
2. Go to **Domain settings** → **Options** → **Edit site name**
3. Change to something like `pranav-date-letter.netlify.app`
4. Your final link: `https://pranav-date-letter.netlify.app?v=diya`

---

### Step 5: Activate email notifications (one time)

1. Deploy the site first
2. Open your link and tap through to click **"I'd love to"** yourself (test)
3. Check `officialpsmitan@gmail.com` for an email from FormSubmit
4. Click the **confirmation link** in that email
5. Done — you'll now get emailed every time someone taps Yes

---

### Will it stay online? Is it free?

| Question | Answer |
|----------|--------|
| Free? | **Yes**, forever for a site this size |
| Stays online 24/7? | **Yes**, runs on Netlify's servers |
| Need your laptop on? | **No** |
| Need to pay? | **No** |

---

## Share with Diya

Send her this link in your Instagram DM:

```
https://your-site.netlify.app?v=diya
```

Replace `your-site.netlify.app` with your actual Netlify link.

---

## Adding a new person (simple steps)

Each person gets their **own link**. You never edit an old link.

### Example: you want to ask someone named Sarah

**Step 1:** Open the `variants` folder in your project

You'll see:
- `diya.js` — Diya's letter (already done)
- `_template.js` — blank copy to start from

**Step 2:** Copy `_template.js`

- **Mac:** Right-click `_template.js` → Duplicate → rename the copy to `sarah.js`
- **Windows:** Right-click → Copy → Paste → rename to `sarah.js`

**Step 3:** Open `sarah.js` in any text editor (Notepad, TextEdit, VS Code)

Change these lines:

```
herName: "Sarah",          ← her name
yourName: "Pranav",        ← your name
customParagraphs: [
  `Your message to Sarah...`,
  `Second paragraph...`,
  `Third paragraph...`,
],
```

Save the file.

**Step 4:** Redeploy to Netlify

- **If you used Netlify Drop:** drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop) again (same site updates automatically if you use the GitHub method instead)
- **If you connected GitHub:** push your changes and Netlify auto-deploys in ~1 minute

**Step 5:** Share the new link

```
https://your-site.netlify.app?v=sarah
```

The `?v=sarah` part must match the filename (`sarah.js` → `?v=sarah`).

---

## Quick reference

| Person | File | Link |
|--------|------|------|
| Diya | `variants/diya.js` | `yoursite.netlify.app?v=diya` |
| Sarah | `variants/sarah.js` | `yoursite.netlify.app?v=sarah` |
| Anyone new | copy `_template.js` | `yoursite.netlify.app?v=theirname` |

---

## Local preview

```bash
python3 -m http.server 8080
```

Open: `http://localhost:8080?v=diya`

Good luck. 🤞
