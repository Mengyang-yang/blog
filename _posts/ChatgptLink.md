---
title: "ChatGPTLink"
date: 2026-09-27
author:
  name: "sandypockets"
  picture: "/assets/blog/authors/sandypockets_avatar.jpg"
coverImage: "/assets/blog/a-nextjs-blog-starter-you-actually-want-to-use/tree-minimal.jpg"
excerpt: "给文章难懂的词接上 ChatGPT / Grok"
ogImage:
  url: "/assets/blog/a-nextjs-blog-starter-you-actually-want-to-use/tree-minimal.jpg"
tags: []
description: "给文章难懂的词接上 ChatGPT / Grok"
---
ChatGPT例子
```bash
copy('https://chatgpt.com/?q=' + encodeURIComponent('户晨风是谁？') + '&temporary-chat=true')
```
grok的例子：
```bash
copy('https://grok.com/?q=' + encodeURIComponent('xxxxx') + '#private')
```
两边都要先登录。没有官方的「免登录」参数。

1. 生成网址

Safari：任意网页 → 开发 → 显示 Web 检查器 → 控制台。整段粘贴，回车。
> Mac打开开发者模式快捷键是：cmd+ option + i
ChatGPT（预填 + 临时对话）：

copy('https://chatgpt.com/?q=' + encodeURIComponent('坚果是什么？营养价值有哪些？') + '&temporary-chat=true')

Grok（预填，常自动发送 + 私密对话）：

copy('https://grok.com/?q=' + encodeURIComponent('坚果是什么？营养价值有哪些？') + '#private')

没有 copy 就把第一行的 copy 改成 console.log，再手选打印出来的网址。
Grok 用的是独立网站 grok.com，不是 X App 里的 Grok。  
ChatGPT 的 temporary-chat=true 在 Grok 上无效。

3. 让它参考这篇文章
ChatGPT:
copy('https://chatgpt.com/?q=' + encodeURIComponent('阅读 https://mikeq95blog.uk/blog/2026/09/17/clash-display-fontshare-font 然后用中文解释「Clash Display」。按原文讲，不要编。') + '&temporary-chat=true')
Grok：
copy('https://grok.com/?q=' + encodeURIComponent('阅读 https://mikeq95blog.uk/blog/2026/09/17/clash-display-fontshare-font 然后用中文解释「Clash Display」。按原文讲，不要编。') + '#private')
换成你自己的文章时，只改两处：链接，和「」里的词。