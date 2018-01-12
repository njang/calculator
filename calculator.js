
// Initialize calculator
(() => {
	let displayElement = $('<input>', {id: 'display', placeholder: 0, disabled: true})
	$('.calculator').append(displayElement);
	$('.calculator').append($('<br>'));
	let buttons = [["&plusmn;", "&radic;", "&percnt;", "&div;"], [7, 8, 9, "&times;"], [4, 5, 6, "&ndash;"], [1, 2, 3, "&plus;"], [".", 0, "&equals;", "C"]];
	for (let i = 0; i < buttons.length; i++) {
		for (let j = 0; j < buttons[i].length; j++) {
			let buttonValue = (Number.isInteger(buttons[i][j]) ? buttons[i][j] : buttons[i][j].replace(/[^A-Za-z.]/g, ''));
			let buttonElement = $('<button>', {class: 'bg-dark text-white font-weight-bold', value: buttonValue })
			buttonElement.html(buttons[i][j]);
			$('.calculator').append(buttonElement);	
		}
		$('.calculator').append($('<br>'));
	}
	$('[value="C"]').attr('class', 'bg-danger text-white font-weight-bold');
})();

// Function to enable decimal button.
const enableDecimal = () => {
	$('[value="."]').attr('disabled', false);
};

let digits = [];
let equation = [];
// Define calculator logic
$(document).ready("#button").click(function(event) {
	let entered = event.target.value;
	if (Number.isInteger(Number(entered)) || entered == ".") {
		if (event.target.value == '.') {
			$('[value="."]').attr('disabled', true);
		}
		digits.push(entered);
	  $("#display").attr("placeholder", digits.join(''));
	} else if (entered == "C") {
		enableDecimal();
		digits = [];
		equation = [];
		$("#display").attr("placeholder", "0");
	} else if (entered == "radic") {
		enableDecimal();
		if (digits.length > 0) {
			answer = Math.sqrt(Number(digits.join('')));
		} else if (equation[0]) {
			answer = Math.sqrt(equation[0]);
		} else {
			answer = "";
		}
		digits = [];
		equation = [answer];
		$("#display").attr("placeholder", answer);
	}	else if (entered == "plusmn") {
		enableDecimal();
		if (digits.length == 0 && equation[0]) {
			digits = equation[0].toString().split('');
		}
		if (digits[0] != "-") {
			digits.unshift("-");
		} else {
			digits.shift();
		}
	  $("#display").attr("placeholder", digits.join(''));
	} else if (entered == "equals") {
		enableDecimal();
		equation.push(Number(digits.join('')));
		let answer = 0;
		switch (equation[1]) {
			case "plus":
				answer = equation[0] + equation[2];
				break;
			case "ndash":
				answer = equation[0] - equation[2];
				break;
			case "times":
				answer = equation[0] * equation[2];
				break;
			case "div":
				answer = equation[0] / equation[2];
				break;
			case "percnt":
				answer = equation[0] % equation[2];
				break;
		}
		$("#display").attr("placeholder", answer);
		equation = [answer];
		digits = [];
	} else {	// handle all the operator button presses: plus, minus, multiply, and divide
		enableDecimal();
		// if user selects operator after having selected an operator already, replace the old one with new one by first removing the old one.
		if (equation.length == 2) {
			equation.pop();
		}
		// enable chaining logic. If the user did not enter any new digits prior to choosing an operator, assume the answer from the previous calculation to be the first number.
		if (digits.length != 0) {
			equation = [Number(digits.join(''))];
		}
		digits = [];
		equation.push(entered);
	}
});

