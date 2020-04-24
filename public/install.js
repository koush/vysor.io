function openDownload(ret) {
  window.location = '/download?return=' + (ret ? ret : encodeURIComponent(window.location.toString()));
}
