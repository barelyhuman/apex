const defaultConfig = {
  el: "",
  tabSpace: 2,
  fontFamily: "monospace",
};

const keyCodes = {
  TAB: 9,
  CURSOR_LEFT: 37,
  CURSOR_RIGHT: 39,
  CURSOR_UP: 38,
  CURSOR_DOWN: 40,
  SPACE: 32,
  ENTER: 13,
};

const caret = `<span class="apex-ed-cursor-blinking">|</span>`;

function Apex(config = defaultConfig) {
  var _self = this;

  _self.config = config;
  _self.caretPosition = 0;
  _self.content = "";
  _self.elm = document.querySelector(config.el);
  // _self.elm.contentEditable = true;
  _self.editor = document.createElement("div");
  _self.elm.appendChild(_self.editor);

  // Method def start

  _self.setupStyles = () => {
    _self.elm.style.minHeight = "100px";
    _self.elm.style.minWidth = "300px";
    _self.elm.style.border = "1px solid black";
    _self.elm.style.outline = "#000";
    _self.elm.style.padding = "16px";
    _self.elm.style.fontFamily = _self.config.fontFamily || "monospace";
  };

  _self.startBlinking = () => {
    const caretEl = document.querySelector(".apex-ed-cursor-blinking");
    if (!caretEl) {
      return;
    }
    caretEl.classList.add("blink");
  };

  _self.stopBlinking = () => {
    const caretEl = document.querySelector(".apex-ed-cursor-blinking");
    if (!caretEl) {
      return;
    }
    caretEl.classList.remove("blink");
  };

  _self.getCaretBefore = () => {
    if (_self.caretPosition === 0) {
      return "";
    } else {
      return _self.content.substring(0, _self.caretPosition);
    }
  };

  _self.getCaretAfter = () => {
    if (_self.caretPosition === _self.content.length) {
      return "";
    } else {
      return _self.content.substring(_self.caretPosition);
    }
  };

  _self.normalizeLines = (text) => {
    return text.replace(/\n/g, "<br/>");
  };

  _self.compileHTML = () => {
    return (
      _self.normalizeLines(_self.getCaretBefore()) +
      caret +
      _self.normalizeLines(_self.getCaretAfter())
    );
  };

  _self.onType = (char) => {
    _self.content = _self.getCaretBefore() + char + _self.getCaretAfter();
    _self.caretPosition = _self.caretPosition + 1;
  };

  _self.deletePrevChar = () => {
    if (_self.getCaretBefore().length > 0) {
      _self.content =
        _self.getCaretBefore().substring(0, _self.getCaretBefore().length - 1) +
        _self.getCaretAfter();
      _self.caretPosition--;
      return true;
    } else {
      return false;
    }
  };

  _self.deleteNextChar = () => {
    if (_self.getCaretAfter().length > 0) {
      _self.content = _self.getCaretBefore() + _self.getCaretAfter().substr(1);
      return true;
    } else {
      return false;
    }
  };

  _self.moveLeft = () => {
    if (_self.caretPosition === 0) {
      return false;
    } else {
      _self.caretPosition--;
      return true;
    }
  };

  _self.moveRight = () => {
    if (_self.caretPosition === _self.content.length) {
      return false;
    } else {
      _self.caretPosition++;
      return true;
    }
  };

  // Method def end

  // Handlers

  _self.elm.addEventListener("click", (e) => {
    _self.elm.tabIndex = 0;
    _self.elm.focus();
  });

  _self.elm.addEventListener("focus", (e) => {
    _self.startBlinking();
  });

  _self.elm.addEventListener("blur", (e) => {
    _self.stopBlinking();
  });

  _self.elm.addEventListener("keydown", (e) => {
    if (e.key === 46 && _self.deleteNextChar()) {
      refreshHTML();
    }
    if (e.which === 8 && _self.deletePrevChar()) {
      refreshHTML();
    }
    if (e.which === 37 && _self.moveLeft()) {
      refreshHTML();
    }
    if (e.which === 39 && _self.moveRight()) {
      refreshHTML();
    }

    if (e.which === keyCodes.TAB) {
      e.preventDefault();
      let char = " ".repeat(_self.config.tabSpace || 2);
      _self.onType(char);
      refreshHTML();
    }
  });

  _self.elm.addEventListener("keypress", (e) => {
    let char = String.fromCharCode(e.which);
    if (e.which === keyCodes.ENTER) {
      char = "\n";
    }

    if (e.which === keyCodes.TAB) {
      char = "\t";
    }

    _self.onType(char);
    refreshHTML();
  });

  function refreshHTML() {
    _self.elm.innerHTML = _self.compileHTML();
    const cusorPosition = document
      .querySelector(".apex-ed-cursor-wrapper")
      .getBoundingClientRect();

    const heightDelta =
      document.querySelector(".apex-ed-cursor-wrapper").getBoundingClientRect()
        .height / 4;
    const cursor = document.querySelector(".apex-ed-cursor-blinking");

    if (!cursor) {
      return;
    }

    cursor.style.top = cusorPosition.top;
    cursor.style.left = cusorPosition.left - heightDelta;
  }

  _self.init = () => {
    _self.setupStyles();
    refreshHTML();
    _self.elm.tabIndex = 0;
    _self.elm.focus();
    _self.startBlinking();
  };
}

export default Apex;
