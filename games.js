var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "yellow", "green"];

var started = false;

var level=0;
nextSequence();


//function to start the game and hence call the first nextsequence
$(document).keypress(function(){
    if(!started){
        $('#level-title').text("Level 0");
        nextSequence();
        started=true;
    }
})

//function to list which button user pressed and play the following sound and animation
$('.btn').click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//function to generate sequence
function nextSequence(){

    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#'+randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    sequenceSound(randomChosenColor);
        

}

//function to check if the pattern entered by user is correct or not
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length)
        {
           setTimeout(function(){
            nextSequence();
           }, 1000);
           level++;
           $('#level-title').text("Level "+level);
           
        }

    }
    else{
        playSound("wrong");
        var wrong= new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass('game-over');
        setTimeout(function(){
            $("body").removeClass('game-over');
        },200 );
        startOver();
        $('#level-title').text("Game Over, Press any key to restart");
    }
    
}

//function to reset the variables so that game can be started again

function startOver(){
    started=false;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
  
}

//function to play sound when user clicks on a button
function playSound(name){
    var audio = new Audio("sounds/" +name+ ".mp3");
    audio.play();
}

//function that makes sound when the sequence plays
function sequenceSound(namee){
    var audio = new Audio("sounds/" +namee+ ".mp3");
    audio.play();
}

//function to show animation when button is pressed
function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');

    }, 100);
}

