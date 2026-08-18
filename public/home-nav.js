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
      .welcomeHero{background:#17345f!important;color:#fffaf1!important;position:relative!important;overflow:hidden!important}
      .welcomeHero:before,.welcomeHero:after{content:"";position:absolute;pointer-events:none;border-radius:50%;border-top:3px solid;opacity:.8}
      .welcomeHero:before{width:58vw;height:210px;right:-9vw;top:105px;border-color:#e39a36;transform:rotate(-7deg)}
      .welcomeHero:after{width:62vw;height:240px;right:-12vw;top:195px;border-color:#2ba5dc;transform:rotate(-6deg)}
      .welcomeHeroCopy{position:relative;z-index:2}
      .welcomeEyebrow{color:#43bde4!important}
      .welcomeHero h1{color:#fffaf1!important}
      .welcomeHero h1 em{color:#e39a36!important}
      .welcomeIntro{color:#edf3f8!important}
      .welcomePrimary{background:#126aa3!important;border-color:#126aa3!important;color:#fff!important}
      .welcomePrimary:hover{filter:brightness(1.08)}
      .welcomeSecondary{background:transparent!important;border-color:#fffaf1!important;color:#fffaf1!important}

      .welcomeVisual{position:relative!important;min-height:430px!important;display:grid!important;place-items:center!important;z-index:3}
      .welcomeVisual>.welcomeRiver{display:none!important}
      .welcomePanelArt{position:relative;width:min(650px,100%);overflow:hidden;border-radius:24px;background:#17345f;border:1px solid rgba(255,255,255,.24);box-shadow:0 20px 55px rgba(7,24,50,.24)}
      .welcomePanelImage{display:block;width:100%;height:auto;aspect-ratio:506/340;object-fit:contain;background:#17345f}

      .welcomeAbout{background:#f4f0e7!important}
      .welcomeSectionLabel{color:#126aa3!important}
      .welcomeSection h2{color:#17345f!important}
      .welcomeSection p{color:#334b6c!important}
      .welcomeQuote{background:#fffaf1!important;border-top-color:#e39a36!important}
      .welcomeQuote strong{color:#17345f!important}
      .welcomeQuote p{color:#334b6c!important}

      .welcomeAudience{background:#e8eef5!important}
      .audienceCard{background:#fffaf1!important;border-top-color:#126aa3!important}
      .audienceCard:nth-child(2){border-top-color:#2ba5dc!important}
      .audienceCard:nth-child(3){border-top-color:#17345f!important}
      .audienceCard:nth-child(4){border-top-color:#e39a36!important}
      .audienceCard strong{color:#17345f!important}

      .welcomeSteps{background:#f4f0e7!important}
      .stepCard{background:#fffaf1!important}
      .stepCard:nth-child(1){background:#fffaf1!important;border-color:#126aa3!important}
      .stepCard:nth-child(2){background:#fffaf1!important;border-color:#2ba5dc!important}
      .stepCard:nth-child(3){background:#fffaf1!important;border-color:#e39a36!important}
      .stepNumber{color:#17345f!important}
      .stepCard h3{color:#17345f!important}
      .stepCard p{color:#334b6c!important}

      .welcomeContact{padding:62px clamp(24px,7vw,110px);background:#fffaf1;color:#17345f;border-top:1px solid #d7ddd6}
      .welcomeContactInner{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(260px,.65fr) minmax(420px,1.35fr);gap:60px;align-items:center}
      .welcomeContactLabel{font-size:10px;font-weight:900;letter-spacing:.16em;color:#126aa3;text-transform:uppercase}
      .welcomeContact h2{font-family:Georgia,serif;font-size:clamp(32px,4vw,48px);line-height:1.05;font-weight:500;margin:10px 0 22px;color:#17345f}
      .welcomeContactLinks{display:grid;gap:9px}
      .welcomeContactLinks a{color:#126aa3;text-decoration:none;font-size:15px;font-weight:700}
      .welcomeContactLinks a:hover{text-decoration:underline}
      .welcomeInstitutions{background:#fff;border:1px solid #d7ddd6;padding:22px;display:grid;place-items:center}
      .welcomeInstitutions img{display:block;width:100%;max-width:850px;height:auto}

      .welcomeCta{background:#17345f!important;color:#fffaf1!important}
      .welcomeCta span{color:#43bde4!important}
      .welcomeCta h2{color:#fffaf1!important}
      .welcomeCta button{background:#e39a36!important;color:#17345f!important}

      @media(max-width:900px){
        .welcomeContactInner{grid-template-columns:1fr;gap:32px}
        .welcomeVisual{min-height:350px!important}
        .welcomePanelArt{width:min(620px,100%)}
      }
      @media(max-width:520px){
        .welcomeContact{padding-block:48px}
        .welcomeInstitutions{padding:12px}
        .welcomeVisual{min-height:285px!important}
        .welcomePanelArt{border-radius:18px}
      }
    `;
    document.head.appendChild(style);
  };

  const setImage = (img, src, alt) => {
    if (!(img instanceof HTMLImageElement)) return;
    if (img.src !== src) img.src = src;
    if (typeof alt === "string" && img.alt !== alt) img.alt = alt;
  };

  const buildWelcomeVisual = () => {
    const visual = document.querySelector(".welcomeVisual");
    if (!(visual instanceof HTMLElement)) return;
    if (visual.querySelector(".welcomePanelImage")) return;

    visual.innerHTML = "";
    const panel = document.createElement("div");
    panel.className = "welcomePanelArt";

    const image = document.createElement("img");
    image.className = "welcomePanelImage";
    image.src = asset("painel-hero-conflow.webp");
    image.alt = "Painel visual do Conflow com logo, rio e ícones";

    panel.appendChild(image);
    visual.appendChild(panel);
  };

  const ensureContactSection = () => {
    const steps = document.querySelector(".welcomeSteps");
    const cta = document.querySelector(".welcomeCta");
    if (!steps || !cta || document.querySelector(".welcomeContact")) return;

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

    buildWelcomeVisual();

    const quoteTitle = document.querySelector(".welcomeQuote strong");
    const desiredQuoteTitle = "Compare o conflito a um rio.";
    if (quoteTitle && quoteTitle.textContent !== desiredQuoteTitle) quoteTitle.textContent = desiredQuoteTitle;

    const quoteText = document.querySelector(".welcomeQuote p");
    const desiredQuoteText = "A água, quando corre livre e abundante, nutre tudo o que toca — ecossistemas, comunidades, economias inteiras florescem em suas margens. Mas a água de um rio não fica parada. O mesmo acontece com o conflito por água: quando as tensões hídricas se acumulam sem canais de diálogo, sem mecanismos de negociação, sem vazões de cooperação, elas não desaparecem. E assim como uma barragem que nunca abre suas comportas, a pressão só cresce. O conflito que não é mediado, transborda. A única diferença é que, enquanto a água segue apenas as leis da gravidade, o conflito pode encontrar leitos alternativos: comitês de bacia, acordos internacionais, governança participativa. Há diferentes caminhos para a gestão de conflitos de água e o Conflow te ajuda a conhecê-los.";
    if (quoteText && quoteText.textContent !== desiredQuoteText) quoteText.textContent = desiredQuoteText;

    const ctaTitle = document.querySelector(".welcomeCta h2");
    const desiredTitle = "Escolha um dos casos e construa o caminho.";
    if (ctaTitle && ctaTitle.textContent !== desiredTitle) ctaTitle.textContent = desiredTitle;

    ensureContactSection();
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
