---
author: Mengyang Yang
pubDatetime: 2026-11-25T06:45:04.000Z
modDatetime: 2026-11-26T03:02:15.000Z
title: "LearnReact(1) -- Your First Components"
featured: false
draft: false
tags:
  - learn
  - React
description: 'After learning "Your First Components", I wrote this article to summarize what I have learned.'
---

>[!TIP] 总结
> 英语部分，我们学习了resuable compoment， compoment， markup， sprinkle， capital letter。<br>
代码部分： 我知道如何去定义一个compoment,然后去复用它，把几个喜欢的图片加了上去，最终实现了效果。


# English Part

## resuable compoment

- Chinese Meaning: 可复用的、可嵌套的组件。

>[!NOTE]
> 你在 React 中只写了一次 `function Profile` 的定义，但在下面却用了三次来展示 "League Of Legends"，所以说是 reusable component。

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

## compoment

Chinese Meaning: 组件（元素）

>[!QUOTE]
> React applications are built from isolated pieces of UI called **components**. <br>
> **翻译**：React应用是用一块块独立的叫UI的元素做出来的。

## markup

Chinese Meaning: 标签代码（标记）

>[!QUESTION]
> markup是动词？还是名词？
> **回答：**是名词，做动词的时候是**mark up**。

>[!NOTE]
>Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript.<br>
>**翻译**： 过去创作网页时候，网页开发者会给他们的内容做主食然后添加一些javascript上去。

>[!NOTE]
> 这句话也正好解释了什么是markup, 就是mark up their comtent的意思。像 `<h1>`、`<div></div>`、`<section>`、`<img />` 等这类包起来的 HTML（HyperText Markup Language）标签。

我看官方Define a compoment那一段时候，一直没懂为什么过去的时候HTML， CSS， JS分开写，这样不挺好的？在我问Ai之后，Ai给我的答案，我觉得挺对的。AI的回答- [Why Use React? The Pain of Traditional Web Development](https://www.mengyangblog.page/posts/learnreact/why-use-react---the-pain-of-traditional-web-dev/)

## sprinkle

  Chinese Meaning: 撒、点缀

> [!QUOTE]
> A React component is a JavaScript function that you can sprinkle with markup.<br>
> **翻译**： React 组件是一个可以点缀标记语言的 JavaScript 函数

按照句子来理解

A React component is a JavaScript function:

```javascript
function add() {
  return 1 + 1;
}
```

这是javscript

That you can sprinkle with markup:

```jsx
function Profile() {
  // The following <h3> and <img /> are the markup (tags) that are "sprinkled" into JS functions.
  return (
    <>
      <h3>Learning English</h3>
      <img src="/English.jpg" alt="English" />
      // 这些用小括号的都是属于markup
    </>
  );
}
```

## capital letter

Chinese Meaning: 大写字母

同样的，lowcase指的就是小写字母，是capital的反义词。

> [!QUOTE]
> Their names must start with a capital letter or they won't work.<br>
> **翻译**： 它们的名字必须以大写字母开头，否则将无法正常工作。

>[!NOTE]
>React 是靠“首字母是大写还是小写”，来区分你写的是“浏览器自带的原生 HTML 标签”还是“你自己写的 React 组件”的。
所以，**Their names must start with a capital letter or they won't work.**


# Code Part

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
## 其他

官方文档提供了一些好用的**React open source community**:

- [Material UI](https://mui.com/material-ui/)
- [Chark UI](https://chakra-ui.com)

还有一个

- [Beautiful & consistent icons](https://lucide.dev)

# 参考资料

  [Yuor First Compoments](https://react.dev/learn/your-first-component)






