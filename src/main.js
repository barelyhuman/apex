let config = {
  highlight: false,
  font: "monospace",
  fontSize: 24,
  tabSpace: 2,
  disabled: false,
};

const keyCodes = {
  TAB: 9,
};

let highlighter;

function main(_config) {
  config = Object.assign({}, config, _config);
  const container = config.el;
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
  tarea.style.width = "100%";
  tarea.style.height = "100%";
  tarea.style.left = "0";
  tarea.style.top = "0";
  tarea.classList.add(config.className);
  tarea.style.zIndex = "1";
  tarea.style.fontFamily = config.font;
  tarea.style.fontSize = config.fontSize + "px";
  tarea.style.lineHeight = config.fontSize * 1.25 + "px";
  tarea.style.background = "transparent";
  tarea.disabled = config.disabled;
}

function configure(codeAreaContainer, codeArea) {
  codeArea.style.fontFamily = config.font;
  codeArea.style.fontSize = config.fontSize + "px";
  codeArea.style.lineHeight = config.fontSize * 1.25 + "px";
  codeAreaContainer.style.position = "relative";
  codeAreaContainer.style.height = "100%";
  codeAreaContainer.style.width = "100%";
  codeAreaContainer.style.left = "0";
  codeAreaContainer.style.top = "0";
}

function syncAreas(codeEditor, codePrinter, codePrinterContainer) {
  codeEditor.addEventListener("keydown", (e) => {
    const selStart = e.target.selectionStart;

    if (e.keyCode === keyCodes.TAB) {
      const tabChars = " ".repeat(config.tabSpace);
      e.target.value =
        e.target.value.substring(0, e.target.selectionStart) +
        tabChars +
        e.target.value.substring(e.target.selectionEnd);

      e.target.selectionStart = selStart + tabChars.length;
      e.target.selectionEnd = selStart + tabChars.length;

      e.preventDefault();
      return;
    }
  });
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
  printArea.innerHTML = _value;

  if (config.highlight && typeof config.highlight === "function") {
    printArea.innerHTML = config.highlight(_value);
  } else {
    printArea.innerText = _value;
  }

  editor.style.webkitTextFillColor = "transparent";
}

function resetPlaceholderColor(eventObj) {
  eventObj.target.style.webkitTextFillColor = "#000";
}

export default main;
