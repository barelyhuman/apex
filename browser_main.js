(function () {
  let currentCode = "";
  const fontSizeInput = document.getElementById("font-size-input");
  const hightlightCheckbox = document.getElementById("hightlight-checkbox");

  let highlight = true;

  fontSizeInput.addEventListener("change", () => {
    refreshEditor();
  });

  hightlightCheckbox.addEventListener("change", (e) => {
    highlight = e.target.checked;
    refreshEditor();
  });

  function refreshEditor() {
    const editor = document.getElementById("editor");
    editor.innerHTML = "";

    Apex({
      el: document.getElementById("editor"),
      font: "Hack,monospace",
      fontSize: fontSizeInput.value || 14,
      placeholder: "Enter Code here",
      disabled: false,
      value:
        currentCode ||
        `function main(){
    console.log("apex");
}`,
      className: "custom-editor",
      onChange: (code) => {
        currentCode = code;
      },
      highlight: !highlight
        ? undefined
        : (code) => hljs.highlightAuto(code).value,
    });
  }

  refreshEditor();
})();
