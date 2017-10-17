var cameraFlags = {video: {
  //facingMode: {exact: "environment"},
  //deviceId: {exact: "e6cb32e3da6356f1c650fd7136b2cbfa6f1a76950a69326baab56b6f8da3c346"},
  width: {exact: 640},
  height: {exact: 480}
},  
  audio: false
};

function gotDevices(deviceInfos) {

  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    
    if (deviceInfo.kind === 'videoinput') {
        
        cameraFlags.video.deviceId = {exact: deviceInfo.deviceId};

        console.log(deviceInfo);

    } else {
        //console.log('Some other kind of source/device: ', deviceInfo);
    }
  }

}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// // lets do some fun
// let width = 0;
// let height = 0;

// let qvga = {width: {exact: 320}, height: {exact: 240}};

// let vga = {width: {exact: 640}, height: {exact: 480}};

// let resolution = window.innerWidth < 640 ? qvga : vga;

// whether streaming video from the camera.
let streaming = false;

let video = document.getElementById("webcam");
let stream = null;
let vc = null;

// // 0dbcc35221ffd40cb0d5eb6024f427f9b50da577a838739d963529ae71cfda8f
// // e6cb32e3da6356f1c650fd7136b2cbfa6f1a76950a69326baab56b6f8da3c346






let info = document.getElementById('info');
let container = document.getElementById('container');

function WasmIsReady() {
  console.log('Wasm is ready');
  if (!featuresReady) {
    console.log('Requred features are not ready.');
    return;
  }
  info.innerHTML = '';
  container.className = '';

}

function startCamera() {
  if (streaming) return;
  navigator.mediaDevices.getUserMedia(cameraFlags)
    .then(function(s) {
    stream = s;
    video.srcObject = s;
    video.play();
  })
    .catch(function(err) {
    console.log("An error occured! " + err);
  });

  video.addEventListener("canplay", function(ev){
    if (!streaming) {
      height = video.videoHeight;
      width = video.videoWidth;
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      streaming = true;
      
    }
    //startVideoProcessing();
  }, false);
}