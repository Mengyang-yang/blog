---
author: Mengyang Yang
pubDatetime: 2026-10-27T00:00:00.000Z
title: "How to Create a Custom DMG Installer for macOS"
featured: false
draft: false
tags:
  - tools
  - cli
  - mac
description: "A practical guide to creating a branded macOS DMG installer with create-dmg, including custom backgrounds, icon placement, troubleshooting files, and testing."
---

# What Is a DMG Installer?

macOS applications are often distributed as `.app` bundles. A `.dmg` file is a disk image that provides a convenient way to distribute an application and show installation instructions.

The most familiar DMG layout contains:

```text
YourApp.app  →  Applications
```

The user opens the DMG, drags the application to the Applications folder, and then launches it from macOS.

A DMG is not required for every application. A `.app` can be distributed directly, and a `.zip` file is also a simple option. However, a custom DMG is useful when you want to provide a clear installation experience, add your own branding, or include a troubleshooting document.

# What Does `create-dmg` Do?

[`create-dmg`](https://github.com/create-dmg/create-dmg) creates a Finder-style DMG window from a source folder. It can configure:

- The volume name
- The background image
- The window size and position
- The icon size
- The position of application and document icons
- A link to the `/Applications` folder
- Whether a file extension is visible

It does not work like a visual design tool. Text, watermarks, logos, and arrows should be designed in the background image before creating the DMG.

# Designing the Background Image

For a simple installer, an `800 × 500` background image works well. Use the same dimensions for the Finder window:

```text
Background image: 800 × 500
DMG window:       800 × 500
```

The background image can contain:

- The application name
- A short installation instruction
- A watermark or author name
- Copyright information
- An arrow showing the drag direction
- A version number

The application icon, Applications icon, and troubleshooting document are added separately by `create-dmg`. Leave enough empty space in the background image so these icons do not cover the text.

For a clean layout, place the title near the top, the installation instruction above the icons, and the author or copyright information near the bottom. Keep the important text large enough to remain readable on both Retina and non-Retina displays.

For example:

```text
Welcome to YourApp

Drag the application to Applications to install

YourApp.app       Applications       Troubleshooting.md

Made by Your Name · v1.0.0
```

The background is an image, not a responsive web page. It is therefore best to preview the generated DMG on the Mac that you use for development and then test it in a virtual machine as well.

# Installing `create-dmg`

If Homebrew is installed, install `create-dmg` with:

```bash
brew install create-dmg
```

Check the installation:

```bash
create-dmg --help
```

The command syntax can vary slightly between versions. In particular, check the `--add-file` option before using it:

```bash
create-dmg --help | grep -E "add-file|app-drop-link"
```

# Preparing the Files

Keep the application, background image, and troubleshooting document in one working directory:

```text
YourAppDMG/
├── YourApp.app
├── background.png
└── Troubleshooting.md
```

The working directory does not need to contain a `payload` folder. The application can be passed as the source item, and the troubleshooting document can be added separately with `--add-file`.

For example:

```bash
mkdir -p ~/Desktop/YourAppDMG
cd ~/Desktop/YourAppDMG
```

The application must be a real `.app` bundle. Do not copy only the executable from inside the bundle.

# Creating the DMG

The following command creates a DMG with a background image, an Applications drop link, and a troubleshooting document:

```bash
cd ~/Desktop/YourAppDMG

rm -f "YourApp.dmg"

create-dmg \
  --volname "YourApp Installer" \
  --background "$HOME/Desktop/YourAppDMG/background.png" \
  --window-pos 200 120 \
  --window-size 800 500 \
  --icon-size 90 \
  --icon "YourApp.app" 220 300 \
  --add-file "Troubleshooting.md" "Troubleshooting.md" 690 300 \
  --app-drop-link 580 300 \
  --hide-extension "YourApp.app" \
  --overwrite \
  "YourApp.dmg" \
  "YourApp.app"
```

The important positions in this layout are:

```text
YourApp.app:       220 300
Applications:      580 300
Troubleshooting:   690 300
Icon size:         90
Window size:       800 × 500
```

The `--add-file` option uses this format:

```bash
--add-file <display_name> <source_file> <x> <y>
```

For example:

```bash
--add-file "疑难解答.md" "疑难解答.md" 690 300
```

The first filename is the name displayed in the DMG, the second is the source file in the current directory, and the last two values are the icon coordinates.

The coordinates start from the top-left of the DMG window. Increasing the second coordinate moves an item down. Therefore, a value such as `700 110` places a document near the upper-right area, while `690 300` aligns it horizontally with the other icons.

# Checking the Result

Open the generated DMG:

```bash
open "$HOME/Desktop/YourAppDMG/YourApp.dmg"
```

Check the following:

1. The background image is visible and the text is not covered.
2. The application, Applications link, and troubleshooting document are aligned.
3. The application can be dragged to Applications.
4. The troubleshooting document opens correctly.
5. The copied application can be launched from `/Applications`.
6. The DMG can be ejected after installation.

When regenerating a DMG, close its Finder window and eject the mounted volume first. Then remove the old output file before creating a new one:

```bash
rm -f "YourApp.dmg"
```

If an old volume remains mounted, inspect the mounted disk images:

```bash
hdiutil info
```

Then eject the relevant device:

```bash
hdiutil detach /dev/diskX
```

Replace `/dev/diskX` with the device shown by `hdiutil info`.

# Testing in a Virtual Machine

Copy the final DMG into a virtual machine instead of testing only a file shared directly from the host Mac.

A useful test is:

1. Open the DMG in the virtual machine.
2. Drag the application to Applications.
3. Eject the DMG.
4. Delete the DMG.
5. Launch the application from Applications.
6. Open the troubleshooting document if the first launch is blocked.

This verifies that the DMG contains a complete application and does not accidentally depend on files on the host computer.

# Unsigned Applications and Gatekeeper

An unsigned application can still be placed in a DMG and installed. However, macOS may show a warning when the user opens it for the first time:

> macOS cannot verify the developer of this application.

For a small private test, the user can usually right-click the application in Applications, choose **Open**, and confirm the warning. Depending on the macOS version, the user may also need to open **System Settings → Privacy & Security** and choose **Open Anyway**.

This is less convenient for people who are not familiar with macOS. For public distribution, sign the application with a Developer ID certificate and submit it for Apple notarization. Signing and notarization improve the first-launch experience, but they do not change the DMG layout itself.

# DMG Installer or Double-Click Installer?

The drag-and-drop DMG described here is different from a DMG that contains an `Install.app`.

With a drag-and-drop DMG:

```text
YourApp.app  →  Applications
```

The Finder performs the installation by copying the application.

With a double-click installer:

```text
Install.app
```

The installer application contains the actual installation logic. It may copy files, request permissions, configure system components, or run post-install steps. `create-dmg` can package an existing installer, but it does not turn an ordinary application into an installer automatically.

For most simple macOS applications, the drag-and-drop approach is clearer, easier to maintain, and less likely to fail.

# Copyright and Distribution

A custom DMG should be used for software that you created or are authorized to distribute. A new background image, watermark, or volume name does not grant permission to repackage a third-party application.

Before sharing an application, confirm that:

- You have permission to distribute it.
- The application and its bundled components follow their licenses.
- Your branding does not imply ownership of software made by someone else.
- The troubleshooting instructions accurately describe your own distribution.

For a personal project or an application you control, a custom background and a clear troubleshooting document can make a simple DMG installer much easier for new Mac users to understand.
