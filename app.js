const qwerty= document.getElementById('qwerty');
const phrase= document.getElementById('phrase');
const startButton= document.querySelector('.btn__reset'); 
const startOverlay= document.querySelector('#overlay');

let missed= 0;

const phrases= [
    'Galaxy far away',
    'Universe is calling my name',
    'Infinite amount of laughs',
    'Black hole is a huge vacuum',
    'Time is not on our side'
];


//Return a random phrase from an array//
const getRandomPhraseAsArray= arr => {
    const randomNumber = Math.floor(Math.random() * arr.length);
    let phrase = arr[randomNumber];
    return phrase.split('');
};

//adds the letter of a string to the display//
const addPhraseToDisplay = arr => {
    const ul = phrase.getElementsByTagName('ul');
        for (let i = 0; i < arr.length; i ++) {

    const li = document.createElement('li');
        li.textContent = arr[i];
        display.appendChild(li);
        if(arr[i] === '') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }

    const randomPhrase = addPhraseToDisplay(randomPhrase);
    return getRandomPhraseAsArray(phrases);
};

// check if letter is in the phrase//
const checkletter = (button) => {
    const letters = document.querySelectorAll('li');
    let match = null;
     for (let i = 0; i <letters.length; i ++) {
        if (letters[i].textContent.toLowerCase() === button.textContent) {
            letters[i].className += 'show';
            match = letters[i].textContent;
        }
    }     
    return match;
} 

//check if the game has been won or lost//
const checkWin = () => {
    const liLetter = document.getElementsByClassName('letter');
    const liShow = document.getElementsByClassName('show');
    if (liLetter.length === liShow.length) {
        startOverlay.className.add='win';
            startOverlay.remove('lose');
            startOverlay.textContent='Congrats! You Won!';
            startButton.textContent= 'Play Again!';
        startOverlay.style.display= 'flex';
        return startOverlay;
    }   else if (missed > 4) {
            startOverlay.className='lose';
            startOverlay.remove('win');
            startButton.textContent='Sorry! You lost! Try Again!';
            startOverlay.style.display='felx';
        }
};

//* attach an event listener to the "Start Game" button to hide the start screen overlay*//
startButton.addEventListener('click', () => {
    startOverlay.style.display= 'none';

});


//* listen for the onscreen keyboard to be clicked*//
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !=='chosen') {
        const buttoncheck = checkletter(e.target.textContent);
        e.target.className += 'chosen';
        if (buttoncheck === null) {
            missed += 1;
            let ol = document.getElementsByTagName ('ol')[0];
            let tries = document.getElementsByClassName('tries')[0];
            ol.removeChild(tries);
        }
    }
    return checkWin();
});    