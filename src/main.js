let config = {
  highlight: false,
  font: "monospace",
};

let caretPosition = {
  x: 0,
  y: 0,
};

function main(_config) {
  config = Object.assign({}, config, _config);
  const container = document.querySelector(config.el);
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
  tarea.style.boxSizing = "border-box";
  tarea.style.resize = "none";
  tarea.style.border = "2px solid #000";
  tarea.style.borderRadius = "4px";
  tarea.style.outline = "#000";
  tarea.style.padding = "10px";
  tarea.style.width = "100%";
}

function configure(codeAreaContainer, codeArea) {
  codeArea.style.fontFamily = config.font;
  codeAreaContainer.classList.add(config.className);
  codeAreaContainer.style.position = "relative";
  codeAreaContainer.style.minHeight = "42px";
}

function syncAreas(codeEditor, codePrinter, codePrinterContainer) {
  //TODO: Add cursor to pre area

  const cursorNode = createCursorNode();

  codeEditor.addEventListener("keyup", (e) => {
    let _value = e.target.value;

    if (config.highlight && typeof config.highlight === "function") {
      _value = config.highlight(_value);
    }

    const { height: fontHeight, width: fontWidth } = getCaretPosition(
      ")",
      document.body
    );

    caretPosition.x = codeEditor.selectionStart * fontWidth;

    cursorNode.style.transform = `translate(${caretPosition.x + 0.5}px,${
      caretPosition.y + 0.5
    }px)`;

    codePrinter.innerHTML = _value;
  });

  codePrinterContainer.appendChild(cursorNode);
}

function createCursorNode() {
  const node = document.createElement("div");
  node.style.height = "16px";
  node.style.width = "1px";
  node.style.background = "#000";
  node.style.position = "absolute";
  return node;
}

function getCaretPosition(text, container) {
  const fauxArea = document.createElement("div");
  fauxArea.style.height = "auto";
  fauxArea.style.width = "auto";
  fauxArea.style.fontFamily = config.font;
  fauxArea.style.whiteSpace = "nowrap";
  fauxArea.style.position = "absolute";
  // fauxArea.style.visibility = "hidden";
  fauxArea.innerHTML = text;
  container.appendChild(fauxArea);
  const height = fauxArea.clientHeight;
  const width = fauxArea.clientWidth;
  fauxArea.parentNode.removeChild(fauxArea);
  return { height, width };
}

export default main;
