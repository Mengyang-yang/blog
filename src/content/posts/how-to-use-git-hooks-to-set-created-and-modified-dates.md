---
author: Mengyang Yang
pubDatetime: 2024-01-03T20:40:08.000Z
modDatetime: 2026-11-01T10:00:00.000Z
title: "How to use Git Hooks to set Created and Modified Dates"
featured: false
draft: false
tags:
  - docs
  - FAQ
description: "How to use Git Hooks to set your Created and Modified Dates on AstroPaper"
---

In this post I will explain how to use the pre-commit Git hook to automate the input of the created (`pubDatetime`) and modified (`modDatetime`) dates in the AstroPaper blog theme.

## Table of contents

## Have them Everywhere

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are great for automating tasks like [adding](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea) or [checking](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e) the branch name in commit messages or [stopping you from committing plain-text secrets](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000). Their biggest flaw is that client-side hooks are per machine.

You can get around this by having a `hooks` directory and manually copying hooks to the `.git/hooks` directory or setting up a symlink, but this requires you to remember to set it up.

As this project uses npm, we can use a package called [Husky](https://typicode.github.io/husky/) to install the hooks automatically.

> Update! In AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0), the pre-commit hook was removed in favor of GitHub Actions. However, you can easily [install Husky](https://typicode.github.io/husky/get-started.html) yourself.

## The Hook

To run the hook as we commit code and update the dates as part of the change, we will use the `pre-commit` hook. After installing Husky, run `npx husky init`. This creates a `.husky/pre-commit` file with a placeholder command.

Replace that placeholder in `.husky/pre-commit` with one or both of the following snippets.

### Updating the modified date when a file is edited

---

**Update:** This section has been updated with a smarter version of the hook. It will not increment `modDatetime` until the post is published. On the first publish, set the draft status to `first` and watch the magic happen.

---

```shell
# Modified files, update the modDatetime
git diff --cached --name-status |
grep -Ei '^M.*\.mdx?$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat "$file" | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp "$file"
    git add "$file"
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat "$file" | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp "$file"
    git add "$file"
  fi
done
```

`git diff --cached --name-status` gets the files staged for committing. The output looks like:

```shell
A       src/content/posts/setting-dates-via-git-hooks.md
```

The letter at the start denotes the action taken. In the example above, the file has been added. Modified files have `M`.

We pipe that output into `grep`, looking for lines that start with `M` (`^M`), have any number of characters after that (`.*`), and end with the `.md` or `.mdx` file extension (`\.mdx?$`). This filters out lines that are not modified Markdown files:

```shell
grep -Ei '^M.*\.mdx?$'
```

#### Improvement: More Explicit

This could be adjusted to look only for Markdown files in the `src/content/posts/` directory, as these are the only files that have the expected frontmatter.

The regular expression captures the action and file path. We pipe this list into a `while` loop to iterate over matching lines and assign the values to variables. We ignore the action for now.

To determine the draft status, we use `cat` to read the content, `awk` to split it on the frontmatter separator (`---`) and take the second block, then another `awk` command to find the draft value:

```shell
filecontent=$(cat "$file")
frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

Now we have the value for `draft`, so we do one of three things: set `modDatetime` to now when the draft is false, clear `modDatetime` and set `draft` to false when the draft is `first`, or do nothing in any other case.

The `sed` command looks inside the frontmatter tags (`---`) for the `modDatetime:` key, replaces the full line with the current UTC datetime, writes the result to a temporary file, and moves it over the original file. The updated file is then staged for committing.

#### Note

For `sed` to work, the frontmatter must already have the `modDatetime` key. AstroPaper supports an empty date, as described below.

### Adding the date for new files

Adding the date for a new file is the same process, but this time we look for lines that have been added (`A`) and replace the `pubDatetime` value:

```shell
# New files, add/update the pubDatetime
git diff --cached --name-status | grep -Ei "^A.*\.mdx?$" | while read _ file; do
  cat "$file" | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp "$file"
  git add "$file"
done
```

#### Improvement: Only Loop Once

The action variable could be used to switch inside one loop and either update `modDatetime` or add `pubDatetime`.

## Populating the frontmatter

If your IDE supports snippets, you can create a custom snippet to populate the frontmatter. AstroPaper comes with [a VS Code snippet](https://github.com/satnaing/astro-paper/pull/206) in `.vscode/astro-paper.code-snippets`.

<video autoplay muted controls playsinline class="border border-border">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4" />
</video>

## Empty `modDatetime` changes

To allow Astro to compile the Markdown, it needs to know what is expected in the frontmatter. It does this through the schema in `src/content.config.ts`.

AstroPaper already allows the key to be present with no value, so no change is needed:

```ts
modDatetime: z.date().optional().nullable(),
```

The layouts and the `Datetime.astro` component handle a `null` value as well.
