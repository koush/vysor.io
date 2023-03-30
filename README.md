# Vysor - Mirror and Control your Phone

## Discord Support
  * Invite Link: https://discord.gg/gYkX5G52SU

# Downloads:
 * [Windows](http://nuts.vysor.io/download/win)
 * [Mac](http://nuts.vysor.io/download/mac)
 * [Linux](http://nuts.vysor.io/download/linux_deb)
   * The Linux download is a deb that will not autoupdate. [Setting up the apt repository](https://www.vysor.io/download/linux) is recommended for automatic updates.
 * [ChromeOS, Browser, Progressive Web App](https://app.vysor.io)
 * Android APK
   * [Google Play](https://play.google.com/store/apps/details?id=com.koushikdutta.vysor&hl=en_US)
   * [Direct Download](https://app.vysor.io/Vysor-release.apk)
 * [Command Line Tool](https://github.com/koush/vysor-cli#readme)

![vysor-desktop-shrunk](https://user-images.githubusercontent.com/73924/121391226-fc99fd80-c902-11eb-90bc-562fa8a49cc8.jpg)

## Change Log

### 4.1.x iOS Mirroring on Windows/Linux
 * Screen Mirroring
 * Audio Mirroring
 * Control via Bluetooth Keyboard/Mouse with the [Vysor Dongle](https://github.com/koush/vysor.io/wiki/Vysor-Dongle)

### 4.0.x - iOS Mirroring on Mac
 * Screen Mirroring
 * Audio Mirroring
 * Control via Bluetooth Keyboard/Mouse emulation

### 3.2.x - Vysor Notification Mirroring

This update adds support for mirroring Android notifications to the desktop. https://twitter.com/vysorapp/status/1304952083578150912

### v3.1.x - Vysor Audio Mirroring

This update adds support for [Android 10's built in Audio Mirroring](https://github.com/koush/vysor.io/issues/582#issuecomment-673289617). Vysor no longer requires Chromecast emulation to mirror audio.

### v3.0.x - Vysor in the browser ([app.vysor.io](https://app.vysor.io))

Despite being the third version, this is the first real major revision of Vysor. There are innumerable fixes, improvements, and I'm sure bugs. Please report them in the issue tracker.

1. Both native and Chrome apps (which were killed) have been completely rewritten to support installation as a progressive web app. Vysor is available in any browser that supports WebUSB.
2. There's a new video decoder that uses WebAssembly. This is a reliable alternative to the native NaCL and PNaCL decoders that are also available. It can be found in device settings. May resolve black screen issues for some users.
3. Detect usage of the h264 main profile and suggest an automatic fix (another black screen issue).
4. The UI has been overhauled.
5. Vysor Share has had performance improvements and reliability fixes.
6. Vysor Audio has been updated to support AudioWorklets, which fixes the audio drift.
7. Vysor now has a system tray that lists connected devices.
8. Native apps now have a full frameless window option. Pin the title bar and remove the navigation keys to have a bare window with only the device screen.
9. Vysor can now be embedded into other websites via iframe. This can be useful for setting up presentations or testing tools. Url format: https://app.vysor.io/#/device/[serial-number]
