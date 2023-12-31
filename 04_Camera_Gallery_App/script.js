const video = document.querySelector("video");
const recordBtnCont = document.querySelector(".record-btn-cont");
const captureBtnCont = document.querySelector(".capture-btn-cont");
const recordBtn = document.querySelector(".record-btn");
const captureBtn = document.querySelector(".capture-btn");
const timer = document.querySelector(".timer");
const allFilters = document.querySelectorAll(".filter");
const filterLayer = document.querySelector(".filter-layer");

let recorder;
let recordFlag = false;
let chunks = []; // media data in chunks
let transparentColor = "transparent";

const constraints = {
  video: true,
  audio: true,
};

// navigator.mediaDevices
//   .getUserMedia(constraints)
//   .then((stream) => {
//     video.srcObject = stream;
//     recorder = new MediaRecorder(stream);

//     recorder.addEventListener("start", (e) => {
//       chunks = [];
//     });

//     recorder.addEventListener("dataavailable", (e) => {
//       chunks.push(e.data);
//     });

//     recorder.addEventListener("stop", (e) => {
//       const blob = new Blob(chunks, { type: "video/mp4" });
//       chunks = [];
//       const videoURL = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = videoURL;
//       link.download = "stream.mp4";
//       link.click();
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

recordBtn.addEventListener("click", () => {
  if (!recorder) return;
  recordFlag = !recordFlag;
  if (recordFlag) {
    recordBtn.classList.add("scale-record");
    recorder.start();
    startTimer();
  } else {
    recordBtn.classList.remove("scale-record");
    recorder.stop();
    stopTimer();
  }
});

captureBtn.addEventListener("click", (e) => {
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let tool = canvas.getContext("2d");
  tool.drawImage(video, 0, 0, canvas.width, canvas.height);
  tool.fillStyle = transparentColor;
  tool.fillRect(0, 0, canvas.width, canvas.height);
  let imageURL = canvas.toDataURL();
  let link = document.createElement("a");
  link.href = imageURL;
  link.download = "image.jpg";
  link.click();
  canvas.remove();
});

let timerID;
let counter = 0;

function startTimer() {
  function displayTimer() {
    timer.style.display = "block";
    let totalSeconds = counter;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    timer.innerText = `${hours}:${minutes}:${seconds}`;
    counter++;
  }
  timerID = setInterval(displayTimer, 1000);
}

function stopTimer() {
  clearInterval(timerID);
  timer.innerText = "00:00:00";
  timer.style.display = "none";
}

allFilters.forEach((filterElem) => {
  filterElem.addEventListener("click", (e) => {
    transparentColor =
      getComputedStyle(filterElem).getPropertyValue("background-color");
    filterLayer.style.backgroundColor = transparentColor;
  });
});
