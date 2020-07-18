let config = {
  highlight: false,
  font: "monospace",
};

function main(_config) {
  config = Object.assign({}, config, _config);
  const container = document.querySelector(config.el);
  addEditor(container);
}

function addEditor(toContainer) {
  const textArea = document.createElement("textarea");
  const preArea = document.createElement("pre");

  configure(preArea);
  syncAreas(textArea, preArea);

  toContainer.appendChild(textArea);
  toContainer.appendChild(preArea);
}

function configure(codePrinter) {
  codePrinter.style.fontFamily = config.font;
}

function syncAreas(codeEditor, codePrinter) {
  codeEditor.addEventListener("keyup", (e) => {
    let _value = e.target.value;

    if (config.highlight && typeof config.highlight === "function") {
      _value = config.highlight(_value);
    }

    codePrinter.innerHTML = _value;
  });
}

export default main;
