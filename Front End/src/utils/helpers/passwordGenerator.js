export const generatePassword = () => {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  
    // Get one random character from each set
    const getRandomCharacter = (characters) => {
        return characters[Math.floor(Math.random() * characters.length)];
    };
  
    // Generate specific parts of the password
    const upperChar1 = getRandomCharacter(upperCase);
    const lowerChars1 = Array.from({length: 4}, () => getRandomCharacter(lowerCase)).join('');
    const upperChar2 = getRandomCharacter(upperCase);
    const lowerChars2 = Array.from({length: 3}, () => getRandomCharacter(lowerCase)).join('');
    const symbolChar = getRandomCharacter(symbols); // 1 symbol
    const numberChars = Array.from({length: 5}, () => getRandomCharacter(numbers)).join(''); // 5 digits
  
    // Combine all parts
    let password = upperChar1 + lowerChars1 + upperChar2 + lowerChars2 + symbolChar + numberChars;
  
    return password;
};
