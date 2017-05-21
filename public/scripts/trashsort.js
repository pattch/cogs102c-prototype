var response = [];
var num_correct = 0, num_wrong = 0;
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
    options.eq(next).hide();
    options.eq(next).addClass('active');
    options.eq(next).delay(1000).fadeIn(400);

    var trash_items = $('#trash-container ul.items li');
    trash_items.eq(curr).removeClass('active');
    trash_items.eq(next).addClass('active');

    var correct = $(this).attr('correct');
    var type_sel = $(this).attr('type');
    if(typeof correct != 'undefined') {
      var c = (correct == 'true');

      var correct_selection = option_container.find("span.select[correct='true']");
      var answer = correct_selection.attr('type');

      r = {
        "correct": c,
        "selected": type_sel,
        "answer": answer
      };
      updateScore(r);
    } else {
      resetScores();
    }
  });
}

function updateScore(r) {
  if(r["correct"]) num_correct++;
  else num_wrong++;
  response.push(r);
  var score = (100.0 * num_correct / (num_correct + num_wrong)).toFixed(2);
  $('#option-container p.score').text(score);
}

function resetScores() {
  response = [];
  num_correct = 0;
  num_wrong = 0;
}
