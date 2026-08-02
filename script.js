(function () {
  "use strict";

  const config = typeof INVITE_CONFIG !== "undefined" ? INVITE_CONFIG : {};

  const envelopeBtn = document.getElementById("envelopeBtn");
  const envelope = document.getElementById("envelope");
  const envelopeScene = document.getElementById("envelopeScene");
  const letterScene = document.getElementById("letterScene");
  const letterActions = document.getElementById("letterActions");
  const btnYes = document.getElementById("btnYes");
  const btnThink = document.getElementById("btnThink");
  const responseYes = document.getElementById("responseYes");
  const responseThink = document.getElementById("responseThink");

  let isOpening = false;
  let isOpen = false;

  /* ---- Populate letter content ---- */

  function formatDate() {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function buildParagraphs() {
    if (config.customParagraphs && config.customParagraphs.length) {
      return config.customParagraphs;
    }

    const herName = config.herName || "there";
    const activity = config.suggestedActivity || "dinner";
    const dateLine = config.suggestedDate
      ? `How does <em>${config.suggestedDate}</em> sound?`
      : "I'm flexible on timing — whatever works best for you.";

    return [
      `I came across your profile and something about the way you carry yourself really stood out to me. I couldn't shake the feeling that I'd regret not reaching out.`,
      `I'd love to take you out — maybe ${activity}? No pressure, no weird vibes — just a chance to get to know each other over something simple and fun.`,
      dateLine,
      `Either way, I hope this made you smile. You seem like someone worth knowing.`,
    ];
  }

  function populateLetter() {
    const herName = config.herName || "there";
    const yourName = config.yourName || "";

    document.getElementById("letterDate").textContent = formatDate();
    document.getElementById("letterGreeting").textContent =
      herName === "there" ? "Hey," : `Hey ${herName},`;

    const bodyEl = document.getElementById("letterBody");
    bodyEl.innerHTML = buildParagraphs()
      .map((p) => `<p>${p}</p>`)
      .join("");

    document.getElementById("letterSignoff").textContent = "Hope to hear from you,";
    document.getElementById("letterSignature").textContent = yourName;

    if (config.yesButton) {
      btnYes.querySelector("span:first-child").textContent = config.yesButton;
    }
    if (config.thinkButton) {
      btnThink.querySelector("span").textContent = config.thinkButton;
    }
    if (config.yesResponse) {
      responseYes.querySelector(".response-title").textContent =
        config.yesResponse.title;
      responseYes.querySelector(".response-text").textContent =
        config.yesResponse.text;
    }
    if (config.thinkResponse) {
      responseThink.querySelector(".response-title").textContent =
        config.thinkResponse.title;
      responseThink.querySelector(".response-text").textContent =
        config.thinkResponse.text;
    }
  }

  /* ---- Envelope open sequence ---- */

  function openEnvelope() {
    if (isOpening || isOpen) return;
    isOpening = true;

    envelopeScene.classList.add("opening");
    envelope.classList.add("opening");
    envelopeBtn.disabled = true;

    populateLetter();

    // Staged opening: seal break → flap → letter rises → transition
    setTimeout(() => envelope.classList.add("seal-breaking"), 80);
    setTimeout(() => envelope.classList.add("flap-open"), 450);
    setTimeout(() => envelope.classList.add("letter-rising"), 900);

    setTimeout(() => {
      envelopeScene.classList.add("fade-out");
    }, 1800);

    setTimeout(() => {
      envelopeScene.classList.add("hidden");
      letterScene.classList.remove("hidden");
      void letterScene.offsetWidth;
      letterScene.classList.add("visible");
      isOpening = false;
      isOpen = true;
    }, 2600);
  }

  envelopeBtn.addEventListener("click", openEnvelope);

  /* ---- Response buttons ---- */

  async function notifyYou(response) {
    const email = config.notifyEmail;
    if (!email) return;

    const herName = config.herName || "She";
    const subject =
      response === "yes"
        ? `${herName} said yes! 🎉`
        : `${herName} wants to think about it`;

    try {
      await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: subject,
          Response: response === "yes" ? "Yes — she'd love to!" : "Maybe later",
          From: herName,
          Time: new Date().toLocaleString(),
          _template: "table",
          _captcha: "false",
        }),
      });
    } catch {
      // Fail silently — don't break her experience if notification fails
    }
  }

  function showResponse(responseEl, celebrate) {
    letterActions.classList.add("hidden");
    responseEl.classList.remove("hidden");
    if (celebrate) spawnCelebration();
  }

  btnYes.addEventListener("click", () => {
    notifyYou("yes");
    showResponse(responseYes, true);
  });

  btnThink.addEventListener("click", () => {
    if (config.notifyOnThink) notifyYou("think");
    showResponse(responseThink, false);
  });

  /* ---- Celebration particles ---- */

  function spawnCelebration() {
    const colors = ["#e8b4bc", "#c9a962", "#faf6f0", "#a83248"];
    for (let i = 0; i < 24; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 100;
          left: ${40 + Math.random() * 20}%;
          top: ${30 + Math.random() * 20}%;
          width: ${6 + Math.random() * 8}px;
          height: ${6 + Math.random() * 8}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
          opacity: 1;
          transform: translate(0, 0) rotate(0deg);
          transition: none;
        `;
        document.body.appendChild(el);

        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 120;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - 60;

        requestAnimationFrame(() => {
          el.style.transition =
            "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease";
          el.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)`;
          el.style.opacity = "0";
        });

        setTimeout(() => el.remove(), 1300);
      }, i * 40);
    }
  }

  /* ---- Ambient floating particles ---- */

  function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;
    let width = 0;
    let height = 0;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
      };
    }

    function init() {
      resize();
      const count = Math.min(60, Math.floor((width * height) / 15000));
      particles = Array.from({ length: count }, createParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.twinkle += 0.02;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.twinkle));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 180, 188, ${alpha})`;
        ctx.fill();

        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    init();
    draw();

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    return () => cancelAnimationFrame(animationId);
  }

  initParticles();
})();
