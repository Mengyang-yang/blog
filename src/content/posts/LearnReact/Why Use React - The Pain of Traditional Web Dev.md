---
title: "Why Use React? The Pain of Traditional Web Development"
description: "A look at how React components make interface code easier to maintain, reuse, and keep in sync with data."
date: 2025-06-05
tags:
  - React
---

#### **❌ 1. The traditional approach (before React): organize by file type, and make every change a scavenger hunt**

Imagine building a complex device with **100 different features**—like a modern shopping or video-sharing site, with a search box, like buttons, comment sections, profile cards, and a video player. How did **traditional web development** keep all of that organized? It sorted everything by type:

- **Big box #1 (`.html` files):** the structure and frame of the whole site, with thousands of lines of HTML in one place.
- **Big box #2 (`.css` files):** all the colors, dimensions, and visual details, with thousands of lines of CSS elsewhere.
- **Big box #3 (`.js` files):** all the wiring and behavior, in yet another pile of thousands of lines.

**And that's where the trouble begins:**

- **Pain point A: maintenance becomes a slog.** One day, your boss says, “Update the **like button**. It should turn red and play a little animation when clicked—and prompt users to sign in if they aren't logged in.” To change that one small button, you might have to open three enormous files: edit its markup around line 850 in `.html`, adjust its styling around line 1,200 in `.css`, then update its click handler around line 2,300 in `.js`. Miss one piece, and the page can break.
- **Pain point B: reuse isn't straightforward.** You want to add another copy of the profile card from the top of the page below the comments. With this setup, you have to copy a chunk from HTML, another from CSS, and another from JS. The duplicated code can also bring along conflicting names or styles.

#### **✅ 2. React's approach: build self-contained UI pieces (components)**

While building Facebook, its engineers ran into the drawbacks of this way of working and developed React around a different idea:

**“Don't organize an app only by HTML, CSS, and JS. Build it from the individual pieces of the interface—components.”**

- For example, a **like button component (`LikeButton.jsx`)** can bring together:
  - the button's structure (**HTML/JSX**),
  - its appearance (**CSS/styles**), and
  - what happens when it's clicked, such as updating the count or sending a request (**JavaScript**).

That approach has **three major benefits**:

1. **Related code stays together, so changes are easier.** If the like button looks wrong or its click behavior needs fixing, you can start in `LikeButton.jsx` and find the relevant markup and logic together, rather than hunting through three giant files.
2. **Components are reusable building blocks.** A `Profile` component can package its markup (`<div><h3><img>`), styling (`style={{ borderRadius: '16px' }}`), and the logic for handling its data. Then `Gallery` can render it with a single line: `<Profile name="Akali" ... />`. Use it in multiple places without copying the same chunks of code each time.
3. **The UI stays in sync with data.** In plain JavaScript, changing a value—say, the like count from 99 to 100—can mean manually finding the right element and updating its text. In React, you describe the UI using that value, for example `<h3>{count}</h3>`. When React state changes, React updates the rendered UI to match.
