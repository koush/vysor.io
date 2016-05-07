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
  $('#connect-android').click(selectDevices);
  $('#vysor-version').text(chrome.runtime.getManifest().version)
  $('#reload-vysor').click(function() {
    chrome.runtime.reload();
  })
});


