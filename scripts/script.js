//function for getting a DOM element by its selector
function getElement(element) {
    return document.querySelector(element);
}

const amountValue = getElement('.amount');
const priceValue = getElement('.price');
const printResult = getElement('.print-result');

//Validation regexp for input fields which allows to input only digits 
const inputValidation = /(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;

//creat 'p' element for diplaying the result
const result = document.createElement('p');

//array of cents types
const cents = [1, 5, 10, 25, 50];

//event handler which handles all validation rules for input fields
//and executes the logic to display the change on the screen
getElement('.btn').addEventListener('click', () => {
	//validation for input fields
	if(!inputValidation.test(amountValue.value) && !inputValidation.test(priceValue.value)) {
		result.textContent = 'The input values should be a number';
		result.classList.add('warning');
		amountValue.classList.add('wrong-input');
		priceValue.classList.add('wrong-input');
	} else if(!inputValidation.test(amountValue.value)) {
		result.textContent = 'The input values should be a number';
		result.classList.add('warning');
		amountValue.classList.add('wrong-input');
	} else if(!inputValidation.test(priceValue.value)) {
		result.textContent = 'The input values should be a number';
		result.classList.add('warning');
		priceValue.classList.add('wrong-input');
	} else {

		//if the input value has passed all validations we:
		const change = amount.value - price.value; 						//extract the price from amount
		const centPart = (change % 1).toFixed(2).toString().slice(2);   //slice cent part from the total change

		//in case the user fixed the input fields the wrong-input class will be removed
		if(inputValidation.test(amountValue.value) || inputValidation.test(priceValue.value)) {
			amountValue.classList.remove('wrong-input');
			priceValue.classList.remove('wrong-input');
		};
		//set up an appropriate response to the user
		if(change >= 1) {
			result.textContent = `Your change is ${Math.floor(change)} ${Math.floor(change) === 1 ? 'dollar' : 'dollars'} ${moneyChange(centPart)}`;
			if(result.className = 'warning') result.classList.remove('warning');
		} else if(change < 1 && change > 0) {
			result.textContent = `Your change is ${moneyChange(centPart)}`;
			if(result.className === 'warning') result.classList.remove('warning');
		} else if(change === 0) {
			result.textContent = `There is not chnage for you)`;
		} else {
			console.log(change);
			result.textContent = 'Not enought amount of money!';
			result.classList.add('warning');
		}
	}
	//add the child to the DOM only after triggering the result
	 printResult.appendChild(result);
 });
 
//function for adding the the appropriate cents denomination based on the cent part of change into new array and returting its result
function moneyChange(num){
    let index = cents.length - 1;
    let splits = [];
    while (num >= cents[0]){
        if (num >= cents[index]){
           num -= cents[index];
           splits.push(cents[index] === 1 ? cents[index] + ' cent' : cents[index] + ' cents');
        }else{
            index--;
        }
    }
    return splits;
}