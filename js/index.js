/*
require("./imageCapture");
*/
const _ = document.getElementById.bind(document);
const preview = _("preview");
const imgPreview = _("img-preview");
const btnCapture = _("btn-capture");
const spanCOunt = _("count");
const task = {
  running: null,
  release: null,
  id: 0,
};
const NUM_SNAPS = 200;
let _stream;

getInputVideoStream().then((stream) => {
  _stream = stream;
  setupVideoPreview(preview, stream);
  btnCapture.removeAttribute("disabled");
});

async function delay(time) {
  return new Promise((r) => setTimeout(r, time));
}

btnCapture.addEventListener("click", async () => {
  const id = ++task.id;
  if (task.running) {
    await acquireLock();
  } else {
    await acquireLock();
    btnCapture.innerHTML = "Stop Capture";
    for (var i = 0; i < NUM_SNAPS && task.id === id; i++) {
      const blob = await captureImageFromVideo(_stream);
      setupPhotoPreview(imgPreview, blob);
      saveAs(blob, "image-" + i + ".jpg");
      count.innerHTML = i;
      await delay(1000);
    }
  }
  btnCapture.innerHTML = "Start Capture";
  releaseLock();
});

//UNIMPORTANT
async function acquireLock() {
  while (task.running) {
    await task.running;
  }
  task.running = new Promise((r) => (task.release = r));
}
function releaseLock() {
  task.release();
  task.release = null;
  task.running = null;
}
