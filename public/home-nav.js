(() => {
  const script = document.currentScript || document.querySelector('script[src*="home-nav.js"]');
  const asset = (name) => script?.src ? new URL(name, script.src).href : name;
  const HOME_CASES_KEY = "conflow-open-case-selection";
  let scheduled = false;

  const goHome = () => {
    const homeUrl = `${window.location.origin}${window.location.pathname}`;
    window.location.assign(homeUrl);
  };

  const goCaseSelection = () => {
    sessionStorage.setItem(HOME_CASES_KEY, "1");
    goHome();
  };

  const addStyles = () => {
    if (document.getElementById("welcome-folder-adjustments")) return;
    const style = document.createElement("style");
    style.id = "welcome-folder-adjustments";
    style.textContent = `
      .welcomeHero{background:#102a2a!important;color:#fffaf1!important}
      .welcomeEyebrow{color:#73cfe2!important}
      .welcomeHero h1{color:#fffaf1!important}
      .welcomeHero h1 em{color:#e39a36!important}
      .welcomeIntro{color:#c8d6d2!important}
      .welcomePrimary{background:#126aa3!important;border-color:#126aa3!important;color:#fff!important}
      .welcomeSecondary{background:transparent!important;border-color:#fffaf1!important;color:#fffaf1!important}

      .welcomeAbout{background:#f4f0e7!important}
      .welcomeSectionLabel{color:#12766b!important}
      .welcomeSection h2{color:#102a2a!important}
      .welcomeSection p{color:#445b58!important}
      .welcomeQuote{background:#fffaf1!important;border-top-color:#e39a36!important}
      .welcomeQuote strong{color:#102a2a!important}
      .welcomeQuote p{color:#445b58!important}

      .welcomeAudience{background:#dce4dc!important}
      .audienceCard{background:#fffaf1!important;border-top-color:#126aa3!important}
      .audienceCard:nth-child(2){border-top-color:#12766b!important}
      .audienceCard:nth-child(3){border-top-color:#6d951b!important}
      .audienceCard:nth-child(4){border-top-color:#e39a36!important}
      .audienceCard strong{color:#102a2a!important}

      .welcomeSteps{background:#f4f0e7!important}
      .stepCard{background:#fffaf1!important}
      .stepCard:nth-child(1){background:#fffaf1!important;border-color:#126aa3!important}
      .stepCard:nth-child(2){background:#fffaf1!important;border-color:#6d951b!important}
      .stepCard:nth-child(3){background:#fffaf1!important;border-color:#e39a36!important}
      .stepNumber{color:#17345f!important}
      .stepCard h3{color:#102a2a!important}
      .stepCard p{color:#445b58!important}

      .welcomeVisual img{width:min(360px,82%)!important;background:#fffaf1!important;padding:16px!important;filter:none!important}

      .welcomeContact{padding:62px clamp(24px,7vw,110px);background:#fffaf1;color:#102a2a;border-top:1px solid #d7ddd6}
      .welcomeContactInner{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(260px,.65fr) minmax(420px,1.35fr);gap:60px;align-items:center}
      .welcomeContactLabel{font-size:10px;font-weight:900;letter-spacing:.16em;color:#12766b;text-transform:uppercase}
      .welcomeContact h2{font-family:Georgia,serif;font-size:clamp(32px,4vw,48px);line-height:1.05;font-weight:500;margin:10px 0 22px;color:#102a2a}
      .welcomeContactLinks{display:grid;gap:9px}
      .welcomeContactLinks a{color:#126aa3;text-decoration:none;font-size:15px;font-weight:700}
      .welcomeContactLinks a:hover{text-decoration:underline}
      .welcomeInstitutions{background:#fff;border:1px solid #d7ddd6;padding:22px;display:grid;place-items:center}
      .welcomeInstitutions img{display:block;width:100%;max-width:850px;height:auto}

      .welcomeCta{background:#102a2a!important;color:#fffaf1!important}
      .welcomeCta span{color:#73cfe2!important}
      .welcomeCta h2{color:#fffaf1!important}
      .welcomeCta button{background:#e39a36!important;color:#102a2a!important}

      @media(max-width:900px){.welcomeContactInner{grid-template-columns:1fr;gap:32px}}
      @media(max-width:520px){.welcomeContact{padding-block:48px}.welcomeVisual img{width:min(330px,88%)!important}.welcomeInstitutions{padding:12px}}
    `;
    document.head.appendChild(style);
  };

  const setImage = (img, src, alt) => {
    if (!(img instanceof HTMLImageElement)) return;
    if (img.src !== src) img.src = src;
    if (typeof alt === "string" && img.alt !== alt) img.alt = alt;
  };

  const enhanceWelcome = () => {
    addStyles();

    const logoUrl = asset("conflow-logo-hq.png");
    document.querySelectorAll(".brandLogo").forEach((img) => setImage(img, logoUrl));

    const welcomeHero = document.querySelector(".welcomeHero");
    if (!welcomeHero) {
      document.querySelector(".welcomeContact")?.remove();
      return;
    }

    setImage(document.querySelector(".welcomeVisual img"), logoUrl, "Conflow");

    const ctaTitle = document.querySelector(".welcomeCta h2");
    const desiredTitle = "Escolha um dos casos e construa o caminho.";
    if (ctaTitle && ctaTitle.textContent !== desiredTitle) ctaTitle.textContent = desiredTitle;

    const steps = document.querySelector(".welcomeSteps");
    const cta = document.querySelector(".welcomeCta");
    if (steps && cta && !document.querySelector(".welcomeContact")) {
      const section = document.createElement("section");
      section.className = "welcomeContact";
      section.innerHTML = `
        <div class="welcomeContactInner">
          <div>
            <span class="welcomeContactLabel">Contato</span>
            <h2>Mais informações</h2>
            <div class="welcomeContactLinks">
              <a href="mailto:secretaria@cepas.ufc.br">secretaria@cepas.ufc.br</a>
              <a href="mailto:ticiana@ufc.br">ticiana@ufc.br</a>
              <a href="mailto:leticia.freire@ifce.edu.br">leticia.freire@ifce.edu.br</a>
            </div>
          </div>
          <div class="welcomeInstitutions">
            <img src="${asset("instituicoes.png")}" alt="Universidade Federal do Ceará, CEPAS, COGERH e Cientista Chefe Recursos Hídricos" />
          </div>
        </div>`;
      cta.parentNode?.insertBefore(section, cta);
    }
  };

  const openCaseSelectionIfRequested = () => {
    if (sessionStorage.getItem(HOME_CASES_KEY) !== "1") return;
    const start = document.querySelector(".welcomePrimary");
    if (!(start instanceof HTMLButtonElement)) return;
    sessionStorage.removeItem(HOME_CASES_KEY);
    start.click();
  };

  const runEnhancements = () => {
    scheduled = false;
    enhanceWelcome();
    openCaseSelectionIfRequested();
  };

  const scheduleEnhancements = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(runEnhancements);
  };

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    const logo = target.closest(".brandLogo");
    if (logo) {
      event.preventDefault();
      event.stopPropagation();
      sessionStorage.removeItem(HOME_CASES_KEY);
      goHome();
      return;
    }

    const button = target.closest(".flowHead button");
    if (button && (button.textContent || "").trim() === "Reiniciar atividade") {
      event.preventDefault();
      event.stopPropagation();
      goCaseSelection();
    }
  }, true);

  const observer = new MutationObserver(scheduleEnhancements);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  scheduleEnhancements();
})();
