<h1 align="center">
Apex
</h1>
<p align="center">Minimal Web Code Editor</p>

### Demo

[Apex](https://apex.reaper.im)

### Installation

```sh
npm i --save @aliezsid/apex
```

### Features

- Tab Indentation (defaults to 2 Spaces)
- Has non-blocking highlighting, you'll have to use something like PrismJS to return a highlighted code/span elements

### Usage

The API is very simple and small as the editor doesn't really try to solve a lot of problems.

```js
Apex({
  el: "#editor", //elementId to attach too
  tabSpace: 2, // number of spaces to be added on TAB
  font: "Hack,monospace", // font to be used
  fontSize: "14", //font size for the editor
  placeholder: "Enter Code here", // Placeholder
  value: `console.log()`, // default value
  className: "custom-editor", //classname for the editor
  onChange: (code) => {
    // On code change
  },
  highlight: (
    code // specify a highligher
  ) => Prism.highlight(code, Prism.languages.js, "javascript"),
});
```
