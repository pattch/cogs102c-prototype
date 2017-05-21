var response = [];
var scoresAltered = false;
var time_start = new Date();
var time_end = new Date();
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

    var delay_time = 1000;
    options.eq(next).delay(delay_time).fadeIn(400);

    var trash_items = $('#trash-container ul.items li');
    trash_items.eq(curr).removeClass('active');
    trash_items.eq(next).addClass('active');

    var correct = $(this).attr('correct');
    var type_sel = $(this).attr('type');
    if(typeof correct != 'undefined') {
      var c = (correct == 'true');

      var correct_selection = option_container.find("span.select[correct='true']");
      var answer = correct_selection.attr('type');

      time_end = new Date();
      // Fastest they can possibly answer is after delay_time
      var time_taken = (time_end - time_start) - delay_time;

      r = {
        "correct": c,
        "selected": type_sel,
        "answer": answer,
        "time": time_taken
      };
      updateScore(r);
    } else {
      resetScores();
    }
  });
}

function updateScore(r) {
  scoresAltered = true;
  if(r["correct"]) num_correct++;
  else num_wrong++;
  response.push(r);
  var score = (100.0 * num_correct / (num_correct + num_wrong)).toFixed(2);
  var score_container = $('#option-container p.score');
  score_container.text(score);

  time_start = new Date();
}

function resetScores() {
  if(scoresAltered) {
    scoresAltered = false;
    submitScores();
  }
  time_start = new Date();
  response = [];
  num_correct = 0;
  num_wrong = 0;
}

function submitScores() {
  $.post("/scores",{"responses":response},function() {
    console.log("Submitted Scores");
  });
}
