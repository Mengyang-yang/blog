---
author: Mengyang Yang
pubDatetime: 2026-11-03T02:13:30.000Z
title: "Use Userscripts to Remove Ads in Youdao"
featured: false
draft: false
tags:
  - safari
  - userscripts
  - tools
description: "Remove advertisements and promotional areas from Youdao with the free and open-source Userscripts Safari extension."
---

# Use Userscripts to Remove Ads in Youdao

Userscripts is a free and open-source Safari extension that lets you run custom scripts on websites. In this tutorial, we use it to remove advertisements and promotional areas from [youdao.com](https://www.youdao.com).

First, install Userscripts from Safari extensions, create a new user script, and paste the following code. The script watches the page for specific elements and removes Youdao's banners, product promotions, advertisements, footers, and feedback controls.

```javascript
// ==UserScript==
// @name         网易有道网页绿化
// @namespace    http://tampermonkey.net/
// @match        https://www.youdao.com/*
// @grant        none
// @run-at       document-start
// @version      1.5
// @license      MIT
// @author       Berger
// @description  去广告、网页绿化（只保留导航 + 搜索）
// ==/UserScript==
(function () {
    "use strict";

    const SELECTORS = [
        'div.top-banner-wrap',
        '.product-container',
        '.rollNumber-with-banner',
        '.content-bg',
        'footer.footer_container',
        '.footer_container',
        '.dict-website-footer',
        '.footer-gray',
        '.dict-website-footer-container',
        '.copyright',
        'div.dict-module > div[disable-zoom]',
        '.user-feed_back',
        '.feedbackBtn',
        '.go-top',
    ];

    function removeAll() {
        SELECTORS.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });
    }

    // 强制修复建议框被裁剪
    function injectFix() {
        if (document.getElementById('youdao-suggest-fix')) return;
        const style = document.createElement('style');
        style.id = 'youdao-suggest-fix';
        style.textContent = `
            /* 解除建议框自身裁剪 */
            .autosuggest__results-container,
            #autosuggest-autosuggest__results {
                overflow: visible !important;
                z-index: 99999 !important;
                height: auto !important;
                max-height: none !important;
                clip: auto !important;
                clip-path: none !important;
            }

            /* 解除搜索相关容器裁剪 */
            .input_con,
            .input_con.expand,
            .input-content,
            .search_input,
            .search_con,
            .search_container,
            .content,
            .center_container {
                overflow: visible !important;
            }

            /* 解除页面层裁剪（关键） */
            .index_page,
            #homeLayout,
            #__layout,
            #__nuxt {
                overflow: visible !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    removeAll();
    injectFix();

    const observer = new MutationObserver(() => {
        removeAll();
        injectFix();
    });

    function startObserving() {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
            removeAll();
            injectFix();
        }
    }

    if (document.body) {
        startObserving();
    } else {
        document.addEventListener('DOMContentLoaded', startObserving);
    }

    window.addEventListener('popstate', () => { removeAll(); injectFix(); });
    window.addEventListener('load', () => { removeAll(); injectFix(); });
})()
```

After saving and enabling the script, refresh Youdao. The matching promotional elements should be removed automatically.
