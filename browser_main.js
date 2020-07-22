(function () {
  const fontSizeInput = document.getElementById("font-size-input");
  const languageInput = document.getElementById("language-input");

  fontSizeInput.addEventListener("change", () => {
    refreshEditor();
  });

  languageInput.addEventListener("change", () => {
    refreshEditor();
  });

  function refreshEditor() {
    const editor = document.getElementById("editor");
    editor.innerHTML = "";

    Apex({
      el: "#editor",
      font: "Hack,monospace",
      fontSize: fontSizeInput.value || 14,
      placeholder: "Enter Code here",
      value: `function main(){
        console.log("apex");
  }`,
      className: "custom-editor",
      onChange: (code) => {
        // console.log(code);
      },
      highlight: (code) =>
        Prism.highlight(
          code,
          Prism.languages[languageInput.value || "js"],
          "javascript"
        ),
    });
  }

  refreshEditor();
})();
