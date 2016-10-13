$(document).ready(function() {
  chrome.storage.local.get('vysorSettings', function(data) {
    $('textarea').text(JSON.stringify(data.vysorSettings || vysorDefaultSettings, " ", 2))
  })

  $('#save').click(function() {
    try {
      var value = $('textarea')[0].value;
      var json = JSON.parse(value);
      chrome.storage.local.set({
        vysorSettings: json
      }, function() {
        chrome.app.window.current().close();
      })
    }
    catch (e) {
      $('#error').text(e.message);
    }
  })

  $('#defaults').click(function() {
    $('textarea').text(JSON.stringify(vysorDefaultSettings, " ", 2))
  })

})
