import formatFileSize from "./format-file-size";
import generateThumbnail from "./generate-thumbnail";

export default function createFileElement(file, progress) {
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico', '.tiff', '.avif'];
  const isImage = imageExtensions.includes(fileExtension);
  let fileSize = formatFileSize(file.size);
  let fileName = file.name;

  let fileTemplate = $(`
    <div class="messages__file ${isImage ? "messages__file-image" : "messages__file-file"}">
      <div class="messages__file__image">
        <a class="messages__file__sublink" href="${fileName}" download></a>
        ${isImage ? `
        <img src="" alt="file">
        <button type="button" class="messages__file__icon messages__file__icon-close">
          <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
          <svg class="file-loading" width="48" height="48" viewBox="-6 -6 60 60">
            <circle r="14" cx="24" cy="24" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-dashoffset="${progress}" stroke-dasharray="87.92px" fill="transparent"></circle>
          </svg>
        </button>
        <button type="button" class="messages__file__remove">
          <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
        </button>
        ` : `
        <button type="button" class="messages__file__icon messages__file__icon-close">
          <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
          <svg class="file-loading" width="48" height="48" viewBox="-6 -6 60 60">
            <circle r="14" cx="24" cy="24" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-dashoffset="${progress}" stroke-dasharray="87.92px" fill="transparent"></circle>
          </svg>
        </button>
        <button type="button" class="messages__file__icon messages__file__icon-file">
          <svg class="messages__file__icon-file" viewBox="0 0 10 12" width="10" height="12"><use xlink:href="#other-file-icon"></use></svg>
        </button>
        <button type="button" class="messages__file__remove">
          <svg viewBox="0 0 9 9" width="9" height="9"><use xlink:href="#other-close-icon"></use></svg>
        </button>
        `}
      </div>
  
      <div class="messages__file__content">
        <a class="messages__file__link" href="${fileName}" download><p>${fileName}</p>
          <button class="button message__button message__download" type="button" aria-label="button">
            <svg viewBox="0 0 18 18" width="18" height="18">
              <use xlink:href="#other-download-icon"></use>
            </svg>
          </button>
        </a>
        <span>${fileSize}</span>
      </div>
    </div>
  `);
  

  if (isImage) {
    let reader = new FileReader();
    reader.onload = function (e) {
      fileTemplate.find("img").attr("src", e.target.result);
    };
    reader.readAsDataURL(file);
  } else if (file.type.startsWith("video/")) {
    generateThumbnail(file, function (thumbnail) {
      fileTemplate.find("img").attr("src", thumbnail);
    });
  }

  return fileTemplate;
}