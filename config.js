/**
 * Loads the letter for the person in the URL (?v=diya).
 * Works with variants/diya.js OR diya.js at the project root.
 */
(function () {
  var variant = new URLSearchParams(location.search).get("v") || "diya";
  var paths = ["variants/" + variant + ".js", variant + ".js"];

  for (var i = 0; i < paths.length; i++) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", paths[i], false);
      xhr.send(null);
      if (xhr.status === 200) {
        (0, eval)(xhr.responseText);
        break;
      }
    } catch (e) {
      /* try next path */
    }
  }

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
})();

const INVITE_CONFIG = window.INVITE_CONFIG;
