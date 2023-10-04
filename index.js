const colors = ["red", "green", "yellow", "blue"];
var queColor = [];
var userPattern = [];
var started = false;
var level = 0;

$(".btn").click(function(){
    var ucColor = $(this).attr("id")
    userPattern.push(ucColor);
    playSound(ucColor);
    animating(ucColor);
    checkAnswer(userPattern.length-1); //By subtracting 1 from the length, you are effectively getting the index of the last element in the array
})

$(document).on("keypress", function(){
    if (!started){
        $("h1").text("level " + level)
        start();
        started = true
    }
})
function checkAnswer(currentLevel){
    if (queColor[currentLevel] === userPattern[currentLevel]){
        console.log("boom")
        if (queColor.length === userPattern.length){
            setTimeout(function () {
              start();
            }, 1000);
        }}
    
    else{
        $("h1").text("Game over, press any key to restart")
        $("body").addClass("game-over")
        setInterval(function(){
            $("body").removeClass("game-over")
        }, 200)
        playSound("wrong");
        restart();
    }

}
function start(){
    userPattern = [];
    level += 1;
    $("h1").text("level " + level)
    var rn = Math.floor(Math.random() * 4);
    var rcolor = colors[rn];
    queColor.push(rcolor);
    
    $("#" + rcolor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(rcolor);

}


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animating(rang){
    $("#" + rang).addClass("pressed")
    setInterval(function(){
        $("#" + rang).removeClass("pressed")
    }, 100)
}


function restart(){
    started = false;
    level = 0;
    queColor = [];
    userPattern = [];
}