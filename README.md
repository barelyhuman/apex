<p align="center">
    <img width="125" src="docs/logo.svg"/>
</p>
<h1 align="center">
Fit
</h1>
<p align="center">Minimal wrapper around <code>window.fetch</code> to make my life easier</p>

## Disclaimer

I understand the readme isn't thorough right now and only important aspects of the api are out here, for the remaining stuff you can go through the source code, it's a very simple wrapper.

## Install

```sh
npm i @aliezsid/fit
```

## Usage

Fit has a simple API

```js

fit(url).[method].then().catch();


// Get Request

const data = await fit("localhost:3000/api/posts/1").get()
// or
fit("localhost:3000/api/posts/1").get()
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
})



// Post Request

const data = await fit("localhost:3000/api/posts/1").post({
    params:1
})
// or
fit("localhost:3000/api/posts/1").post({
    params:1
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log(err);
})

```

## API

```js
// @param body || null - depending on method
// @param [options] - fetch options that you want to pass through

fit(url).get([options]);

fit(url).post(body, [options]);

fit(url).patch(body, [options]);

fit(url).put(body, [options]);

fit(url).delete(options);
```
