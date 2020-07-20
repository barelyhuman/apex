let config = {
  highlight: false,
  font: "monospace",
};

function main(_config) {
  config = Object.assign({}, config, _config);
  const container = document.querySelector(config.el);
  container.style.position = "relative";
  addEditor(container);
}

function addEditor(toContainer) {
  const textArea = document.createElement("textarea");
  const preArea = document.createElement("pre");
  const codeArea = document.createElement("code");

  // TODO: hide text area;
  visualiseTextArea(textArea);

  configure(preArea, codeArea);

  syncAreas(textArea, codeArea, preArea);

  preArea.appendChild(codeArea);

  toContainer.appendChild(textArea);
  toContainer.appendChild(preArea);
}

function visualiseTextArea(tarea) {
  tarea.placeholder = config.placeholder;
  tarea.value = config.value;
  tarea.style.position = "absolute";
  tarea.style.boxSizing = "border-box";
  tarea.style.resize = "none";
  tarea.style.border = "2px solid #000";
  tarea.style.borderRadius = "4px";
  tarea.style.outline = "#000";
  tarea.style.padding = "10px";
  tarea.style.width = "100%";
  tarea.style.height = "100%";
  tarea.style.left = "0";
  tarea.style.top = "0";
  tarea.style.zIndex = "1";
  tarea.style.fontFamily = config.font;
  tarea.style.background = "transparent";
}

function configure(codeAreaContainer, codeArea) {
  codeArea.style.fontFamily = config.font;
  codeAreaContainer.classList.add(config.className);
  codeAreaContainer.style.position = "relative";
  codeAreaContainer.style.height = "100%";
  codeAreaContainer.style.width = "100%";
  codeAreaContainer.style.left = "0";
  codeAreaContainer.style.top = "0";
}

function syncAreas(codeEditor, codePrinter, codePrinterContainer) {
  codeEditor.addEventListener("keyup", (e) => {
    if (!e.target.value) {
      resetPlaceholderColor(e);
    } else {
      e.target.style.webkitTextFillColor = "transparent";
    }

    highlightText(codeEditor, codePrinter);

    if (config.onChange) {
      config.onChange(e.target.value);
    }
  });
  highlightText(codeEditor, codePrinter);
}

function highlightText(editor, printArea) {
  let _value = editor.value;
  editor.style.webkitTextFillColor = "transparent";
  if (config.highlight && typeof config.highlight === "function") {
    _value = config.highlight(_value);
  }
  printArea.innerHTML = _value;
}

function resetPlaceholderColor(eventObj) {
  eventObj.target.style.webkitTextFillColor = "#000";
}

export default main;
