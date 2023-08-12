module.exports = function toReadable (number) {

  const POSTFIX = ["thousand", "million"];
  const NUM_1_TO_19 = ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const TENS = ["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  const textNum = `${number}`;

	if (!number) return "zero"; 

	const lastHundreed = getHundreedInWords(+textNum.slice(-3));

	if (textNum.length <= 3) return lastHundreed;


	const result = [];
	const maxPostfixPos = getMaxPostfixPos(`${number}`.length);

	if (lastHundreed) result.push(lastHundreed)
	
	let sliceStart = -6;

	for (let i = 0; i<= maxPostfixPos; i++){
		const curentHundreedInWords = (getHundreedInWords(+textNum.slice(sliceStart, sliceStart+3)));
		sliceStart -= 3;

		if(curentHundreedInWords) result.push(`${curentHundreedInWords} ${POSTFIX[i]}`)
	};

	return result.reverse().join(' ');

  function getMaxPostfixPos(numLength){
    if (numLength <= 6) return 0;
    if (numLength <= 9) return 1;
  };
  
  
  function getHundreedInWords (num) {
  
    const textNum = `${num}`;
  
    if (num == 0) return "";
  
    if (num <= 19) {
      return NUM_1_TO_19[num]
    }; 
  
    if (textNum.length == 2) {
      const firstDigit = +textNum[0];
      const secondDigit = +textNum[1];
  
      if (secondDigit == 0) return TENS[firstDigit];
      if (secondDigit != 0) return TENS[firstDigit] + ' ' + NUM_1_TO_19[secondDigit];
    };
  
    if (textNum.length == 3){
      const hundreed = getHundreedInWords(+textNum[0]) + ' hundred';
      const rest = getHundreedInWords(+textNum.slice(1));
  
      return rest? hundreed + ' ' + rest: hundreed;
    }
  }
  
}
