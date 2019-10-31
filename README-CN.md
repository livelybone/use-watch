# use-watch
[![NPM Version](http://img.shields.io/npm/v/use-watch.svg?style=flat-square)](https://www.npmjs.com/package/use-watch)
[![Download Month](http://img.shields.io/npm/dm/use-watch.svg?style=flat-square)](https://www.npmjs.com/package/use-watch)
![gzip with dependencies: 0.5kb](https://img.shields.io/badge/gzip--with--dependencies-0.5kb-brightgreen.svg "gzip with dependencies: 0.5kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

A react hook that use to calling the callback when a part of dependencies changed

## repository
https://github.com/livelybone/use-watch.git

## Demo
https://github.com/livelybone/use-watch#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/use-watch.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S use-watch
```

## Global name - The variable the module exported in `umd` bundle
`useWatch`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

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

在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/use-watch/lib/umd/) 看到你能用到的所有 js 脚本
```html
<script src="https://unpkg.com/use-watch/lib/umd/index.js"></script>
```
