/*Typewriting effect*/

const typedTextSpan = document.querySelector(".typed-text"); /* Storing elements into variables (the span element with the typed-text class) provides an easier access to the element. */
const cursorSpan = document.querySelector(".cursor"); /* To access to the span element with cursor class. */

const textArray = ["sviluppatore", "scrittore"]; /* Array of strings */
const typingDelay = 260; /* delay before typing the next character. Typing will be slower than erasing because the greater delay */
const erasingDelay = 100;
const newTextDelay = 2000; /* Delay of 2000ms between the current and the next string */
let textArrayIndex = 0; /* To keep track of the current string. We use let instead of const because we expect reassignment of values to these variables. */
let charIndex = 0; /* To keep track of the current character*/

/* The typing function types a character, then wait for typingDelay before calling itself again. If the last character of the string is typed, we wait 2000ms of newTextDelay before calling the erase function */
function type() {
  if(charIndex < textArray[textArrayIndex].length) { /* We want to type the next character if the last character of current string was not already typed: if charIndex is less than the length of the string. */
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing"); /* This removes the typing class (blinking animation) while typing. */
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex); /* We add the next character to the current textContent of the typedTextSpan; the current string is textArray[textArrayIndex], in order to get the character we use charAt. The charAt method returns the character at the specified index in a string.*/
    charIndex++; /* We increase charIndex by one to move on to the next character.*/
    setTimeout(type, typingDelay); /* We call the type function after waiting the typingDelay. */
  } else { /* When charIndex is equal to the length of the string, the else block is executed and the type function is stopped. */
    cursorSpan.classList.remove("typing"); /* When it stops typing, we can remove the typing class in order to get the blinking animation again. */
    setTimeout(erase, newTextDelay)
  }
}

function erase() {
  if(charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing"); /* We remove the blinking animation during the delating. */
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1); /* The substring method extraxcts the characters from a string, between two specified indices (start and end, not including end itself), and returns the new sub string. This method doesn't change the original string. Here it starts from the first character until but not included charIndex-1: the first time the erase function is called, charIndex has value of 12 which is the length of the first string; so to remove the last character in the firts repetition of the erase function, substring needs to extract starting from index 0 until but not include charIndex-1 that is equal to 11. */
    charIndex--; /* We reduce charIndex by one */
    setTimeout(erase, erasingDelay); /* We call the erase function again after a small delay */
  } else { /* When charIndex gets to zero, the entire string is erased and we get to the else block*/
    cursorSpan.classList.remove("typing"); /* When deleting is done, we remove the typing class in order to get the blinking animation. */
    textArrayIndex++; /* By increasing textArrayIndex by one, we move on to the next string. */
    if(textArrayIndex >= textArray.length) textArrayIndex=0; /* We chceck if textArrayIndex is greater or equal to the length of textArray and set textArrayIndex equal to zero. In this way we keep looping through the strings of the array. */
    setTimeout(type, typingDelay + 1000); /* In order to type the next string */
  }
}

document.addEventListener("DOMContentLoaded", function() { /* The addEventListener on the DOMContentLoaded event let us to specify the point of execution of the function: the function is executed when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images and subframes.*/
  if(textArray.length) setTimeout(type, newTextDelay); /* With the if statement, we check the array is not empty. */
})
