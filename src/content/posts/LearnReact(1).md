---
author: Mengyang Yang
pubDatetime: 2026-11-25T06:45:04.000Z
title: "LearnReact(1) -- Your First Components"
featured: false
draft: false
tags:
  - learn
  - React
description: 'After learning "Your First Components", I wrote this article to summarize what I have learned.'
---

# 1. English Part

- **reusable components**

Chinese Meaning: 可复用的、可嵌套的组件。

你在 React 中只写了一次 `function Profile` 的定义，但在下面却用了三次来展示 "League Of Legends"，所以说是 reusable components。

```jsx
function Profile() {
  return <img src="/spirit-blossom_ashe_icon.jpg" alt="spirit-blossom ashe" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>League Of Legends</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

- **Components**

Chinese Meaning: 组件（元素）

Sentence: React applications are built from isolated pieces of UI called components.

- **markup**

Chinese Meaning: 标签代码（标记）

markup 指的是像 `<h1>`、`<div></div>`、`<section>`、`<img />` 等这类包起来的 HTML（HyperText Markup Language）标签。

- **sprinkle**

Chinese Meaning: 撒、点缀

> [!QUOTE]
> A React component is a JavaScript function that you can sprinkle with markup.

按照句子来理解，A React component is a JavaScript function:

```javascript
function add() {
  return 1 + 1;
}
```

That you can sprinkle with markup:

```jsx
function Profile() {
  // The following <h3> and <img /> are the markup (tags) that are "sprinkled" into JS functions.
  return (
    <>
      <h3>Learning English</h3>
      <img src="/English.jpg" alt="English" />
    </>
  );
}
```

- **capital letter**

Chinese Meaning: 大写字母

lowercase: 小写字母

> [!QUOTE]
> Their names must start with a capital letter or they won't work.

React 是靠“首字母是大写还是小写”，来区分你写的是“浏览器自带的原生 HTML 标签”还是“你自己写的 React 组件”的。
所以，Their names must start with a capital letter or they won't work.

# 2. Code Part

```jsx
// Displays a profile name and image.
function Profile({ name, imageURL }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>{name}</h3>
      <img
        src={imageURL}
        alt={name}
        width={200}
        style={{ borderRadius: "16px" }}
      />
    </div>
  );
}

// Displays profiles in a centered horizontal gallery.
export default function Gallery() {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        height: "100vh",
      }}
    >
      <Profile
        name="star-guardian_morgana-nemesis_icon"
        imageURL="/star-guardian_morgana-nemesis_icon.jpg"
      />
      <Profile
        name="star-guardian_akali_icon"
        imageURL="/star-guardian_akali_icon.jpg"
      />
      <Profile
        name="spirit-blossom_ashe_icon"
        imageURL="/spirit-blossom_ashe_icon.jpg"
      />
    </section>
  );
}
```
