(() => {
  const answerKeys = {
    1: {
      sphere: "A",
      steps: [
        { code: "7 A", text: "Governança da água", answer: "SIM" },
      ],
      final: { code: "7.1 F-A", text: "Articulação institucional" },
    },
    2: {
      sphere: "A",
      steps: [
        { code: "4 A", text: "Furto de água", answer: "SIM" },
        { code: "4.1 A", text: "A retirada está ocorrendo em canais, lagos ou reservatórios?", answer: "SIM" },
        { code: "4.2 A", text: "A vazão retirada está de acordo com a outorga e o acordo de alocação?", answer: "NÃO" },
      ],
      final: { code: "4.2 F-A", text: "Captação em canal, lago ou reservatório" },
    },
    3: {
      sphere: "A",
      steps: [
        { code: "4 A", text: "Furto de água", answer: "SIM" },
        { code: "4.1 A", text: "A retirada está ocorrendo em canais, lagos ou reservatórios?", answer: "NÃO" },
        { code: "4.3 A", text: "A retirada está ocorrendo em uma adutora?", answer: "SIM" },
      ],
      final: { code: "4.3 F-A", text: "Retirada em adutora" },
    },
    4: {
      sphere: "A",
      steps: [
        { code: "6 A", text: "Partição e alocação de águas", answer: "NÃO" },
        { code: "6.1 A", text: "Águas de um reservatório da bacia estão sendo transferidas para outra bacia?", answer: "SIM" },
      ],
      final: { code: "6.1 F-A", text: "Transferência ou impacto entre bacias" },
    },
    5: {
      sphere: "A",
      steps: [
        { code: "6 A", text: "Partição e alocação de águas", answer: "SIM" },
      ],
      final: { code: "6 F-A", text: "Prioridade de uso" },
    },
    6: {
      sphere: "A",
      steps: [
        { code: "6 A", text: "Partição e alocação de águas", answer: "SIM" },
      ],
      final: { code: "6 F-A", text: "Prioridade de uso" },
    },
    7: {
      sphere: "A",
      steps: [
        { code: "6 A", text: "Partição e alocação de águas", answer: "SIM" },
      ],
      final: { code: "6 F-A", text: "Prioridade de uso" },
    },
    8: {
      sphere: "B",
      steps: [
        { code: "1 B", text: "Lançamento de efluentes", answer: "NÃO" },
        { code: "1.1 B", text: "O lançamento ocorre diretamente em rio ou riacho?", answer: "SIM" },
        { code: "1.2 B", text: "O lançamento está regularizado quanto à outorga?", answer: "SIM" },
        { code: "1.3 B", text: "A atividade é passível de licença ambiental?", answer: "SIM" },
        { code: "1.4 B", text: "A atividade é de competência da União?", answer: "NÃO" },
        { code: "1.5 B", text: "A atividade produz impacto regional dentro do mesmo estado?", answer: "SIM" },
      ],
      final: { code: "1.5 F-B", text: "Competência estadual" },
    },
    9: {
      sphere: "B",
      steps: [
        { code: "1 B", text: "Lançamento de efluentes", answer: "NÃO" },
        { code: "1.1 B", text: "O lançamento ocorre diretamente em rio ou riacho?", answer: "SIM" },
        { code: "1.2 B", text: "O lançamento está regularizado quanto à outorga?", answer: "NÃO" },
      ],
      final: { code: "1.2 F-B", text: "Lançamento sem outorga" },
    },
    10: {
      sphere: "B",
      steps: [
        { code: "4 B", text: "Questões agropecuárias", answer: "SIM" },
        { code: "4.1 B", text: "A criação de animais está em margem de nascente, rio ou reservatório?", answer: "SIM" },
      ],
      final: { code: "4.1 F-B", text: "Criação de animais em margens" },
    },
    11: {
      sphere: "B",
      steps: [
        { code: "2 B", text: "Descarte de resíduos sólidos", answer: "SIM" },
      ],
      final: { code: "2 F-B", text: "Resíduos em corpo hídrico" },
    },
    12: {
      sphere: "B",
      steps: [
        { code: "5 B", text: "Desmatamento", answer: "SIM" },
      ],
      final: { code: "5 F-B", text: "Desmatamento em margem protegida" },
    },
  };

  const normalize = (value) => (value || "").replace(/\s+/g, " ").trim();

  const getUserFlow = () => {
    const capture = document.querySelector(".flowCapture");
    if (!capture) return null;
    const nodes = [...capture.querySelectorAll(".flowNode")];
    if (nodes.length < 4) return null;

    const caseText = normalize(nodes[0].querySelector("span")?.textContent);
    const caseId = Number((caseText.match(/\d+/) || [])[0]);
    const sphere = normalize(nodes[1].querySelector("span")?.textContent);
    const endNode = nodes.find((node) => node.classList.contains("endNode"));
    if (!caseId || !sphere || !endNode) return null;

    const endIndex = nodes.indexOf(endNode);
    const stepNodes = nodes.slice(2, endIndex);
    const stepCodes = stepNodes.map((node) => normalize(node.querySelector("span")?.textContent));
    const finalCode = normalize(endNode.querySelector("span")?.textContent);
    const answers = [...capture.querySelectorAll(".connector span")]
      .map((el) => normalize(el.textContent))
      .filter((text) => text === "SIM" || text === "NÃO");

    return { caseId, sphere, stepCodes, answers, finalCode };
  };

  const sameArray = (a, b) => a.length === b.length && a.every((value, index) => value === b[index]);

  const isCorrectFlow = (user, key) => {
    if (!user || !key) return false;
    return user.sphere === key.sphere
      && sameArray(user.stepCodes, key.steps.map((step) => step.code))
      && sameArray(user.answers, key.steps.map((step) => step.answer))
      && user.finalCode === key.final.code;
  };

  const connector = (label) => `
    <div class="gabaritoConnector">
      <i></i><span>${label}</span><b>↓</b>
    </div>`;

  const node = (code, text, className = "") => `
    <div class="gabaritoNode ${className}">
      <span>${code}</span><strong>${text}</strong>
    </div>`;

  const renderKey = (caseId, key) => {
    const currentCaseTitle = normalize(document.querySelector(".flowCapture .caseNode strong")?.textContent) || `Caso ${caseId}`;
    const sphereText = key.sphere === "A" ? "Gestão hídrica" : "Gestão ambiental";

    let flowHtml = node(`CASO ${caseId}`, currentCaseTitle, "case");
    flowHtml += connector("ESFERA");
    flowHtml += node(key.sphere, sphereText);

    key.steps.forEach((step, index) => {
      flowHtml += connector(index === 0 ? "MOTIVO" : key.steps[index - 1].answer);
      flowHtml += node(step.code, step.text);
    });

    flowHtml += connector(key.steps[key.steps.length - 1].answer);
    flowHtml += node(key.final.code, key.final.text, "final");

    return `
      <aside class="gabaritoPanel" aria-label="Gabarito do caso">
        <div class="gabaritoColumnTitle"><span>GABARITO</span><strong>Fluxo correto</strong></div>
        <div class="gabaritoFlow">${flowHtml}</div>
      </aside>`;
  };

  const renderStatus = (correct) => `
    <div class="comparisonStatus ${correct ? "correct" : "different"}" aria-live="polite">
      <span>${correct ? "✓ PERCURSO CORRETO" : "✕ PERCURSO DIFERENTE DO GABARITO"}</span>
      <strong>${correct ? "Seu fluxo coincide com a resposta de referência." : "Compare seu percurso em vermelho com o fluxo correto ao lado."}</strong>
    </div>`;

  const clearComparison = () => {
    const section = document.querySelector(".flowSection");
    const capture = document.querySelector(".flowCapture");
    section?.classList.remove("comparisonVisible");
    capture?.classList.remove("flowIncorrect", "flowCorrect");
    section?.querySelector(".gabaritoPanel")?.remove();
    section?.querySelector(".comparisonStatus")?.remove();
  };

  const revealAnswer = () => {
    const user = getUserFlow();
    if (!user) return;
    const key = answerKeys[user.caseId];
    if (!key) return;

    const section = document.querySelector(".flowSection");
    const capture = document.querySelector(".flowCapture");
    if (!section || !capture) return;

    const correct = isCorrectFlow(user, key);
    clearComparison();

    section.classList.add("comparisonVisible");
    capture.classList.add(correct ? "flowCorrect" : "flowIncorrect");

    const statusWrap = document.createElement("div");
    statusWrap.innerHTML = renderStatus(correct);
    const status = statusWrap.firstElementChild;

    const keyWrap = document.createElement("div");
    keyWrap.innerHTML = renderKey(user.caseId, key);
    const panel = keyWrap.firstElementChild;

    section.insertBefore(status, capture);
    section.appendChild(panel);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const enhanceCompletion = () => {
    [...document.querySelectorAll(".completion")].forEach((completion) => {
      const label = normalize(completion.querySelector(".stepLabel")?.textContent);
      const supportsCheck = label === "PERCURSO CONCLUÍDO" || label === "FIM DESTE CAMINHO";
      if (!supportsCheck || completion.dataset.gabaritoReady === "true") return;
      const actions = completion.querySelector(".completionActions");
      if (!actions) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "checkAnswerKey";
      button.textContent = "Verificar fluxo correto";
      button.addEventListener("click", revealAnswer);

      actions.insertBefore(button, actions.lastElementChild || null);
      completion.dataset.gabaritoReady = "true";
    });
  };

  const style = document.createElement("style");
  style.textContent = `
    .checkAnswerKey{background:#2f72d6!important;color:#fff!important;border-color:#2f72d6!important}

    .flowSection.comparisonVisible{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:34px;align-items:start}
    .flowSection.comparisonVisible .flowHead{grid-column:1/-1;width:100%;max-width:none}
    .flowSection.comparisonVisible .comparisonStatus{grid-column:1/-1}
    .flowSection.comparisonVisible .flowCapture{grid-column:1;min-width:0}
    .flowSection.comparisonVisible .gabaritoPanel{grid-column:2;min-width:0}
    .flowSection.comparisonVisible .flowCapture:before{content:"SEU PERCURSO";display:block;max-width:760px;margin:18px auto 0;font-size:10px;font-weight:900;letter-spacing:.14em;color:#17345f}

    .comparisonStatus{margin:24px 0 4px;padding:18px 22px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:20px;border-left:5px solid}
    .comparisonStatus.correct{border-color:#6d951b}
    .comparisonStatus.different{border-color:#c84827}
    .comparisonStatus span{font-size:10px;font-weight:900;letter-spacing:.12em}
    .comparisonStatus.correct span{color:#557a18}
    .comparisonStatus.different span{color:#b33b25}
    .comparisonStatus strong{font-family:Georgia,serif;font-size:17px;text-align:right}

    .gabaritoPanel{margin-top:18px;padding:0;background:transparent}
    .gabaritoColumnTitle{max-width:760px;margin:0 auto 14px;display:flex;align-items:baseline;justify-content:space-between;gap:14px}
    .gabaritoColumnTitle span{font-size:10px;font-weight:900;letter-spacing:.14em;color:#2f72d6}
    .gabaritoColumnTitle strong{font-family:Georgia,serif;font-size:21px;color:#17345f}
    .gabaritoFlow{max-width:760px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch}
    .gabaritoNode{background:#fff;border-top:4px solid #2f72d6;min-height:120px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;color:#17345f}
    .gabaritoNode.case{background:#17345f;color:#fff;border-color:#ffa43a}
    .gabaritoNode.final{background:#fff0cf;border-color:#ffa43a}
    .gabaritoNode span{font-size:11px;font-weight:900;letter-spacing:.08em}
    .gabaritoNode strong{font-family:Georgia,serif;font-size:17px;line-height:1.18;margin-top:22px}
    .gabaritoConnector{height:64px;position:relative;display:grid;place-items:center;color:#17345f}
    .gabaritoConnector i{position:absolute;width:1px;top:8px;bottom:8px;background:#78928a}
    .gabaritoConnector span{z-index:1;background:#eaf3f5;padding:4px 7px;font-size:9px;font-weight:900;letter-spacing:.1em}
    .gabaritoConnector b{position:absolute;bottom:3px;font-size:12px;color:#78928a}

    .flowCapture.flowIncorrect .flowNode{border-top-color:#c84827!important;background:#fff0ed!important;color:#8e2f25!important}
    .flowCapture.flowIncorrect .flowNode.caseNode{background:#9e382b!important;color:#fff!important;border-top-color:#c84827!important}
    .flowCapture.flowIncorrect .flowNode.endNode{background:#ffdcd5!important;color:#8e2f25!important;border-top-color:#c84827!important}
    .flowCapture.flowIncorrect .connector i{background:#c84827!important}
    .flowCapture.flowIncorrect .connector i:after{border-top-color:#c84827!important}
    .flowCapture.flowIncorrect .connector span{color:#9e382b!important;font-weight:900!important}

    .flowCapture.flowCorrect .flowNode{border-top-color:#6d951b!important;background:#f4f9e9!important;color:#355213!important}
    .flowCapture.flowCorrect .flowNode.caseNode{background:#557a18!important;color:#fff!important;border-top-color:#6d951b!important}
    .flowCapture.flowCorrect .flowNode.endNode{background:#e8f2cf!important;color:#355213!important;border-top-color:#6d951b!important}
    .flowCapture.flowCorrect .connector i{background:#6d951b!important}
    .flowCapture.flowCorrect .connector i:after{border-top-color:#6d951b!important}
    .flowCapture.flowCorrect .connector span{color:#557a18!important;font-weight:900!important}

    @media(max-width:950px){
      .flowSection.comparisonVisible{grid-template-columns:1fr;row-gap:26px}
      .flowSection.comparisonVisible .flowHead,.flowSection.comparisonVisible .comparisonStatus,.flowSection.comparisonVisible .flowCapture,.flowSection.comparisonVisible .gabaritoPanel{grid-column:1}
      .comparisonStatus{align-items:flex-start;flex-direction:column}
      .comparisonStatus strong{text-align:left}
      .gabaritoPanel{padding-top:8px;border-top:1px solid #cbd9dc}
    }
    @media(max-width:520px){
      .gabaritoNode{min-height:100px}.gabaritoNode strong{font-size:16px}
      .gabaritoColumnTitle{align-items:flex-start;flex-direction:column;gap:5px}
    }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => {
    enhanceCompletion();
    if (!document.querySelector(".completion .stepLabel")) clearComparison();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  enhanceCompletion();
})();