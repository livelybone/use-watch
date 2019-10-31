# use-watch
[![NPM Version](http://img.shields.io/npm/v/use-watch.svg?style=flat-square)](https://www.npmjs.com/package/use-watch)
[![Download Month](http://img.shields.io/npm/dm/use-watch.svg?style=flat-square)](https://www.npmjs.com/package/use-watch)
![gzip with dependencies: 0.5kb](https://img.shields.io/badge/gzip--with--dependencies-0.5kb-brightgreen.svg "gzip with dependencies: 0.5kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A react hook that use to calling the callback when a part of dependencies changed

## repository
https://github.com/livelybone/use-watch.git

## Demo
https://github.com/livelybone/use-watch#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/use-watch.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1/examples/test.html`) in your browser

## Installation
```bash
npm i -S use-watch
```

## Global name - The variable the module exported in `umd` bundle
`useWatch`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```typescript jsx
import React, { useState, useMemo } from 'react'
import useWatch from 'use-watch'

const Comp = () => {
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  useWatch(count, (val) => console.log('---------- \ncount change to: ', val), { immediate: true })
  useWatch(count1, (val) => console.log('---------- \ncount1 change to: ', val))
  useWatch(count2, (val) => console.log('---------- \ncount2 change to: ', val))
  useWatch(useMemo(() => ({ count, count1 }), [count, count1]), (val) => {
    console.log('---------- \ncount or count1 change to: ' , val)
    console.log('now the count2 is: ', count2)
  })

  console.log('render')
  return (
    <div>
      <button onClick={() => setCount(pre => pre + 1)}>add count</button>
      <button onClick={() => setCount1(pre => pre + 1)}>add count1</button>
      <button onClick={() => setCount2(pre => pre + 1)}>add count2</button>
    </div>
  )
}
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/use-watch/lib/umd/)
```html
<script src="https://unpkg.com/use-watch/lib/umd/index.js"></script>
```
