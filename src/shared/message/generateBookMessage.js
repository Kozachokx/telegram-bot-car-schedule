const languagePack = require('../../language');

const bookFirstMessage = ({ plateString, language_code = 'UA' }) => {
  if (!plateString || !plateString.length) 
    return `${languagePack[language_code].CHOOSE_YOUR_PLATE}`
  return `${languagePack[language_code].YOUR_PLATE}: ${plateString}`
}

module.exports = { bookFirstMessage }