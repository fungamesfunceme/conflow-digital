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
      .welcomeHero{background:#17345f!important;color:#fffaf1!important;position:relative!important}
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
      .welcomeMapCard{position:relative;width:min(650px,100%);height:410px;border-radius:24px;overflow:hidden;background:linear-gradient(145deg,#1a3a69 0%,#14305a 100%);border:1px solid rgba(255,255,255,.28);box-shadow:0 20px 55px rgba(7,24,50,.24)}
      .welcomeMapCard:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 52% 49%,rgba(43,165,220,.10),transparent 36%);pointer-events:none}
      .welcomeMapSvg{position:absolute;inset:0;width:100%;height:100%;z-index:1}
      .welcomeMapLogo{position:absolute!important;z-index:4!important;left:50%!important;top:15%!important;transform:translateX(-50%)!important;width:min(205px,36%)!important;height:auto!important;background:transparent!important;padding:0!important;filter:none!important;object-fit:contain}
      .welcomeMapIcon{position:absolute;z-index:3;width:70px;height:70px;border:1px solid rgba(255,250,241,.55);border-radius:50%;display:grid;place-items:center;background:rgba(23,52,95,.55);backdrop-filter:blur(2px)}
      .welcomeMapIcon svg{width:30px;height:30px;fill:none;stroke:#fffaf1;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
      .welcomeMapIcon.drop{left:9%;top:44%}.welcomeMapIcon.scale{left:13%;bottom:10%}.welcomeMapIcon.people{right:9%;top:58%}

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
        .welcomeVisual{min-height:350px!important}.welcomeMapCard{height:350px}
        .welcomeMapLogo{width:min(190px,38%)!important;top:14%!important}
      }
      @media(max-width:520px){
        .welcomeContact{padding-block:48px}.welcomeInstitutions{padding:12px}
        .welcomeVisual{min-height:285px!important}.welcomeMapCard{height:285px;border-radius:18px}
        .welcomeMapLogo{width:min(150px,42%)!important;top:13%!important}
        .welcomeMapIcon{width:52px;height:52px}.welcomeMapIcon svg{width:23px;height:23px}
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
    if (!(visual instanceof HTMLElement) || visual.querySelector(".welcomeMapCard")) return;

    const oldRiver = visual.querySelector(".welcomeRiver");
    if (oldRiver) oldRiver.remove();

    const logo = visual.querySelector("img");
    const card = document.createElement("div");
    card.className = "welcomeMapCard";
    card.innerHTML = `
      <svg class="welcomeMapSvg" viewBox="0 0 650 410" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#126aa3"/><stop offset=".55" stop-color="#2ba5dc"/><stop offset="1" stop-color="#4ebfe8"/>
          </linearGradient>
        </defs>
        <g opacity=".20" fill="none" stroke="#79a6ce" stroke-width="1">
          <path d="M-20 110 C80 70 150 140 220 110 S365 55 455 110 S590 145 700 85"/>
          <path d="M-30 132 C70 92 145 162 225 130 S370 76 460 130 S600 165 705 108"/>
          <path d="M-25 290 C75 245 150 315 240 285 S390 235 475 288 S610 320 700 270"/>
          <path d="M-20 314 C80 270 155 340 245 308 S395 260 480 310 S615 344 700 295"/>
          <path d="M30 210 C115 175 180 215 245 190 S360 150 430 182 S560 235 635 195"/>
        </g>
        <path d="M560 92 C520 128 532 164 485 190 C438 216 430 245 390 256 C349 267 319 246 293 267 C267 288 272 316 239 344" fill="none" stroke="#0d5f9e" stroke-width="34" stroke-linecap="round" opacity=".45"/>
        <path d="M560 92 C520 128 532 164 485 190 C438 216 430 245 390 256 C349 267 319 246 293 267 C267 288 272 316 239 344" fill="none" stroke="url(#riverGradient)" stroke-width="18" stroke-linecap="round" opacity=".95"/>
        <path d="M103 204 C175 212 204 247 260 252 C318 257 331 219 390 220 C447 221 476 258 538 260" fill="none" stroke="#e39a36" stroke-width="2" stroke-dasharray="6 7" opacity=".9"/>
        <path d="M130 318 C197 277 243 299 288 271 C337 240 377 245 419 220 C469 190 506 181 553 171" fill="none" stroke="#43bde4" stroke-width="2" stroke-dasharray="5 7" opacity=".9"/>
        <g fill="#e39a36"><circle cx="205" cy="235" r="4"/><circle cx="390" cy="220" r="4"/><circle cx="470" cy="250" r="4"/></g>
        <g fill="#43bde4"><circle cx="288" cy="271" r="4"/><circle cx="419" cy="220" r="4"/><circle cx="505" cy="181" r="4"/></g>
      </svg>
      <div class="welcomeMapIcon drop" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M16 3C12 9 8 13 8 19a8 8 0 0 0 16 0c0-6-4-10-8-16Z"/><path d="M12 21a4 4 0 0 0 4 3"/></svg></div>
      <div class="welcomeMapIcon scale" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M16 4v23M8 8h16M6 10l-4 8h8l-4-8Zm20 0-4 8h8l-4-8ZM10 27h12"/></svg></div>
      <div class="welcomeMapIcon people" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="16" cy="10" r="4"/><circle cx="7" cy="13" r="3"/><circle cx="25" cy="13" r="3"/><path d="M9 27c0-5 3-8 7-8s7 3 7 8M2 27c0-4 2-7 5-7 2 0 3 .5 4 1.5M30 27c0-4-2-7-5-7-2 0-3 .5-4 1.5"/></svg></div>`;

    if (logo instanceof HTMLImageElement) {
      logo.classList.add("welcomeMapLogo");
      card.appendChild(logo);
    }
    visual.appendChild(card);
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
