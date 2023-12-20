var localeSettings = {};
dayjs.locale(localeSettings);

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// this function gets the current time from the js library and changes the colour of the blocks depending on the time. 
$(function () {
  var currentHour = dayjs().format('H');
  function hourlyColour() {
    $('.time-block').each(function() {
      var blockHour = parseInt(this.id);
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
    });
  }

  // this is the function for saving the text 
  function textEntry() {
    $(".saveBtn").on("click", function() {
      var key = $(this).parent().attr("id");
      var value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });
  }

  function refreshColour () {
    $(".time-block").each(function() {
      var blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else if (blockHour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  $(".time-block").each(function() {
    var key = $(this).attr("id");
    var value = localStorage.getItem(key);
    $(this).children(".description").val(value);
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


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
