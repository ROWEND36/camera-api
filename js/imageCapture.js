const map = new WeakMap();

async function getInputVideoStream() {
  return await navigator.mediaDevices.getUserMedia({ video: true });
}

async function captureImageFromVideo(mediaStream) {
  const track = mediaStream.getVideoTracks()[0];
  let imageCapture;
  if (map.has(track)) {
    imageCapture = map.get(track);
  } else {
    imageCapture = new ImageCapture(track);
    map.set(track, imageCapture);
  }
  return await imageCapture.takePhoto();
}

/* Utils */

function setupVideoPreview(videoElement, stream) {
  videoElement.srcObject = stream;
}

let LAST_URL;
function setupPhotoPreview(imgElement, img) {
  if (LAST_URL) URL.revokeObjectURL(LAST_URL);
  LAST_URL = imgElement.src = URL.createObjectURL(img);
}

function saveToDownloads(img) {}
