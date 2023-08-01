const randomAccountNumber = (numDigits) => {
    return Math.floor(Math.random() * (Math.pow(10, numDigits)));
};


module.exports = randomAccountNumber;