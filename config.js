/**
 * Fallback config — used if a variant file fails to load.
 * Each person gets their own file in variants/ (see variants/_template.js).
 */
if (typeof window.INVITE_CONFIG === "undefined") {
  window.INVITE_CONFIG = {
    herName: "there",
    yourName: "Pranav",
    notifyEmail: "officialpsmitan@gmail.com",
    notifyOnThink: false,
    customParagraphs: null,
    yesButton: "I'd love to",
    thinkButton: "Let me think about it",
    yesResponse: {
      title: "You just made my day",
      text: "I'll reach out soon to figure out the details. Can't wait.",
    },
    thinkResponse: {
      title: "No pressure at all",
      text: "Take your time. The offer stands whenever you're ready.",
    },
  };
}

const INVITE_CONFIG = window.INVITE_CONFIG;
