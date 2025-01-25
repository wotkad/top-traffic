import gsap from "gsap";

let table = $('table.table-fixed-cols');
let container = $('.content-scroll');
let defaultContainerWidth = container.width();
let defaultTableWidth = table.width();

let defaultWidthDifference = defaultContainerWidth - defaultTableWidth;

// Функция для вычисления отступов
export default function setTdPadding(duration = 0) {
  // Используем requestAnimationFrame для того, чтобы гарантировать, что изменения уже завершены
  requestAnimationFrame(() => {
    let containerWidth = container.width();
    let tableWidth = table.width();

    let widthDifference = containerWidth - tableWidth;

    let extraPadding;
    let defaultExtraPadding;
    let finalPadding;

    $('table.table-fixed-cols tr').each(function () {
      let tds = $(this).find('td, th');
      let numOfTds = tds.length;
      let minPadding;
      
      if (numOfTds > 2) {
        if (widthDifference > 0) {
          minPadding = Number($(tds[2]).css('padding-right').slice(0, -2));
        } else {
          minPadding = 32;
        }

        extraPadding = widthDifference / (numOfTds - 2); 
        defaultExtraPadding = defaultWidthDifference / (numOfTds - 2);
        
        if (extraPadding < 0) {
          finalPadding = Math.max(minPadding, minPadding + defaultExtraPadding);
        } else {
          finalPadding = Math.max(minPadding, minPadding + extraPadding - 1);
        }
        
        // Анимация с GSAP
        gsap.to(tds.slice(1, -1), { paddingRight: finalPadding, ease: 'none', duration: duration });
      }
    });
  });
}
// Таймер с задержкой перед запуском
setTimeout(() => {
  setTdPadding();
}, 200);

// Обработчик события resize для адаптивности
$(window).on('resize', () => {
  setTdPadding();
});
