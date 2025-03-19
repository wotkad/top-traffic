import formatFileSize from "./format-file-size";
import generateThumbnail from "./generate-thumbnail";
import getVideoDuration from "./get-video-duration";

export default function createFileElement(file, progress) {
  let fileType = file.type.split("/")[0];
  let fileSize = formatFileSize(file.size);
  let fileName = file.name;

  let fileTemplate = $(`
    <div class="messages__file ${fileType === "image" || fileType === "video" ? "messages__file-image" : "messages__file-file"}">
      <a href="${fileName}" download></a>
      ${fileType === "image" || fileType === "video" ? `
      <img src="" alt="file">
      <button type="button" class="messages__file__icon messages__file__icon-close">
        <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
        <svg class="file-loading" width="48" height="48" viewBox="-6 -6 60 60">
          <circle r="14" cx="24" cy="24" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                  stroke-dashoffset="${progress}" stroke-dasharray="87.92px" fill="transparent"></circle>
        </svg>
      </button>
      <button type="button" class="messages__file__remove">
        <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
      </button>
      ` : `
      <div class="messages__file__content">
        <div class="messages__file-left">
          <button type="button" class="messages__file__icon messages__file__icon-close">
            <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
            <svg class="file-loading" width="48" height="48" viewBox="-6 -6 60 60">
              <circle r="14" cx="24" cy="24" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-dashoffset="${progress}" stroke-dasharray="87.92px" fill="transparent"></circle>
            </svg>
          </button>
          <button type="button" class="messages__file__icon messages__file__icon-file">
            <svg class="messages__file__icon-file" viewBox="0 0 10 12" width="10" height="12"><use xlink:href="#other-file-icon"></use></svg>
          </button>
        </div>
        <div class="messages__file-right">
          <h3>${fileName}</h3>
          <span>${fileSize}</span>
        </div>
        <button type="button" class="messages__file__remove">
          <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
        </button>
      </div>
      `}
      ${fileType === "video" ? `<div class="messages__file__duration"></div>` : ""}
    </div>
  `);

  if (fileType === "image") {
    let reader = new FileReader();
    reader.onload = function (e) {
      fileTemplate.find("img").attr("src", e.target.result);
    };
    reader.readAsDataURL(file);
  } else if (fileType === "video") {
    generateThumbnail(file, function (thumbnail) {
      fileTemplate.find("img").attr("src", thumbnail);
    });
    getVideoDuration(file, function (duration) {
      fileTemplate.find(".messages__file__duration").text(duration);
    });
  }

  return fileTemplate;
}