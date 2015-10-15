

var guessNum = reset();
var counter = 1;
var prevGuesses = [];

function reset() {
	var num = Math.floor(Math.random()*100 + 1);
	counter = 0;
	prevGuesses = [];
	return num;
}

var tryBtn = $('#try');
var resetBtn = $('#reset');
var hintBtn = $('#hint');

tryBtn.on('click', function() {

	var playerNum = +$('#player-input').val();
	var highLow;
	var canPlay = true;

	$("#alice").slideUp("slow");

	for (var i in prevGuesses){
		if (prevGuesses[i] === playerNum) {
			$('#message').text("You have already used this number.");
			canPlay = false;
		} 
	}

	if(playerNum > 100){
		$('#message').text("The number is too big, it should be between 1 and 100")
		canPlay = false;
	} else if (playerNum < 1){
		$('#message').text("the number is too small, it should be between 1 and 100");
		canPlay = false;
	} else if (isNaN(playerNum)) {
		canPlay = false;
		$('#message').text("That is not a number. Try again.");
	} 

	if (playerNum < guessNum){
		highLow = "Try Higher";
	} else {
		highLow = "Try Lower";
	} 

	if(counter < 6 && canPlay === true){
		counter += 1;
		prevGuesses.push(playerNum);
		if(playerNum === guessNum){
			$('#alice').slideDown("slow");
			$('#message').text("YOU WON! You have tried " + counter + " times. Play again.");
			guessNum = reset();
		} else if (Math.abs(playerNum - guessNum) < 5){
			$('#message').text("Extremely hot! You have tried " + counter + " times. " + highLow);
		} else if (Math.abs(playerNum - guessNum) < 10){
			$('#message').text("Very hot! You have tried " + counter + " times. " + highLow);
		} else if (Math.abs(playerNum - guessNum) < 20){
			$('#message').text("Hot! You have tried " + counter + " times. " + highLow);
		} else if (Math.abs(playerNum - guessNum) < 40){
			$('#message').text("Cold! You have tried " + counter + " times. " + highLow);
		} else if (Math.abs(playerNum - guessNum) < 60){
			$('#message').text("Very cold! You have tried " + counter + " times. " + highLow);
		} else if (Math.abs(playerNum - guessNum) < 80){
			$('#message').text("Extremely cold! You have tried " + counter + " times. " + highLow);
		} else if (Math.abs(playerNum - guessNum) < 100){
			$('#message').text("Frozen! You have tried " + counter + " times. " + highLow);
		}
	} 
	
	if (counter === 5) {
		$('#message').text("YOU LOST! You tried " + counter + " times. To continue press RESET");
	}
	
});

resetBtn.on('click', function(){
	guessNum = reset();
	$('#message').text("");
	$('#player-input').val("");
	$("#alice").slideUp("slow");
});

hintBtn.on('click', function() {
	
	$('#message').text("The answer was : " + guessNum + ". You can try again.");
	guessNum = reset();
	$('#player-input').val("");
});