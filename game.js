


var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClick = [];
var levelTracker = 0;

var gameStarted = false;

$(document).keypress(function(){

  if(!gameStarted){
    $("h1").text("You are now on level " + levelTracker);
    nextSequence();
    gameStarted = true;
  }


});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClick.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClick.length-1);
});

function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClick[currentLevel]){
    console.log("success");

    if(gamePattern.length === userClick.length){

      setTimeout(function(){
        nextSequence();
      },1000);

    }
  }
  else
  {
    console.log("Failure");
    playSound("wrong");

    $("body").addClass("game-over");

    $("h1").text("Nice try, press any key to try again!");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
    alert(gameStarted);
  }
}

function nextSequence() {
  userClick = [];
  levelTracker++;

  $("h1").text("You are now on level " + levelTracker);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut("fast").fadeIn("fast");

  playSound(randomChosenColor);
}

function playSound(color){
  var colorAudio = new Audio ("sounds/" + color + ".mp3");
  colorAudio.play();
}

function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");
  setTimeout (function(){
  $("#" + currentColor).removeClass("pressed");}, 100);

}


function startOver(){
  levelTracker = 0;
  gamePattern = [];
  gameStarted = false;
}
