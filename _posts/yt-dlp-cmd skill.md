---
title: "How to Download the video using yt-dlp"
excerpt: "这个 Skill 提供下载 YouTube 和 Bilibili 视频的命令，帮助你更高效地使用 yt-dlp（命令已经适配中国大陆和其他国家）"
coverImage: "/assets/blog/markdown-reference/book.jpg"
date: "2026-10-14"
author:
  name: "mengyang"
  picture: "/assets/blog/authors/mengyang_avatar.png"
ogImage:
  url: "/assets/blog/markdown-reference/book.jpg"
---

# Content and Background

[YouTube](https://www.youtube.com) and [Bilibili](https://www.bilibili.com) are my favorite platforms. You can watch good videos online, but can we download the video on my devices? Yes, there is an open-source repository called `yt-dlp`. It is a feature-rich command-line audio and video downloader that supports thousands of websites. However, its learning curve is quite steep.

# Research

I read through the repository carefully, but I found it difficult to use. We don't need to master everything, just like not every player needs to reach the Grandmaster or Challenger rank in [League of Legends](https://www.leagueoflegends.com/en-sg/), right?

We only need to learn what we need, and that is enough. For me, there are two main use cases:

**1. Download a single video**, **2. Download a playlist**

After several rounds of discussion with AI, I learned how to do it, and now I want to share what I learned with you.

# Getting Started

**Downloading the Skill is pretty simple 🙌**

## Grok User

[Click this link to download](https://grok.com/skill-link/29325ffc3dc51588fee9f5dc389e6ab1) and follow the instructions.

## Other User

Before writing this article, I tested DeepSeek, Gemini, Claude, and ChatGPT. I found them less convenient than Grok. However, you can try the following prompt:

```
Read this article and give me the correct yt-dlp command for this URL:
[article link]
```

Replace `[article link]` with the URL of this article. Whether this works depends on whether your AI assistant can access the article link.

## I don't use AI 

Here are the commands. Prepare a single video URL or playlist URL, and replace the Chinese placeholders with your own URL.


### I'm in mainland China or using a VPN to watch YouTube

**Single video:**

Make sure that your VPN tool's proxy address and port match the values used in the command below.

Make sure that both `yt-dlp` and FFmpeg are installed and available in your terminal. The proxy address and port below are examples. Replace them with the HTTP proxy address and port used by your VPN tool. If your proxy uses SOCKS5, replace `http://` with the appropriate `socks5://` URL.

```bash
cd ~/Desktop
yt-dlp --impersonate chrome --proxy "http://127.0.0.1:1082" -f "bv*+ba[ext=m4a]/b" --merge-output-format mp4 "视频网址"
```

**Playlist:**

```bash
cd ~/Desktop
yt-dlp --impersonate chrome --proxy "http://127.0.0.1:1082" --cookies-from-browser chrome --extractor-args "youtube:player_client=default,web_embedded" --no-write-subs --ignore-errors --download-archive youtube-archive.txt --sleep-interval 5 --max-sleep-interval 15 --retries 10 --fragment-retries 10 --restrict-filenames -f "bv*+ba[ext=m4a]/b[ext=mp4]/b" --merge-output-format mp4 -o "%(playlist)s/%(playlist_index)03d - %(title)s [%(id)s].%(ext)s" "播放列表网址"
```

The `--ignore-errors` option allows the playlist download to continue when one video fails. Check the terminal output afterward for skipped videos.

### I am a foreign user living outside mainland China

**For YouTube:**

**Single video:**

```bash
cd ~/Desktop
yt-dlp --impersonate chrome -f "bv*+ba[ext=m4a]/b" --merge-output-format mp4 "视频网址"
```

**Playlist:**

```bash
cd ~/Desktop
yt-dlp --impersonate chrome --cookies-from-browser chrome --extractor-args "youtube:player_client=default,web_embedded" --no-write-subs --ignore-errors --download-archive youtube-archive.txt --sleep-interval 5 --max-sleep-interval 15 --retries 10 --fragment-retries 10 --restrict-filenames -f "bv*+ba[ext=m4a]/b[ext=mp4]/b" --merge-output-format mp4 -o "%(playlist)s/%(playlist_index)03d - %(title)s [%(id)s].%(ext)s" "播放列表网址"
```
**For Bilibili:**

**Single video:**

```bash
cd ~/Desktop
yt-dlp --cookies-from-browser chrome -f "bv*+ba/b" --merge-output-format mp4 "视频网址"
```
**Playlist:**

```bash
cd ~/Desktop
yt-dlp --cookies-from-browser chrome --ignore-errors --download-archive bili-合集ID.txt --sleep-interval 2 --max-sleep-interval 6 --retries 10 --fragment-retries 10 -f "bv*+ba/b" --merge-output-format mp4 -o "%(playlist_title,playlist)s/%(playlist_autonumber,playlist_index)03d - %(title)s [%(id)s].%(ext)s" "合集网址"
```

The `--cookies-from-browser chrome` option requires you to be logged in to the relevant website in Chrome. yt-dlp also needs permission to read your browser cookies. Do not share your cookies or command output containing private information.

# Related Areticles

Thanks for reading
