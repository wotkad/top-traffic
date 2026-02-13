import "jquery-ui/ui/widgets/sortable";

$(".shuffle__sorting").sortable({
  placeholder: "sortable-placeholder",
  axis: "y",
  start: function (event, ui) {
    const cloned = ui.item.clone();
    cloned.css({
      opacity: 0.5,
    });

    ui.placeholder.html(cloned);
    ui.placeholder.height(ui.item.outerHeight());
  }
});