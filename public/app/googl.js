var Googl = function(authorization) {
  this.authorization = authorization;
}

Googl.prototype.shorten = function(url, cb) {
  $.ajax({
      type: 'POST',
      url: "https://www.googleapis.com/urlshortener/v1/url?key=" + this.authorization,
      data: JSON.stringify({
        longUrl: url
      }),
      contentType : 'application/json',
      dataType: "json",
      success: function(data) {
        cb(data.id);
      }
  });
}