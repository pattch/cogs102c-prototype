$(document).ready(main);

function main() {
  // console.log("Getting started...");
  clickThrough();
}

function clickThrough() {
  var select = $('span.select');

  select.click(function() {
    var option_container = $(this).parent().parent();
    var options = option_container.parent().children();
    var curr = option_container.index();
    var next = (curr + 1) % (options.length);

    option_container.removeClass('active');
    options.eq(next).addClass('active');

    var trash_items = $('#trash-container ul.items li');
    trash_items.eq(curr).removeClass('active');
    trash_items.eq(next).addClass('active');
  });
}