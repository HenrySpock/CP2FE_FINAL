
// CheckForbiddenWords.js
const fetchForbiddenWords = async () => {
  try {
    const response = await fetch('/forbidden-words.json');
    const data = await response.json();
    return data; // data is an array of forbidden words
  } catch (error) {
    console.error('Error fetching forbidden words:', error);
    return [];
  }
};

const stripHtml = (html) => {
  // Create a new div element and set its innerHTML to the provided HTML content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Get the text content from the div, effectively stripping away HTML tags
  return tempDiv.textContent || tempDiv.innerText || '';
};

const checkForbiddenWords = async (inputText) => {
  const forbiddenWords = await fetchForbiddenWords();

  // Strip HTML and convert text to lower case for comparison
  const plainText = stripHtml(inputText).toLowerCase();

  // Convert forbiddenWords to lowercase for comparison
  const lowercaseForbiddenWords = forbiddenWords.map(word => word.toLowerCase());

  // Check for forbidden words
  const wordsFound = lowercaseForbiddenWords.filter(word => plainText.includes(word));
  
  // console.log('Forbidden words found:', wordsFound); // Debugging log
  return wordsFound;
}; 

export default checkForbiddenWords;

