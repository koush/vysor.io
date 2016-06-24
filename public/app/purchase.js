$(document).ready(function() {
  $('#purchase-options').hide();
  chrome.storage.local.get(['vysorUsage'], function(d) {
    var vysorUsage = d.vysorUsage;
    if (!vysorUsage)
      vysorUsage = 0;
    var hoursUsed = vysorUsage / (60 * 60 * 1000);
    // half hour
    hoursUsed = Math.round(hoursUsed * 2) / 2;
    $('#used').html("<span class='time-highlight'>You've used Vysor for " + hoursUsed + " hours. Support Vysor. Go Pro.</span>")
  });

  function onSkuDetails(response) {
    $.each(response.response.details.inAppProducts, function(index, product) {
      var sku = product.sku;
      var name = product.localeData[0].title;
      var price = product.prices[0];
      var priceText = (price.valueMicros / 1000000) + ' ' + price.currencyCode;
      var ele = $('<tr><td id="sub"></td><td id="price"></td><td><a id="purchase" class="green-icon fa fa-shopping-cart"> Google Wallet</a></td></tr>');
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
    
    var ele = $('<tr><td id="sub"></td><td id="price"></td><td></td></tr>');
    $('#prices').append(ele);
    addPaypal();
    $('#purchase-options-loading h4').hide();
    $('#purchase-options').show();
  }
  
  function addPaypal() {
    
    var ele = $('<tr><td id="sub"></td><td id="price"></td><td><a id="purchase" class="green-icon fa fa-shopping-cart"> PayPal</a></td></tr>');
    ele.find('#sub').text('Lifetime Pass')
    ele.find('#price').text('39.99 USD');
    ele.find('#purchase').click(function() {
      chrome.identity.getAuthToken({
        interactive: true,
        scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
      }, function(token) {
        var url = 'https://clockworkbilling.appspot.com/api/v1/paypalorder/koushd@gmail.com/vysor.lifetime?return_url=https://vysor.clockworkmod.com/purchase&sandbox=false&token=' + token;
        chrome.browser.openTab({url: url});
        chrome.app.window.current().close();        
      }.bind(this));
    })
    $('#prices').append(ele);
  }

  function onSkuDetailsFail() {
    console.log(arguments);
    $('#purchase-options-loading h4').html('Chrome Web Store subscription pricing unavailable.<br/>Please make ensure you are <a href="https://www.google.com/chrome/browser/signin.html" target="_blank">logged into Chrome</a><br/>and <a href="https://developer.chrome.com/webstore/pricing#seller" target="_blank">your country supports Chrome Web Store payments</a>.<br/>Alternatively, you may purchase the Lifetime Pass through PayPal.')
    $('#purchase-options').show();
    
    addPaypal();
  }

  google.payments.inapp.getSkuDetails({
  'parameters': {'env': 'prod'},
  'success': onSkuDetails,
  'failure': onSkuDetailsFail
  });
  
  $('#retrieve').click(function() {
    chrome.identity.getAuthToken({
      interactive: true,
      // must use the exact same scopes used to submit the license or the token shits
      scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    }, function(token) {
      if (!token) {
        console.log('Unable to get token for retrieve?')
        return;
      }
      
      refreshLicenseManager();
    });
  })
})
