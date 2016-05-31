$(document).ready(function() {
  getWhitelist(function(whitelist) {
    var text = '// enter one email per line';
    $.each(Object.keys(whitelist), function(index, email) {
      text += '\n' + email;
    })
    
    $('textarea').text(text);
  })
  
  $('#save').click(function(e) {
    var text = $('textarea')[0].value;
    var newList = {};
    var lines = text.split('\n');
    $.each(lines, function(index, line) {
      line = line.trim();
      if (line.startsWith('//') || !line.length)
        return;
      newList[line] = true;
    })
    saveWhitelist(newList, function() {
      chrome.app.window.current().close();
    })
  });
})

