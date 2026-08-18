(() => {
  const normalize = (value) => (value || "").replace(/\s+/g, " ").trim();

  const getNodeSignature = (node) => {
    if (!node) return "";
    const code = normalize(node.querySelector("span")?.textContent);
    const text = normalize(node.querySelector("strong")?.textContent);
    return `${code}||${text}`;
  };

  const getConnectorLabel = (connector) => normalize(connector?.querySelector("span")?.textContent);

  const clearStepClasses = () => {
    document.querySelectorAll(".flowCapture .flowNode, .flowCapture .connector").forEach((el) => {
      el.classList.remove("cmpCorrect", "cmpIncorrect");
    });
  };

  const applyStepComparison = () => {
    const section = document.querySelector(".flowSection.comparisonVisible");
    const userFlow = section?.querySelector(".flowCapture");
    const keyFlow = section?.querySelector(".gabaritoFlow");
    if (!section || !userFlow || !keyFlow) return;

    const userNodes = [...userFlow.querySelectorAll(".flowNode")];
    const keyNodes = [...keyFlow.querySelectorAll(".gabaritoNode")];
    const userConnectors = [...userFlow.querySelectorAll(".connector")];
    const keyConnectors = [...keyFlow.querySelectorAll(".gabaritoConnector")];

    clearStepClasses();
    userFlow.classList.remove("flowIncorrect", "flowCorrect");

    const nodeCorrect = userNodes.map((node, index) => {
      const correct = Boolean(keyNodes[index]) && getNodeSignature(node) === getNodeSignature(keyNodes[index]);
      node.classList.add(correct ? "cmpCorrect" : "cmpIncorrect");
      return correct;
    });

    userConnectors.forEach((connector, index) => {
      const sameLabel = Boolean(keyConnectors[index]) && getConnectorLabel(connector) === getConnectorLabel(keyConnectors[index]);
      const fromCorrect = nodeCorrect[index] === true;
      const toCorrect = nodeCorrect[index + 1] === true;
      const correct = sameLabel && fromCorrect && toCorrect;
      connector.classList.add(correct ? "cmpCorrect" : "cmpIncorrect");
    });

    const allCorrect = userNodes.length === keyNodes.length
      && userConnectors.length === keyConnectors.length
      && nodeCorrect.every(Boolean)
      && userConnectors.every((connector) => connector.classList.contains("cmpCorrect"));

    const status = section.querySelector(".comparisonStatus");
    if (status) {
      status.classList.toggle("correct", allCorrect);
      status.classList.toggle("different", !allCorrect);
      const label = status.querySelector("span");
      const message = status.querySelector("strong");
      if (label) label.textContent = allCorrect ? "✓ PERCURSO CORRETO" : "✕ PERCURSO DIFERENTE DO GABARITO";
      if (message) message.textContent = allCorrect
        ? "Seu fluxo coincide com a resposta de referência."
        : "Etapas corretas estão em verde; somente as divergências aparecem em vermelho.";
    }
  };

  const style = document.createElement("style");
  style.textContent = `
    .flowCapture .flowNode.cmpCorrect{border-top-color:#6d951b!important;background:#f4f9e9!important;color:#355213!important}
    .flowCapture .flowNode.caseNode.cmpCorrect{background:#557a18!important;color:#fff!important;border-top-color:#6d951b!important}
    .flowCapture .flowNode.endNode.cmpCorrect{background:#e8f2cf!important;color:#355213!important;border-top-color:#6d951b!important}
    .flowCapture .connector.cmpCorrect i{background:#6d951b!important}
    .flowCapture .connector.cmpCorrect i:after{border-top-color:#6d951b!important}
    .flowCapture .connector.cmpCorrect span{color:#557a18!important;font-weight:900!important}

    .flowCapture .flowNode.cmpIncorrect{border-top-color:#c84827!important;background:#fff0ed!important;color:#8e2f25!important}
    .flowCapture .flowNode.caseNode.cmpIncorrect{background:#9e382b!important;color:#fff!important;border-top-color:#c84827!important}
    .flowCapture .flowNode.endNode.cmpIncorrect{background:#ffdcd5!important;color:#8e2f25!important;border-top-color:#c84827!important}
    .flowCapture .connector.cmpIncorrect i{background:#c84827!important}
    .flowCapture .connector.cmpIncorrect i:after{border-top-color:#c84827!important}
    .flowCapture .connector.cmpIncorrect span{color:#9e382b!important;font-weight:900!important}
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => {
    if (document.querySelector(".flowSection.comparisonVisible .gabaritoFlow")) {
      applyStepComparison();
    } else {
      clearStepClasses();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  applyStepComparison();
})();
