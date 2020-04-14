var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow", "pink", "white"];

var gamePattern = [];

var level = 0;

var started = false;

var highscore = 0;

$(document).click(function() {
  if (!started) {

    $("h1").text("Level: " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer([(userClickedPattern.length) - 1]);


});

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level: " + level);

  var randomNumber = Math.floor(Math.random() * 6);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed", 200);
  })
};

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence()
      }, 1000)

    }

  } else {

    if(level > highscore) {
      highscore = level;
      $("h3").text("Toppscore: " + highscore);
    } else {
      console.log("Not higher number");
    }

    console.log("Wrong");
    var audioWrong = new Audio("sounds/wrong.mp3")
    audioWrong.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);

    $("h1").text("Game Over, trykk på en knapp for å starte");

    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
