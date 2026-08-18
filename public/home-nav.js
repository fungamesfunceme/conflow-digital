(() => {
  const goHome = () => {
    const homeUrl = `${window.location.origin}${window.location.pathname}`;
    window.location.assign(homeUrl);
  };

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const logo = target.closest(".brandLogo");
    if (logo) {
      event.preventDefault();
      event.stopPropagation();
      goHome();
      return;
    }

    const button = target.closest(".flowHead button");
    if (button && (button.textContent || "").trim() === "Reiniciar atividade") {
      event.preventDefault();
      event.stopPropagation();
      goHome();
    }
  }, true);
})();
