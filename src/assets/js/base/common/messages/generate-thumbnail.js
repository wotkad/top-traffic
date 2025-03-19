export default function generateThumbnail(file, callback) {
  let video = document.createElement("video");
  video.preload = "metadata";
  video.src = URL.createObjectURL(file);
  video.muted = true;
  video.playsInline = true;

  video.onloadedmetadata = function () {
    video.currentTime = 1;
  };

  video.onseeked = function () {
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth / 2;
    canvas.height = video.videoHeight / 2;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    callback(canvas.toDataURL("image/png"));
  };
}