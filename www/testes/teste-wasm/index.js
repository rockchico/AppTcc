let width = 0;
let height = 0;

let qvga = {width: {exact: 320}, height: {exact: 240}};

let vga = {width: {exact: 640}, height: {exact: 480}};

let resolution = window.innerWidth < 640 ? qvga : vga;

// whether streaming video from the camera.
let streaming = false;

let video = document.getElementById("video");
let stream = null;
let vc = null;

let info = document.getElementById('info');
let container = document.getElementById('container');





function initUI() {
  var stats = new Stats();
  stats.showPanel(0);
  document.getElementById('container').appendChild(stats.domElement);


}

function opencvIsReady() {
  console.log('OpenCV.js is ready');
  if (!featuresReady) {
    console.log('Requred features are not ready.');
    return;
  }
  info.innerHTML = '';
  container.className = '';
  initUI();
    makeFrameProcessor();
}



function addVideoElements() {

    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');

  return { video: video, canvas: canvas };
}

function makeFrameProcessor() {

    var fp = addVideoElements();

    // Somewhat based on http://www.kaizou.org/2012/09/frame-by-frame-video-effects-using-html5-and/
    fp.viewport = fp.canvas.getContext("2d");
    fp.width = fp.canvas.width;
    fp.height = fp.canvas.height;
    // Create the frame-buffer canvas
    fp.framebuffer = document.createElement("canvas");
    fp.framebuffer.width = fp.width;
    fp.framebuffer.height = fp.height;
    fp.ctx = fp.framebuffer.getContext("2d");

    // Start rendering when the video is playing
    fp.playHandler = function () {
        // check if video frames are ready, if not try again a bit later.
        if (0 == fp.video.videoWidth || 0 == fp.video.videoHeight) {
            setTimeout(fp.playHandler, 10);
            return;
        }

        fp.canvas.width = fp.video.videoWidth;
        fp.canvas.height = fp.video.videoHeight;
        fp.width = fp.canvas.width;
        fp.height = fp.canvas.height;
        fp.framebuffer.width = fp.width;
        fp.framebuffer.height = fp.height;
        fp.render();
    }
    fp.video.addEventListener("play", fp.playHandler, false);

    fp.color_change_speed = 10;

    function _freeArray(heapBytes) {
        Module._free(heapBytes.byteOffset);
    }

    function _arrayToHeap(typedArray) {
        var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
        var ptr = Module._malloc(numBytes);
        var heapBytes = Module.HEAPU8.subarray(ptr, ptr + numBytes);
        heapBytes.set(typedArray);
        return heapBytes;
    }

    // Compute and display the next frame
    fp.renderFrame = function () {
        // Acquire a video frame from the video element
        fp.ctx.drawImage(fp.video, 0, 0, fp.video.videoWidth,
            fp.video.videoHeight, 0, 0, fp.width, fp.height);
        var img_data = fp.ctx.getImageData(0, 0, fp.width, fp.height);

        if (!fp.frame_bytes) {
            fp.frame_bytes = _arrayToHeap(img_data.data);
        }
        else if (fp.frame_bytes.length !== img_data.data.length) {
            _freeArray(fp.frame_bytes); // free heap memory
            fp.frame_bytes = _arrayToHeap(img_data.data);
        }
        else {
            fp.frame_bytes.set(img_data.data);
        }

        // Perform operation on copy, no additional conversions needed, direct pointer manipulation
        // results will be put directly into the output param.

        //stat.start("rotate_color");
        Module._rotate_colors(img_data.width, img_data.height, fp.frame_bytes.byteOffset, fp.frame_bytes.byteOffset, fp.color_change_speed);
        //stat.stop("rotate_color");





        //Module._teste_soma(3 ,6);
        //Module._teste_blur(img_data.width, img_data.height, fp.frame_bytes.byteOffset, fp.frame_bytes.byteOffset, fp.color_change_speed);
        //Module._teste_gray(img_data.width, img_data.height, fp.frame_bytes.byteOffset, fp.frame_bytes.byteOffset, fp.color_change_speed);
        // copy output to ImageData
        img_data.data.set(fp.frame_bytes);
        // Render to viewport
        fp.viewport.putImageData(img_data, 0, 0);
    };

    // Rendering call-back
    fp.render = function () {
        if (fp.video.paused || fp.video.ended) {
            return;
        }
        fp.renderFrame();
        var self = fp;
        requestAnimationFrame(self.render);
    };

    // Some platforms seem to disable autoplay
    // so wait a moment and display the controls and call play() manually
    setTimeout(function() {
        var isPlaying = 0 < fp.video.currentTime && !fp.video.paused && !fp.video.ended && 2 < fp.video.readyState;
        if (!isPlaying) {
            fp.video.controls = true;
            fp.video.play();
        }
    }, 200);

    return fp;
};








