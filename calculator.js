
// Assemble calculator
const assemble = () => {
	let displayElement = $('<input>', {id: 'display', disabled: true})
	$('.calculator').append(displayElement);
	$('.calculator').append($('<br>'));

	let buttons = [[7, 8, 9, "&div;"], [4, 5, 6, "&times;"], [1, 2, 3, "&ndash;"], [".", 0, "&equals;", "&plus;"]];
	for (let i = 0; i < buttons.length; i++) {
		for (let j = 0; j < buttons[i].length; j++) {
			let buttonValue = (Number.isInteger(buttons[i][j]) ? buttons[i][j] : buttons[i][j].replace(/[^a-z.]/g, ''));
			let buttonElement = $('<button>', {class: 'btn', value: buttonValue })
			buttonElement.html(buttons[i][j]);
			$('.calculator').append(buttonElement);	
		}
		$('.calculator').append($('<br>'));
	}
}

// Display numbers input by buttons
let digits = [];
let argument = 0;
let operator = "";
$(document).ready("#button").click(function(event) {

	if (Number.isInteger(Number(event.target.value)) || event.target.value == '.') {
		digits.push(event.target.value);	
  } else {
  	argument = Number(digits.join(''));
  	digits = [];
  	switch (event.target.value) {
	  	case "plus":
	  		operator = "+";
	  		// console.log("plus");
	  		break;
	  	case "ndash":
	  		operator = "-"
	  		// console.log("minus");
	  		break;
	  	case "times":
	  		operator = "x"
	  		// console.log("times");
	  		break;
	  	case "div":
	  		operator = "/"
	  		// console.log("div");
	  		break;
			default:	
	  		console.log("equals");
  	}
  }
  console.log(argument, digits.join(''), operator);
  $("#display").attr("placeholder", digits.join(''));
});


assemble();
