const qwerty= document.getElementById('qwerty');
const phrase= document.getElementById('phrase');
const startButton= document.querySelector('.btn_reset'); 
let missed= 0;

const phrases= [
    'Galaxy far away',
    'Universe is calling my name',
    'Infinite amount of laughs',
    'Black hole is a huge vacuum',
    'Time is not on our side'
];


//*Return a random phrase from an array*//
const getRandomPhraseAsArray= arr => {
    let randomNumber = Math.floor(Math.random() * arr.length);
    let phrase = arr[randomNumber];
    return phrase.split('');
}

//*adds the letter of a string to the display*//
const addPhraseToDisplay = arr => {
    const ul = phrase.getElementsByTagName('ul')[0];
    for (let i = 0; i < arr.length; i ++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        if ( arr[i] === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter'
        }
        ul.appendChild(li)
    }

}

//* check if a letter is in the phrase*//
const checkletter = button => {
    const letters = phrase.getElementsByTagName('li'); 
    let matchLetter = null;
    for (let i = 0; i < letters.length; i ++) {
        if (letters[i].textContent.toLocaleLowerCase()=== button.textContent) {
            letters[i].className += 'show';
            matchLetter = letters[i].textContent;
        }
    }
    return matchLetter;
} 

//* check if the game has been won or lost*//
const checkWin = () => {
    const liLetter = document.getElementsByClassName('letter');
    const liShow = document.getElementsByClassName('show');
    const overlay = document.getElementById('overlay');

    if (liLetter.length === liShow.length) {
        overlay.className = 'win';
        overlay.textContent = 'You Won!'
        overlay.style.display = 'flex';
        return overlay; 
    } else {
        if (missed > 4 ) {
            overlay.className ="lose";
            overlay.textContent = 'You lost, Try Again!';
            overlay.style.display ="flex";
            return overlay;
        }
    }

    


}

//* attach an event listener to the "Start Game" button to hide the start screen overlay*//
startButton.addEventListener ('click', () => {
    document.getElementById('overlay').style.display = 'none';
    let randomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhrase);
});

qwerty.addEventListener('click'), (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        button.className = 'chosen'
        button.disabled = true;
        
        const checkletter = checkletter(button);
        if (checkletter === null) {
            const hearts = document.querySelectorAll ('.tries');
            hearts [missed].src = "../img/lostHeart.png";
            missed += 1;


        }  
    } checkWin();

}