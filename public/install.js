function fallbackInstall() {
  window.location = 'https://chrome.google.com/webstore/detail/vysor-beta/gidgenkbbabolejbgbpnhbimgjbffefm?authuser=1'
}
function tryInlineInstall() {
  if (!window.chrome || !window.chrome.webstore || !window.chrome.webstore.install)
    return fallbackInstall();

  chrome.webstore.install('https://chrome.google.com/webstore/detail/gidgenkbbabolejbgbpnhbimgjbffefm',
  fallbackInstall, fallbackInstall)
}
function openDownload(ret) {
  if (ret)
    window.location = '/download?return=' + ret
  else
    window.location = '/download'
}
