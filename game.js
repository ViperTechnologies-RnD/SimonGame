var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var is_started = false;
var level = 0;
$(document).keydown(function () {
  if (!is_started){
    $("#level-title").text("Level " + level);
    nextSequence();
    is_started = true;
  }
});


//detects the user clicks on the designated elements and add that to the array.
$('.btn').click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  // console.log(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//Random number between 0 to 3
function nextSequence(){
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  //selects a random color based on the number [index] generated above
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //access the id of the button that matches to the color selected above and animates it
  $("#"+randomChosenColour).fadeTo(300, 0.25, function() { $(this).fadeTo(500, 1.0); });
  //plays audio file based on the color of the selected id and the randomly selected color.
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  is_started = false;
}
