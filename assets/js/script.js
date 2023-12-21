 var localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
 var currentHour = parseInt(dayjs().format('H'));
  function hourlyColour() {
    $('.time-block').each(function() {
     var rawTime = (this.id);
     var blockHour = parseInt(rawTime.replace(/^\D+/g, ''))
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }

  function textEntry() {
    $(".saveBtn").on("click", function() {
     var key = $(this).parent().attr("id");
     var value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });
  }

  function refreshColour () {
    $(".time-block").each(function() {
      var rawTime = (this.id);
      var blockHour = parseInt(rawTime.replace(/^\D+/g, ''));
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  $('.time-block').each(function() {
    var key = $(this).attr('id');
    var value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  function updateTime() {
    var dateElement = $("#date");
    var timeElement = $("#time");
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    var currentTime = dayjs().format("hh:mm:ss A");
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }

 
  hourlyColour();
  textEntry();
  refreshColour();
  setInterval(updateTime, 1000);
});
