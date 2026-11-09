---
author: Mengyang Yang
pubDatetime: 2022-09-23T04:58:53.000Z
modDatetime: 2026-06-03T00:00:00.000Z
title: "How to configure AstroPaper theme"
featured: false
draft: true
tags:
  - configuration
  - docs
description: "How you can make AstroPaper theme absolutely yours."
---

This guide covers the available configuration options in AstroPaper — from site metadata and feature flags to fonts, social links, and layout settings.

## Table of contents

## Configuring `astro-paper.config.ts`

All site-wide configuration lives in `astro-paper.config.ts` at the root of the project. Use `defineAstroPaperConfig()` to get full IntelliSense support:

```ts
import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://your-site.com/",
    title: "AstroPaper",
    description: "A minimal, responsive and SEO-friendly Astro blog theme.",
    author: "Sat Naing",
    profile: "https://satnaing.dev",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Bangkok",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/satnaing/astro-paper/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/satnaing/astro-paper" },
    { name: "x", url: "https://x.com/username" },
    { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    { name: "mail", url: "mailto:yourmail@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
```

### `site` options

| Option               | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `url`                | Your deployed website URL. Used for canonical URLs, OG image URLs, RSS feed, and sitemap. |
| `title`              | Your site name.                                                                           |
| `description`        | Your site description, useful for SEO and social media sharing.                           |
| `author`             | Your name, used as the default post author.                                               |
| `profile`            | Your personal or portfolio website URL, used for structured data.                         |
| `ogImage`            | Default OG image filename in `/public`, used when no post-specific image is set.          |
| `lang`               | HTML ISO language code for the `<html lang="...">` attribute.                             |
| `timezone`           | IANA timezone for post dates.                                                             |
| `dir`                | Text direction for `<html dir="...">`: `"ltr"`, `"rtl"`, or `"auto"`.                     |
| `googleVerification` | Google Search Console verification meta tag value.                                        |

### `posts` options

| Option                | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| `perPage`             | Number of posts shown per page on paginated listing pages. Defaults to `4`.    |
| `perIndex`            | Number of posts shown in the Recent section on the home page. Defaults to `4`. |
| `scheduledPostMargin` | Deprecated. It has no effect; see the scheduled posts section.                 |

### Scheduled posts

A post with a future `pubDatetime` is left out of the build until its day comes. Publishing goes by day in `site.timezone`, or in the post's own `timezone`. The time of day does not change when the post appears.

This is checked at build time, so a scheduled post appears with the first build on or after its publication day. To publish without pushing, add a daily scheduled build. See [Scheduled posts](https://github.com/satnaing/astro-paper/wiki/Configuration#scheduled-posts) in the wiki.

### `features` options

| Option             | Description                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `lightAndDarkMode` | Enables or disables the light/dark mode toggle. Defaults to `true`.                       |
| `dynamicOgImage`   | Generates a dynamic OG image per post when no `ogImage` is specified. Defaults to `true`. |
| `showArchives`     | Shows the `/archives` page and its header link. Defaults to `true`.                       |
| `showBackButton`   | Shows the “Go back” button on post pages. Defaults to `true`.                             |
| `editPost`         | Controls the “Edit page” link shown under post titles.                                    |
| `search`           | Search provider. `"pagefind"` is the default; set it to `false` to disable search.        |

## Update layout width

The default maximum width for the entire blog is `768px` (`max-w-3xl`). To change it, update the `max-w-app` utility in `src/styles/global.css`:

```css
@utility max-w-app {
  @apply max-w-3xl;
  /* @apply max-w-4xl xl:max-w-5xl; */
}
```

You can explore more `max-width` values in the [Tailwind CSS documentation](https://tailwindcss.com/docs/max-width).

## Configuring logo or title

There are three options for customizing the header branding.

### Option 1: Site title text

The easiest option is to update `site.title` in `astro-paper.config.ts`.

### Option 2: Astro's SVG component

Add an SVG inside `src/assets/`, import it in `Header.astro`, and replace `{config.site.title}` with the imported logo:

```astro
---
import DummyLogo from "@/assets/dummy-logo.svg";
---

<a
  href="/"
  class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
>
  <DummyLogo class="scale-75 dark:invert" />
</a>
```

This approach lets you customize SVG styles, including inverting the logo in dark mode.

### Option 3: Astro's Image component

For a non-SVG logo, add it inside `src/assets/` and import `Image` and the logo in `Header.astro`:

```astro
---
import { Image } from "astro:assets";
import dummyLogo from "@/assets/dummy-logo.png";
---

<a
  href="/"
  class="absolute py-1 text-left text-2xl leading-7 font-semibold whitespace-nowrap sm:static"
>
  <Image src={dummyLogo} alt="My Blog" class="dark:invert" />
</a>
```

## Configuring social links

Social links are configured in the `socials` array inside `astro-paper.config.ts`. Each entry requires a `name` matching an SVG filename in `src/assets/icons/socials/` and a `url`:

```ts
export default defineAstroPaperConfig({
  socials: [
    { name: "github", url: "https://github.com/satnaing/astro-paper" },
    { name: "x", url: "https://x.com/username" },
    { name: "linkedin", url: "https://www.linkedin.com/in/username/" },
    { name: "mail", url: "mailto:yourmail@gmail.com" },
  ],
});
```

To add a social network not included by default, add its SVG icon to `src/assets/icons/socials/` and add an entry to the array. The `name` must match the SVG filename without the `.svg` extension.

## Configuring share links

Share links are configured in the `shareLinks` array. Each entry requires a `name` matching an SVG in `src/assets/icons/socials/` and a base `url` to which the post URL is appended:

```ts
export default defineAstroPaperConfig({
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
```

## Configuring fonts

AstroPaper uses Astro's [fonts API](https://docs.astro.build/en/guides/fonts/) with [Google Sans Code](https://fonts.google.com/specimen/Google+Sans+Code) as the default font. It provides consistent typography with automatic font optimizations such as preloading and caching.

### Using the default font

The font is configured in `astro.config.ts` and loaded in `Layout.astro`. No additional configuration is needed.

### Customizing the font

To use a different font, update these four places.

1. Update the font configuration in `astro.config.ts`:

   ```ts
   import { defineConfig, fontProviders } from "astro/config";

   export default defineConfig({
     fonts: [
       {
         name: "Your Font Name",
         cssVariable: "--font-your-font",
         provider: fontProviders.google(),
         fallbacks: ["monospace"],
         weights: [300, 400, 500, 600, 700],
         styles: ["normal", "italic"],
         formats: ["woff", "ttf"],
       },
     ],
   });
   ```

2. Update the `Font` component in `Layout.astro`:

   ```astro
   ---
   import { Font } from "astro:assets";
   ---

   <head>
     <Font
       cssVariable="--font-your-font"
       preload={[{ subset: "latin", weight: 400, style: "normal" }]}
     />
   </head>
   ```

3. Update the CSS variable mapping in `src/styles/theme.css`:

   ```css
   @theme inline {
     --font-app: var(--font-your-font);
   }
   ```

   The `--font-app` variable is used throughout the theme via the `font-app` Tailwind utility class.

4. Update the OG image routes in `src/pages/og.png.ts` and `src/pages/posts/[...slug]/index.png.ts`:

   ```ts
   const fonts = fontData["--font-your-font"];
   ```

   Otherwise, `astro check` fails because the old font variable no longer exists.

> [!WARNING]
> Make sure the font name matches exactly as it appears on [Google Fonts](https://fonts.google.com). For other providers or local fonts, refer to the [Astro Fonts documentation](https://docs.astro.build/en/guides/fonts/).

## See also

- [Customizing AstroPaper theme color schemes](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/) — change or add color schemes via `src/styles/theme.css`.
- [Adding new posts](https://astro-paper.pages.dev/posts/adding-new-posts-in-astropaper-theme/) — frontmatter reference and file conventions.
