export default function simulateUpload(fileElement) {
  let startTime = performance.now();

  function update() {
    let elapsed = performance.now() - startTime;
    let percentage = Math.min(elapsed / 300, 1); // Ограничиваем максимум 100%
    let newProgress = 88 * (1 - percentage); // Прогресс от 88 до 0
    
    fileElement.find("circle").attr("stroke-dashoffset", newProgress);
    
    if (percentage < 1) {
      requestAnimationFrame(update);
    } else {
      fileElement.addClass("loaded");
      checkAllFilesLoaded();
    }
  }
  requestAnimationFrame(update);
}

// // Проверяем, загружены ли все файлы
function checkAllFilesLoaded() {
  let allLoaded = $(".messages__file").length === $(".messages__file.loaded").length;
  $(".messages__submit").prop("disabled", !allLoaded);
}