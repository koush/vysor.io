## Change Log

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
