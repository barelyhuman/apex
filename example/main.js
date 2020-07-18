(function () {
  Apex({
    el: "#editor",
    font: "Hack,monospace",
    highlight: (code) =>
      Prism.highlight(code, Prism.languages.js, "javascript"),
  });
})();
