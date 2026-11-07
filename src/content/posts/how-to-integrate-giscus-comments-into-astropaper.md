---
author: Mengyang Yang
pubDatetime: 2024-07-25T11:11:53.000Z
modDatetime: 2026-11-01T10:00:00.000Z
title: "How to integrate Giscus comments into AstroPaper"
featured: false
draft: false
tags:
  - astro
  - blog
  - docs
description: "Comment function on a static blog hosted on GitHub Pages with Giscus."
---

Hosting a thin static blog on a platform like [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) has numerous advantages, but also takes away some interactivity. Fortunately, [Giscus](https://giscus.app/) exists and offers a way to embed user comments on static sites.

## Table of contents

## How _Giscus_ works

[Giscus uses the GitHub API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works) to read and store comments made by _GitHub_ users in the `Discussions` associated with a repository.

Embed the _Giscus_ client-side script bundle on your site, configure it with the correct repository URL, and users can view and write comments when logged into _GitHub_.

The approach is serverless, as the comments are stored on _GitHub_ and dynamically loaded from there on the client side, making it perfect for a static blog like _AstroPaper_.

## Setting up _Giscus_

_Giscus_ can be set up easily on [giscus.app](https://giscus.app/), but I will outline the process briefly.

### Prerequisites

The prerequisites for getting _Giscus_ working are:

- The repository is [public](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public).
- The [Giscus app](https://github.com/apps/giscus) is installed.
- The [Discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) feature is turned on for your repository.

If any of these conditions cannot be fulfilled, _Giscus_ cannot be integrated.

### Configuring _Giscus_

In most cases, the preselected defaults are suitable, and you should only modify them if you have a specific reason. You can always adjust the configuration later.

You need to:

- Select the right language for the UI.
- Specify the _GitHub_ repository you want to connect, typically the repository containing your statically hosted _AstroPaper_ blog on _GitHub Pages_.
- Create and set an `Announcement` type discussion on _GitHub_ if you want to prevent people from creating random comments directly on _GitHub_.
- Define the color scheme.

After configuring the settings, _Giscus_ provides a generated `<script>` tag for the next steps.

## Simple script tag

The generated script tag should look like this:

```html
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

Add the tag to the source code of the site. If you are using _AstroPaper_ and want to enable comments on posts, navigate to `src/pages/posts/[...slug]/index.astro` and paste it where you want the comments to appear, perhaps underneath the “Share this post” buttons.

_AstroPaper_ uses Astro's [client-side routing](https://docs.astro.build/en/guides/view-transitions/), so a script runs only once by default. Add `data-astro-rerun` to the script tag so comments load again when navigating to another post.

```astro
<ShareLinks />

<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-astro-rerun></script>

<hr class="my-8 border-dashed" />
```

You have now integrated comments into _AstroPaper_.

## React component with light/dark theme

The embedded script tag has a static _Giscus_ configuration, including its `theme`. Since _AstroPaper_ features a light/dark theme toggle, it is useful for comments to transition between light and dark themes with the rest of the site. A more sophisticated embedding approach is required.

First, install the [React component](https://www.npmjs.com/package/@giscus/react) for _Giscus_:

```bash
pnpm astro add react
pnpm add @giscus/react
```

Then create a `Comments.tsx` React component in `src/components`:

```tsx
import Giscus, { type GiscusProps, type Theme } from "@giscus/react";
import { useEffect, useState } from "react";

const GISCUS: GiscusProps = {
  repo: "[ENTER REPO HERE]",
  repoId: "[ENTER REPO ID HERE]",
  category: "[ENTER CATEGORY NAME HERE]",
  categoryId: "[ENTER CATEGORY ID HERE]",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme);
    });

    observer.observe(root, { attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "dark" ? darkTheme : lightTheme} {...GISCUS} />
    </div>
  );
}
```

This _React_ component wraps the native _Giscus_ component and introduces `lightTheme` and `darkTheme` props. _AstroPaper_ sets the current theme as `data-theme` on the `<html>` element, so the component watches that attribute and switches between dark and light themes whenever the site theme changes.

The `GISCUS` config at the top of the file holds the values from [giscus.app](https://giscus.app/). Do not specify a `theme` there if you want the `lightTheme` and `darkTheme` props to control the appearance.

To complete the process, add the new Comments component to `src/pages/posts/[...slug]/index.astro`, replacing the script tag from the previous step:

```astro
---
// ...
import Comments from "@/components/Comments";
// ...
---

<ShareLinks />

<Comments client:only="react" />

<hr class="my-8 border-dashed" />
```

And that's it!
