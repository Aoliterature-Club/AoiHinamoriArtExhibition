if (window.location.hash) {
  window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
}

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
