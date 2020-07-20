(function () {
  Apex({
    el: "#editor",
    font: "Hack,monospace",
    placeholder: "Enter Code here",
    value: `function main(){
      console.log("apex");
}`,
    className: "custom-editor",
    onChange: (code) => {
      console.log(code);
    },
    highlight: (code) =>
      Prism.highlight(code, Prism.languages.js, "javascript"),
  });
})();
