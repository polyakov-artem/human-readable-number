const ones = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
};

const teens = {
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen'
};

const tens = {
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety'
};

module.exports = function toReadable(num) {

    if (num == 0) return 'zero';
    if (num <= 99) return convertNumBelowHundred(num);
    if (num <= 999) return convertHundreds(num);

    function convertNumBelowHundred(num) {
        let ten, remainder, str;

        if (num < 10) return convertDigit(num);
        if (num >= 10 && num < 20) return teens[num];

        ten = Math.floor(num / 10) * 10;
        remainder = num - ten;
        str = `${tens[ten]}`;

        if (remainder) str = `${str} ${convertDigit(remainder)}`;

        return str
    }

    function convertHundreds(num) {
        const hundred = Math.floor(num / 100);
        const remainder = num - hundred * 100;

        let str = `${convertDigit(hundred)} hundred`;

        if (remainder) str = `${str} ${convertNumBelowHundred(remainder)}`;

        return str
    }

    function convertDigit(num) {
        return ones[num];
    }

}
