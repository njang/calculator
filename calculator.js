
// Assemble buttons
const assemble = () => {
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

assemble();
//