let config = {
  highlight: (code) => code,
  font: "monospace",
  fontSize: 24,
  tabSpace: 2,
  disabled: false,
};

const keyCodes = {
  TAB: 9,
  CURSOR_LEFT: 37,
  CURSOR_RIGHT: 39,
  CURSOR_UP: 38,
  CURSOR_DOWN: 40,
  SPACE: 32,
};

const NONREACTIVE_KEYS = [
  keyCodes.CURSOR_LEFT,
  keyCodes.CURSOR_RIGHT,
  keyCodes.CURSOR_UP,
  keyCodes.CURSOR_DOWN,
  keyCodes.SPACE,
];

let highlighter = false;

function main(_config) {
  config = Object.assign({}, config, _config);
  const container = config.el;
  container.classList.add(config.className);
  container.style = `
    position: relative;
    text-align: left;
    box-sizing: border-box;
    padding: 0px;
    overflow: hidden;
    font-family:${config.font};
    font-size:${config.fontSize + "px"};
    line-height:calc(${config.fontSize}px * 1.5);
  `;

  addEditor(container);
}

function addEditor(toContainer) {
  const textArea = document.createElement("textarea");
  const preArea = document.createElement("pre");
  const codeArea = document.createElement("code");

  // TODO: hide text area;
  visualiseTextArea(textArea);

  configure(preArea);

  codeArea.style.fontFamily = "inherit";

  syncAreas(textArea, codeArea);

  preArea.appendChild(codeArea);
  toContainer.appendChild(textArea);
  toContainer.appendChild(preArea);
}

function visualiseTextArea(tarea) {
  tarea.placeholder = config.placeholder;
  tarea.value = config.value;
  tarea.autoCapitalize = "off";
  tarea.autoComplete = "off";
  tarea.autoCorrect = "off";
  tarea.spellcheck = false;
  tarea.style = `
      margin: 0px;
      border: 0px;
      background: none;
      box-sizing: inherit;
      display: inherit;
      font-family: inherit;
      font-size: inherit;
      font-style: inherit;
      font-variant-ligatures: inherit;
      font-weight: inherit;
      letter-spacing: inherit;
      line-height: inherit;
      tab-size: inherit;
      text-indent: inherit;
      text-rendering: inherit;
      text-transform: inherit;
      white-space: pre-wrap;
      word-break: keep-all;
      overflow-wrap: break-word;
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      resize: none;
      color: inherit;
      overflow: hidden;
      -webkit-font-smoothing: antialiased;
      -webkit-text-fill-color: transparent;
      padding: 10px;
  `;

  tarea.disabled = config.disabled;
}

function configure(codeAreaContainer) {
  codeAreaContainer.setAttribute("aria-hidden", true);
  codeAreaContainer.style = `
    margin: 0px;
    border: 0px;
    background: none;
    box-sizing: inherit;
    display: inherit;
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-variant-ligatures: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    tab-size: inherit;
    text-indent: inherit;
    text-rendering: inherit;
    text-transform: inherit;
    white-space: pre-wrap;
    word-break: keep-all;
    overflow-wrap: break-word;
    position: relative;
    pointer-events: none;
    padding: 10px;
    overflow-x: auto;
  `;
}

function syncAreas(codeEditor, codePrinterContainer) {
  if (config.highlight && typeof config.highlight === "function") {
    highlighter = true;
    codeEditor.style.webkitTextFillColor = "transparent";
  } else {
    highlighter = false;
  }

  codeEditor.addEventListener("keydown", (e) => {
    const selStart = e.target.selectionStart;

    if (e.keyCode === keyCodes.TAB) {
      e.preventDefault();

      const tabChars = " ".repeat(config.tabSpace);
      e.target.value =
        e.target.value.substring(0, e.target.selectionStart) +
        tabChars +
        e.target.value.substring(e.target.selectionEnd);

      e.target.selectionStart = selStart + tabChars.length;
      e.target.selectionEnd = selStart + tabChars.length;
    }
  });

  codeEditor.addEventListener("keyup", (e) => {
    if (NONREACTIVE_KEYS.indexOf(e.keyCode) > -1) {
      return;
    }

    if (!highlighter) {
      codePrinterContainer.innerText = codeEditor.value;
    }

    highlighter && highlightText(codeEditor, codePrinterContainer);
    config.onChange && config.onChange(e.target.value);
  });

  if (!highlighter) {
    codePrinterContainer.innerText = codeEditor.value;
  }

  highlighter && highlightText(codeEditor, codePrinterContainer);
}

function highlightText(editor, printArea) {
  const _value = editor.value;
  editor.innerHTML = _value;

  useHighlighter(_value)
    .then((data) => {
      printArea.innerHTML = data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function useHighlighter(value) {
  return config.highlight(value);
}

export default main;
