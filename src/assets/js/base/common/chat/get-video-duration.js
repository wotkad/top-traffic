export default function getVideoDuration(file, callback) {
  let video = document.createElement("video");
  video.preload = "metadata";
  video.onloadedmetadata = function () {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration % 60);
    callback(`${minutes}:${seconds.toString().padStart(2, "0")}`);
  };
  video.src = URL.createObjectURL(file);
}