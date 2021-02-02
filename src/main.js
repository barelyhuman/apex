function Apex() {
  this.config = {};
  this.preElement = false;
  this.textareaElement = false;
}

Apex.prototype = {
  install(config) {
    this.config = config;
    this.preElement = document.createElement("pre");
    this.textareaElement = document.createElement("textarea");

    this.config.el.style = `
    position: relative;
    text-align: left;
    box-sizing: border-box;
    padding: 0px;
    overflow: hidden;
    font-family: monospace;
    font-size: 16px;
    line-height: calc(24px);
    `;

    this.preElement.style = `
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

    this.textareaElement.style = `
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

    this.config.el.appendChild(this.preElement);
    this.config.el.appendChild(this.textareaElement);

    this.config.el.classList.add(this.config.className);
  },

  start() {
    this.textareaElement.addEventListener("keyup", (event) => {
      this.preElement.innerHTML = event.target.value;
      this.preElement.innerHTML = this.config.highlight(event.target.value);
    });
  },
};

export default Apex;
