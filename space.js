var attempt = false;
var gameover = false;
function newGame() {
	gameover = false;
	document.getElementById('result').style.display = 'none';
	document.getElementById('error').style.display = 'none';
	document.getElementById('explanation').style.display = 'block';

	attempt = new Attempt();
	document.getElementById('secondsToPress').innerHTML = attempt.millisecondsToPress/1000;
}

function keyUp() {
	if (attempt.isPressing) {
		attempt.isPressing = false;
		attempt.stopTime = attempt.getCurrentTime();
		attempt.showResult();
	}
}

function keyDown(e) {
	keyCode = (e.keyCode ? e.keyCode : e.which);
	if (keyCode == 32) {
		//Space pressed

		if (gameover) {
			newGame();
		} else if (!gameover && !attempt.startTime) {
			attempt.spacePressed();
		}
	}
}

function Attempt() {
	//A number between 0 and 10 by one decimal(0.6 for example)
	this.millisecondsToPress = Math.floor((Math.random()*100))*100; 
	this.startTime = false;
	this.stopTime = false;

	this.isPressing = false;

	this.getCurrentTime = function() {
		var d = new Date();
		return d.getTime();
	}

	this.showResult = function() {
		if (this.startTime && this.stopTime && !this.isPressing) {
			document.getElementById('result').style.display = 'block';

			var result = 0;
			var secondsPressed = this.stopTime - this.startTime;
			result = Math.abs(secondsPressed - this.millisecondsToPress);
			document.getElementById('pressed').innerHTML = secondsPressed/1000;
			document.getElementById('secondsWrong').innerHTML = result/1000;
		} else {
			document.getElementById('error').style.display = 'block';
			document.getElementById('error').innerHTML = 'Something went wrong. Press spacebar to try again.';
		}

		$('.arc_big').css('border-spacing', getRotationDegrees($('.arc_big')));
		$('.arc_big').removeClass('spin');

		$('.arc_small').css('border-spacing', getRotationDegrees($('.arc_small')));
		$('.arc_small').removeClass('spin_fast');

		$('.arc_small').animate({  borderSpacing: 0 }, {
			step: function(now,fx) {
				$(this).css('-webkit-transform','rotate('+now+'deg)');
				$(this).css('-moz-transform','rotate('+now+'deg)'); 
				$(this).css('-ms-transform','rotate('+now+'deg)');
				$(this).css('-o-transform','rotate('+now+'deg)');
				$(this).css('transform','rotate('+now+'deg)');  
			},
			duration:'slow'
		}, 'linear');

		$('.arc_big').animate({  borderSpacing: 0 }, {
			step: function(now,fx) {
				$(this).css('-webkit-transform','rotate('+now+'deg)');
				$(this).css('-moz-transform','rotate('+now+'deg)'); 
				$(this).css('-ms-transform','rotate('+now+'deg)');
				$(this).css('-o-transform','rotate('+now+'deg)');
				$(this).css('transform','rotate('+now+'deg)');  
			},
			duration:'slow'
		}, 'linear');

		gameover = true;
	}

	this.spacePressed = function() {
		this.isPressing = true;
		this.startTime = attempt.getCurrentTime();
		$('.arc_big').addClass('spin');
		$('.arc_small').addClass('spin_fast');

		document.getElementById('explanation').style.display = 'none';
	}
}

document.addEventListener('keyup', keyUp, false);
document.addEventListener('keydown', keyDown, false);


$(document).ready(function() {
	newGame();
});


function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle +=360 : angle;
}