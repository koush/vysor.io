function selectDevices() {
  chrome.usb.getUserSelectedDevices({
    multiple: true,
    filters: [
      {
      interfaceClass: 0xff,
      interfaceSubclass: 0x42,
      interfaceProtocol: 0x1,
      }
    ]
  }, function(devices) {
    $.each(devices, function(key, device) {
      var vidpid = device.vendorId.toString(16) + ':' + device.productId.toString(16);
      tracker.sendEvent('select-device', vidpid);

      adbServer.refreshDevice(device, function(adb) {
        if (adb) {
          tracker.sendEvent('connect-device', adb.properties['ro.product.name'], device.vendorId.toString(16) + ':' + device.productId.toString(16), vidpid);
        }
        else {

          var appName = chrome.runtime.getManifest().name;
          chrome.notifications.create("reload", {
            type: "basic",
            iconUrl: "/icon.png",
            title: appName,
            message: "An error occurred while connecting to the Android device. Restarting the Vysor app, or disconnecting and reconnecting the Android may resolve this issue.",
            buttons: [
              {
                title: "Reload"
              }
            ]
          });
        }
      });
    })
  });
}

$(document).ready(function() {
  $('#logging-in').hide();
  $('#login-container').hide();
  $('#connect-android').click(selectDevices);
  $('#vysor-version').text('Vysor Version ' + chrome.runtime.getManifest().version)
  $('#reload-vysor').click(function() {
    chrome.runtime.reload();
  })
  
  function checkUsage() {
    chrome.storage.local.get(['vysorUsage'], function(d) {
      var vysorUsage = d.vysorUsage;
      if (!vysorUsage)
        vysorUsage = 0;
      var hoursUsed = vysorUsage / (60 * 60 * 1000);
      // half hour
      hoursUsed = Math.round(hoursUsed * 2) / 2;
      console.log('hours used', hoursUsed);
      $('#used').html("You've used Vysor for " + hoursUsed + " hours. Support Vysor. Go Pro.")
    });
    
    setTimeout(checkUsage, 60 * 60 * 1000)
  }
  
  checkUsage();
});

function goModal() {
  $('#notificationModal').modal();
}

function hideModal() {
  $('#notificationModal').modal('hide');
}

function showConnect() {
  $('#connectModal').modal();
  
}

function hideConnect() {
  $('#connectModal').modal('hide');
}