const qwerty= document.getElementById('qwerty');
const phrase= document.getElementById('phrase');
const ul= document.getElementById('phrase')
const BttonRST= document.querySelector('.btn__reset'); 
const Overlay= document.getElementById('overlay');
const result= document.querySelector('.title');
const hearts = document.getElementsByClassName('tries');
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
    for (let i = 0; i < arr.length; i ++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);
        if(arr[i] !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
    }

};

//* attach an event listener to the "Start Game" button to hide the  screen overlay*//
BttonRST.addEventListener('click', () => {
    Overlay.style.display= 'none';
    Overlay.classList.remove('win');
    Overlay.classList.remove('lose');
});

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// check if letter is in the phrase//
const checkletter = button => {
    const words = document.querySelectorAll('li');
    let matchLetter = null;
     for (let i = 0; i < words.length; i ++) {
        if (words[i].textContent.toLowerCase() === button) {
            words[i].classList.add('show');
            matchLetter = button;
        }
    }     
    return matchLetter;
} 

//check if the game has been won or lost//
const checkWin = () => {
    const hide = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    if (hide.length === show.length) {
        Overlay.classList.add=('win');
        result.innerHTML ='Congrats! You Won!';
        Overlay.style.display= 'flex';
    } else if (missed > 4) {
        Overlay.classList.add='lose';
        result.innerHTML='Sorry! You lost! Try Again!';
        Overlay.style.display='felx';
        } 
};
checkWin();

//* listen for the onscreen keyboard to be clicked*//
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !=='chosen') {
        e.target.classList.add ('chosen');
        const matchLetter = checkletter(e.target.textContent);
        checkWin();

    } else if (matchLetter === null) {
            hearts[missed].src='img/lostHeart.png';
            missed ++;
        }  
    }        
);    
