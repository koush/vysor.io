
;

function PepperAudio() {
  $('#listener2').empty();
  var tool;
  var toolPath;
  var type;
  if (isElectron()) {
    tool = "host";
    toolPath = null;
    type = "application/x-ppapi-vysor-audio";
  }
  else {
    tool = "pnacl";
    toolPath = "audio_playback/pnacl/Release";
    type = null;
  }

  var hasInitialized;
  common2.createNaClModule("audio_playback", type, tool, toolPath, 1, 1, {}, function(message) {
  }.bind(this), function() {
    if (hasInitialized) {
      console.error('NACL module has already initalized');
      console.error(hasInitialized);
      console.error(new Error('NACL New Initialization Stack'))
      return;
    }
    hasInitialized = new Error("NACL Initialization Stack");
    console.log('NACL Audio module initialized')
  }.bind(this));
}

PepperAudio.prototype.queueAudio = function(offset, audioBuffer0, audioBuffer1) {
  if (!common2.naclModule || !common2.naclModule.postMessage)
    return;
  common2.naclModule.postMessage({
    type: 'queueAudio',
    audioBuffer0: audioBuffer0.buffer,
    audioBuffer1: audioBuffer1.buffer,
    offset: offset,
    length: audioBuffer0.byteLength / 4,
  });
}

PepperAudio.prototype.stop = function() {
  if (!common2.naclModule || !common2.naclModule.postMessage)
    return;
  common2.naclModule.postMessage({
    type: 'stop',
  });
}