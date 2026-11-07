---
author: Mengyang Yang
pubDatetime: 2022-09-23T15:22:00.000Z
modDatetime: 2026-11-01T10:00:00.000Z
title: "Adding new posts in AstroPaper theme"
featured: false
draft: false
tags:
  - docs
  - astro
  - blog
description: "Some rules & recommendations for creating or adding new posts using AstroPaper theme."
---

This guide covers the rules and conventions for creating new posts in AstroPaper: file placement, frontmatter fields, images, and syntax highlighting.

![Photo by Pixabay](https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

_Photo by [Pixabay](https://www.pexels.com/photo/brown-wooden-desk-159618/)_

## Table of contents

## Creating a Blog Post

To write a new blog post, create a Markdown or MDX file inside the `src/content/posts/` directory.

You can organize posts into subdirectories to make content easier to manage. The subdirectory name becomes part of the post URL:

```text
src/content/posts/very-first-post.md          -> mysite.com/posts/very-first-post
src/content/posts/2025/example-post.md        -> mysite.com/posts/2025/example-post
src/content/posts/_2026/another-post.md       -> mysite.com/posts/another-post
src/content/posts/docs/_legacy/how-to.md      -> mysite.com/posts/docs/how-to
src/content/posts/Example Dir/Dummy Post.md   -> mysite.com/posts/example-dir/dummy-post
```

If you want a subdirectory for organization only, without affecting the URL, prefix the folder name with an underscore (`_`). A file whose name starts with `_` is not loaded as a post, so it can be used for notes or partial content. To keep a post unpublished, set `draft: true` in its frontmatter.

## Frontmatter

Frontmatter is the main place to store metadata about a blog post. It lives at the top of the file in YAML format. Read more about frontmatter in the [Astro documentation](https://docs.astro.build/en/guides/markdown-content/).

| Property         | Description                                                        | Remark                      |
| ---------------- | ------------------------------------------------------------------ | --------------------------- |
| **title**        | Title of the post.                                                 | Required                    |
| **description**  | Description of the post, used in the excerpt and site description. | Required                    |
| **pubDatetime**  | Published datetime in ISO 8601 format.                             | Required                    |
| **modDatetime**  | Modified datetime in ISO 8601 format.                              | Optional                    |
| **author**       | Author of the post.                                                | Defaults to the site author |
| **featured**     | Whether to display the post in the featured section.               | Defaults to `false`         |
| **draft**        | Whether the post is unpublished.                                   | Defaults to `false`         |
| **tags**         | Related keywords in YAML array format.                             | Defaults to `others`        |
| **ogImage**      | Image used for social sharing and SEO.                             | Optional                    |
| **canonicalURL** | Absolute canonical URL when the article exists elsewhere.          | Optional                    |
| **hideEditPost** | Whether to hide the edit-post button.                              | Optional                    |
| **timezone**     | IANA timezone for this post.                                       | Optional                    |

Only `title`, `description`, and `pubDatetime` must be specified. Meaningful titles and descriptions are especially important for search engine optimization.

### Sample Frontmatter

```yaml
---
title: The title of the post
author: your name
pubDatetime: 2022-09-21T05:17:19Z
featured: true
draft: false
tags:
  - some
  - example
  - tags
ogImage: ../../assets/images/example.png
description: This is the example description of the example post.
canonicalURL: https://example.org/my-article-was-already-posted-here
---
```

## Callouts

AstroPaper supports callouts using blockquote syntax:

> [!NOTE]
> Supplementary information the reader should be aware of.

> [!TIP]
> Helpful advice, shortcuts, or best practices.

> [!WARNING]
> Something that could go wrong or have unintended consequences.

> [!DANGER]
> Serious risk of failure, data loss, or incorrect behavior.

The full list includes `NOTE`, `ABSTRACT`, `INFO`, `TODO`, `TIP`, `SUCCESS`, `QUESTION`, `WARNING`, `FAILURE`, `DANGER`, `BUG`, `EXAMPLE`, and `QUOTE`. Add `-` after the type to collapse a callout by default, or `+` to make it expanded but collapsible.

## Images

Images can be remote URLs, files in `src/assets/`, or files in the `public/` directory:

```markdown
![Alt text](https://example.org/image.jpg)
![Alt text](../../assets/images/example.png)
![Alt text](/images/example.png)
```

Use descriptive alternative text for accessibility. Images imported from `src/assets/` are processed by Astro, while files in `public/` are served as-is.

## Links

Use standard Markdown links for external pages:

```markdown
[Astro documentation](https://docs.astro.build/)
```

For links to posts, use the post URL rather than a hard-coded filesystem path.

## Code Blocks

Use fenced code blocks and specify the language for syntax highlighting:

```ts
const greeting = "Hello, AstroPaper!";
console.log(greeting);
```

You can also add a title to a code block when the project configuration supports it:

```ts title="src/example.ts"
export const example = true;
```

## VS Code Snippets

AstroPaper includes workspace snippets for creating posts:

- **frontmatter** inserts the recommended frontmatter block.
- **template** inserts a basic post template, including a table of contents.

These snippets are available in `.vscode/astro-paper.code-snippets` when the workspace is opened in VS Code or Cursor.

## Final Checklist

Before publishing a post, make sure that:

- The file is inside `src/content/posts/`.
- The filename and URL are readable and use the expected slug.
- Required frontmatter fields are present and valid.
- The description accurately summarizes the article.
- Images have useful alt text.
- Draft posts have `draft: true`.
- Code blocks specify their language.
