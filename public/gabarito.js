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

  const renderKey = (caseId, key, correct) => {
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
      <section class="gabaritoPanel" aria-live="polite">
        <div class="gabaritoStatus ${correct ? "correct" : "different"}">
          <span>${correct ? "✓ PERCURSO CORRETO" : "GABARITO DO CASO"}</span>
          <h3>${correct ? "Seu percurso coincide com o gabarito." : "Seu percurso é diferente do fluxo de referência."}</h3>
          <p>${correct ? "A sequência de decisões e o direcionamento final estão de acordo com a resposta de referência." : "Compare abaixo o percurso realizado com o fluxo correto deste caso."}</p>
        </div>
        <div class="gabaritoTitle">FLUXO CORRETO</div>
        <div class="gabaritoFlow">${flowHtml}</div>
      </section>`;
  };

  const revealAnswer = (completion) => {
    const user = getUserFlow();
    if (!user) return;
    const key = answerKeys[user.caseId];
    if (!key) return;
    completion.querySelector(".gabaritoPanel")?.remove();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = renderKey(user.caseId, key, isCorrectFlow(user, key));
    completion.appendChild(wrapper.firstElementChild);
    completion.querySelector(".gabaritoPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const enhanceCompletion = () => {
    [...document.querySelectorAll(".completion")].forEach((completion) => {
      const label = normalize(completion.querySelector(".stepLabel")?.textContent);
      if (label !== "PERCURSO CONCLUÍDO" || completion.dataset.gabaritoReady === "true") return;
      const actions = completion.querySelector(".completionActions");
      if (!actions) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "checkAnswerKey";
      button.textContent = "Verificar fluxo correto";
      button.addEventListener("click", () => revealAnswer(completion));

      actions.insertBefore(button, actions.lastElementChild || null);
      completion.dataset.gabaritoReady = "true";
    });
  };

  const style = document.createElement("style");
  style.textContent = `
    .checkAnswerKey{background:#2f72d6!important;color:#fff!important;border-color:#2f72d6!important}
    .gabaritoPanel{margin-top:28px;padding:26px;background:#eaf3f5;border-top:5px solid #2f72d6}
    .gabaritoStatus{max-width:760px;margin:0 auto 24px;padding:22px 24px;background:#fff}
    .gabaritoStatus.correct{border-left:5px solid #6d951b}
    .gabaritoStatus.different{border-left:5px solid #ffa43a}
    .gabaritoStatus>span,.gabaritoTitle{font-size:10px;font-weight:900;letter-spacing:.14em;color:#2f72d6}
    .gabaritoStatus h3{font-family:Georgia,serif;font-size:25px;line-height:1.12;margin:9px 0}
    .gabaritoStatus p{margin:0;color:#526765;line-height:1.5;font-size:14px}
    .gabaritoTitle{max-width:760px;margin:0 auto 14px}
    .gabaritoFlow{max-width:760px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch}
    .gabaritoNode{background:#fff;border-top:4px solid #2f72d6;min-height:112px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;color:#17345f}
    .gabaritoNode.case{background:#17345f;color:#fff;border-color:#ffa43a}
    .gabaritoNode.final{background:#fff0cf;border-color:#ffa43a}
    .gabaritoNode span{font-size:11px;font-weight:900;letter-spacing:.08em}
    .gabaritoNode strong{font-family:Georgia,serif;font-size:18px;line-height:1.18;margin-top:22px}
    .gabaritoConnector{height:62px;position:relative;display:grid;place-items:center;color:#17345f}
    .gabaritoConnector i{position:absolute;width:1px;top:8px;bottom:8px;background:#78928a}
    .gabaritoConnector span{z-index:1;background:#eaf3f5;padding:4px 7px;font-size:9px;font-weight:900;letter-spacing:.1em}
    .gabaritoConnector b{position:absolute;bottom:3px;font-size:12px;color:#78928a}
    @media(max-width:520px){.gabaritoPanel{padding:20px 14px}.gabaritoStatus{padding:18px}.gabaritoNode{min-height:100px}.gabaritoNode strong{font-size:16px}}
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(enhanceCompletion);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  enhanceCompletion();
})();
