---
author: Mengyang Yang
pubDatetime: 2026-10-27T00:00:00.000Z
title: "How do I convert Markdown to EPUB using Pandoc?"
featured: false
draft: false
tags:
  - tools
  - cli
  - markdown
  - epub
description: "A practical guide to converting a Markdown article into an EPUB ebook with Pandoc for reading on iPhone, iPad, and Mac."
---

# Why Convert Markdown to EPUB?

Markdown is a convenient way to write. It can express headings, emphasis, links, blockquotes, lists, and code blocks without requiring a visual editor. EPUB, on the other hand, is designed for reading: the content can reflow to fit an iPhone, iPad, Mac, or another reading device.

I wanted a simple workflow:

```text
Markdown article → EPUB ebook → Apple Books
```

The result can be read like an ordinary ebook while remaining easy to edit as Markdown.

# EPUB Is Not an Apple-Only Format

EPUB is an open ebook standard, not an Apple-specific format. Apple Books supports it, but so do many other ebook readers and services.

Apple has used formats such as `.ibooks` for interactive books made with iBooks Author, but a normal article does not need that format. For a personal reading workflow, EPUB is the more portable choice.

# Does Pandoc Remove Markdown Formatting?

No. Pandoc does not simply copy the text and discard the Markdown syntax. It parses the structure of the Markdown document and converts it into the HTML, CSS, metadata, and navigation files inside an EPUB package.

For example:

````markdown
# A heading

This is **bold text**.

```swift
print("Hello")
```
````

is converted conceptually into:

```html
<h1>A heading</h1>
<p>This is <strong>bold text</strong>.</p>
<pre><code class="language-swift">print("Hello")</code></pre>
```

Headings remain headings, bold text remains bold, and code blocks remain code blocks. The Markdown markers themselves are removed because the EPUB contains the rendered document structure instead.

# Installing Pandoc on macOS

If Homebrew is already installed, Pandoc can be installed from Terminal:

```bash
brew install pandoc
```

Verify the installation:

```bash
pandoc --version
```

# A Minimal Markdown Source

An article can include a YAML metadata block at the beginning:

```markdown
---
title: "My Article"
author: "My Name"
language: en-US
---

# Introduction

This is the article content.
```

The metadata block is optional when the title is supplied in the command, but including it makes the source document more self-contained.

# The Recommended Conversion Command

For a Markdown file in a folder such as `FirstArticle`, use:

```bash
cd /Users/a1234/Desktop/FirstArticle && printf '%s\n' 'h1 { page-break-before: avoid; }' > /tmp/epub-clean.css && pandoc \
  "article.md" \
  -o "article.epub" \
  --to=epub3 \
  --epub-title-page=false \
  --css=/tmp/epub-clean.css \
  --metadata title="My Article"
```

Replace `article.md` and `article.epub` with the actual filenames.

This command deliberately does not include `--toc`. That option creates a visible table-of-contents section in the book. EPUB will still contain internal navigation based on headings, but it will not add a separate table-of-contents page to the reading flow.

The command also disables Pandoc's separate title page. The small temporary stylesheet prevents the first heading from being forced onto a new page after the title page has been removed. This avoids unnecessary blank pages in Apple Books and other readers.

# What Is EPUB 3?

EPUB 3 is the modern version of the EPUB standard. It uses web technologies such as HTML and CSS and supports semantic headings, reflowable layouts, accessibility features, SVG, and richer media.

For a normal article, EPUB 3 is the sensible default:

```bash
--to=epub3
```

The content will reflow when the reader changes the font size or opens the book on a different screen. EPUB 3 does not mean that every book has a fixed visual layout; ordinary articles remain flexible and readable.

# Adding a Cover

Pandoc can add a cover image:

```bash
pandoc article.md \
  -o article.epub \
  --to=epub3 \
  --epub-title-page=false \
  --epub-cover-image=cover.jpg
```

A practical personal-use cover size is around `800 × 1000` pixels, or another vertical image with a similar ratio. Pandoc recommends keeping the image below 1000 pixels in width and height, which also keeps the EPUB reasonably small.

# Do I Need a CSS File?

No. Pandoc supplies a default stylesheet, and Apple Books lets the reader adjust the font, font size, spacing, and background.

For a plain article, the default style is usually enough. A custom CSS file is useful only when the default result needs changes such as a different heading style, code-block background, image width, or line spacing.

The small `/tmp/epub-clean.css` file in the recommended command is not a full design stylesheet. It only overrides the page-break behavior that can produce blank pages. It is temporary and does not need to be stored with the article.

# Links Must Use Complete URLs

Markdown links should use a complete URL when the EPUB is expected to open a web page:

```markdown
[BrainGrid](https://braingrid.ai)
```

This is unreliable in an EPUB:

```markdown
[BrainGrid](www.braingrid.ai)
```

Without `https://`, the reader may interpret the target as a relative path inside the EPUB instead of as a website.

The same applies to links that are relative to a website. This link:

```markdown
[An article](/blog/example)
```

may work on the original website, but it is not a complete web URL in an EPUB. Use the full address:

```markdown
[An article](https://braingrid.ai/blog/example)
```

After conversion, it is worth checking that external links in the generated EPUB still start with `https://`.

# Calibre or Sigil?

Pandoc is enough when the main job is converting Markdown to EPUB.

Calibre is a larger ebook library manager. It is useful for organizing many books, editing metadata, and converting between ebook formats. Calibre itself does not run as a full iPhone or iPad ebook app; it can serve a library from a Mac, while the actual reading can happen in another app.

Sigil is a dedicated EPUB editor. It is useful for inspecting and manually editing the EPUB's XHTML, CSS, metadata, and navigation. It supports EPUB 2 and EPUB 3 and runs on macOS, Windows, and Linux, but it is not an iPhone or iPad editor.

For this workflow, the simplest combination is:

```text
Pandoc → create the EPUB
Sigil → adjust the EPUB only when necessary
Apple Books → read it on iPhone, iPad, and Mac
```

# A Repeatable Folder Workflow

Each article can have its own folder:

```text
FirstArticle/
├── article.md
└── article.epub

SecondArticle/
├── article.md
└── article.epub
```

For a second article, change the folder and filenames in the same command:

```bash
cd /Users/a1234/Desktop/SecondArticle && printf '%s\n' 'h1 { page-break-before: avoid; }' > /tmp/epub-clean.css && pandoc \
  "article.md" \
  -o "article.epub" \
  --to=epub3 \
  --epub-title-page=false \
  --css=/tmp/epub-clean.css \
  --metadata title="My Second Article"
```

The generated EPUB stays beside its Markdown source, and the original source remains easy to edit and convert again.

# Final Checklist

Before opening the book in Apple Books, check:

- The output format is EPUB 3.
- `--toc` is omitted if a visible contents page is not wanted.
- `--epub-title-page=false` is used for a single-article ebook.
- The temporary page-break CSS is included if blank pages appear.
- External links use complete `https://` URLs.
- The EPUB is generated in the same folder as the source Markdown file.

This keeps the workflow simple: write in Markdown, convert with Pandoc, and read the resulting EPUB on Apple devices.
