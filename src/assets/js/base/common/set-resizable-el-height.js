export default function setResizableElHeight() {
  const resizables = document.querySelectorAll('.resizable');

  resizables.forEach(resizable => {
    const table = resizable.closest('table');
    if (!table) return;

    const tableHeight = table.offsetHeight;
    resizable.style.height = tableHeight + 'px';
  });
}

setResizableElHeight();
