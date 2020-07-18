(function () {
  Apex({
    el: "#editor",
    font: "Hack,monospace",
    className: "custom-editor",
    highlight: (code) =>
      Prism.highlight(code, Prism.languages.js, "javascript"),
  });
})();
