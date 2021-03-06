var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var hint = document.querySelector("#hint");
var img = document.getElementById("img");
var abc = 1;


setInterval(function() { 
	if(abc%4 == 0) h1.style.background = "green";
	else if(abc%4 == 1 ) h1.style.background = "purple";
	else if(abc%4 == 2 ) h1.style.background = "red";
	else if(abc%4 == 3 ) h1.style.background = "orange";
	abc++;
	
}, 300); 
init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
	hint1();
}


function hint1(){
	hint.addEventListener("click",function(){
		img.classList.toggle("pic");
		hint.classList.toggle("selected");
	})
}
function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			if(this.textContent === "Easy")  numSquares = 3;
			else if(this.textContent === "Hard")  numSquares = 6;
			else   numSquares = 9;
			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){
				messageDisplay.style.color = "red";
				messageDisplay.textContent = "YOU WON!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = "#FFB6C1";
				messageDisplay.textContent = "TRY AGAIN !"
				var ab = true;
				setInterval(function() { 
					if(ab) messageDisplay.style.color = "white";
					else messageDisplay.style.color = "bluesteel";
					ab = !ab;
					
				}, 300); 
				
				
			}
		});
	}
}



function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256) ;
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256) ;
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256) ;
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }