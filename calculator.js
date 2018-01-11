
// Assemble calculator
const assemble = () => {
	let displayElement = $('<input>', {id: 'display', disabled: true})
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
}

// Display numbers input by buttons
let digits = [];
let operator = "";
let equation = [];
$(document).ready("#button").click(function(event) {
	// assemble number from left to right
	// if operator, remember it, and start storing the second number.
	// if equal sign, execute the arithmetics.
	// disable decimal button after it's been pressed to prevent two decimals being added to a number.
	let entered = event.target.value;
	if (Number.isInteger(Number(entered)) || entered == ".") {
		if (event.target.value == '.') {
			$('[value="."]').attr('disabled', true);
		}
		digits.push(entered);
	  $("#display").attr("placeholder", digits.join(''));
	} else if (entered == "C") {
		$('[value="."]').attr('disabled', false);
		digits = [];
		equation = [];
		$("#display").attr("placeholder", "");
	} else if (entered == "radic") {
		$('[value="."]').attr('disabled', false);
		if (equation[0]) {
			answer = Math.sqrt(equation[0]);
		} else if (Number(digits.join(''))) {
			answer = Math.sqrt(Number(digits.join('')));
			digits = [];
		} else {
			answer = "";
		}
		equation = [answer];
		$("#display").attr("placeholder", answer);
	}	else if (entered == "plusmn") {
		$('[value="."]').attr('disabled', false);
		if (digits[0] != "-") {
			digits.unshift("-");
		} else {
			digits.shift();
		}
	  $("#display").attr("placeholder", digits.join(''));
	} else if (entered == "equals") {
		$('[value="."]').attr('disabled', false);
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
	} else {
		$('[value="."]').attr('disabled', false);
		operator = entered;
		if (digits.length != 0) {
			equation = [Number(digits.join(''))];
		}
		digits = [];
		equation.push(operator);
	}
});

assemble();
