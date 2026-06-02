(function () {
  function loadSideDecor() {
    document.querySelectorAll(".side-decor img[data-src]").forEach(function (img) {
      img.src = img.getAttribute("data-src");
    });
  }

  function schedule() {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadSideDecor, { timeout: 3000 });
    } else {
      setTimeout(loadSideDecor, 1);
    }
  }

  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }
})();
