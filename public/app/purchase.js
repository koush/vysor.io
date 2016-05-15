$(document).ready(function() {
  chrome.storage.local.get(['vysorUsage'], function(d) {
    // send analytics
    var hoursUsed = d.vysorUsage / (60 * 60 * 1000);
    // half hour
    hoursUsed = Math.round(hoursUsed * 2) / 2;
    $('#used').html("<span class='time-highlight'>" + hoursUsed + " hours of free usage.</span>")
  });

  function onSkuDetails(response) {
    $.each(response.response.details.inAppProducts, function(index, product) {
      var sku = product.sku;
      var name = product.localeData[0].title;
      var price = product.prices[0];
      var priceText = (price.valueMicros / 1000000) + ' ' + price.currencyCode;
      var ele = $('<tr><td id="sub"></td><td id="price"></td><td><a id="purchase" class="green-icon fa fa-shopping-cart"> Buy</a></td></tr>');
      ele.find('#sub').text(name)
      ele.find('#price').text(priceText);
      ele.find('#purchase').click(function() {
        google.payments.inapp.buy({
          'parameters': {'env': 'prod'},
          'sku': sku,
          'success': function() {
            refreshLicenseManager();
            console.log('success', arguments);
          },
          'failure': function() {
            refreshLicenseManager();
             console.log('failure', arguments);
           }
        });
      })
      $('#prices').append(ele);
    });
  }

  function onSkuDetailsFail() {
    console.log(arguments);
  }

  google.payments.inapp.getSkuDetails({
  'parameters': {'env': 'prod'},
  'success': onSkuDetails,
  'failure': onSkuDetailsFail
  });
})
