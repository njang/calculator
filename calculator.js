
// Assemble calculator
const assemble = () => {
	let displayElement = $('<input>', {id: 'display', disabled: true})
	$('.calculator').append(displayElement);
	$('.calculator').append($('<br>'));

	let buttons = [[7, 8, 9, "&div;"], [4, 5, 6, "&times;"], [1, 2, 3, "&ndash;"], [".", 0, "&equals;", "&plus;"]];
	// let buttons = [[7, 8, 9, "/"], [4, 5, 6, "*"], [1, 2, 3, "-"], [".", 0, "&equals;", "+"]];
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
	// assemble number from left to right
	// if operator, remember it, and start storing the second number.
	// if equal sign, execute the arithmetics.
	let entered = event.target.value;
	switch (entered) {
		case "plus":
			entered = "+";
			break;
		case "ndash":
			entered = "-";
			break;
		case "times":
			entered = "*";
			break;
		case "div":
			entered = "/";
			break;
	}
	digits.push(entered);

	console.log(digits);
	// console.log(Number(digits.join('')));




	// // disable decimal button after it's been pressed to prevent two decimals being added to a number.
	// if (event.target.value == '.') {
	// 	$('[value="."]').attr('disabled', true);
	// }
	// if (Number.isInteger(Number(event.target.value)) || event.target.value == '.') {
	// 	digits.push(event.target.value);	
 //  } else {
 //  	argument = Number(digits.join(''));
 //  	digits = [];
	// 	$('[value="."]').attr('disabled', false);
 //  	switch (event.target.value) {
	//   	case "plus":
	//   		operator = "+";
	//   		// console.log("plus");
	//   		break;
	//   	case "ndash":
	//   		operator = "-"
	//   		// console.log("minus");
	//   		break;
	//   	case "times":
	//   		operator = "x"
	//   		// console.log("times");
	//   		break;
	//   	case "div":
	//   		operator = "/"
	//   		// console.log("div");
	//   		break;
	// 		default:	
	// 			argument += Number(digits.join(''));
	//   		// console.log("equals");
 //  	}
 //  }
  // console.log(argument, digits.join(''), operator);
  $("#display").attr("placeholder", digits.join(''));
});


assemble();
