'use strict';

//get a random number between 1 and 20 as the secret number
const secret = () => {
    return  Math.trunc(Math.random()*20  + 1);
};
let  secretNum = secret();

let message = document.querySelector('.msg-desktop');
let number = document.querySelector('.number');
let attempt = 20;
let title  = document.querySelector('.title');
let body = document.querySelector('body');
let highScore = document.querySelector('.highscore');
let score = document.querySelector('.score');


//get input from user when he clicks the check button

document.querySelector('.check').addEventListener('click', ()=>{
    //extract user input
    const guess = Number(document.querySelector('.guess').value);

    //function to reduce the attempts and display it
    const attemptCount = ()=> {
        if(attempt > 1){
            attempt--;
            score.textContent = attempt;
        } else {
            message.textContent = 'Maximum attempts reached';
            score.textContent = 0;
            body.style.backgroundColor = "red";
            title.textContent = "The secret number is..";
            number.textContent = secretNum;
            document.querySelector('.guess').disabled = true;
        }
    }

    //when there is no input from user or when the number is not in our range
    if(!guess || guess < 1 || guess > 20) {
        message.textContent = 'Invalid Input! Number should be between 1 and 20';
    } 
    //when user inputs a number higher
    else if(guess > secretNum){
        message.textContent = 'Too high!';
        attemptCount();
    }
    //when user inputs a number lower
    else if(guess < secretNum){
        message.textContent = 'Too low!';
        attemptCount();
    }
    //when user gets the number right
    else if(guess === secretNum) {
        message.textContent = 'Correct answer!';
        body.style.backgroundColor = "green";
        title.textContent = "You guessed the number!";
        number.textContent = secretNum;
        document.querySelector('.guess').disabled = true;

        //update user's highscore
        if (Number(highScore.textContent) === 0) {
            highScore.textContent = attempt;
        }
        else if(Number(highScore.textContent) <= attempt) {
            highScore.textContent = score.textContent;
        }
    }

})

//reset the game when user clicks again button
document.querySelector('.again').addEventListener('click', () =>{
     
    body.style.backgroundColor = '#222';
    document.querySelector('.guess').value = "";
    document.querySelector('.guess').disabled = false;
    attempt = 20;
    document.querySelector('.score').textContent = attempt;
    number.textContent = "?";
    message.textContent = 'Start guessing...';
    title.textContent = "Guess My Number!";
    secretNum = secret();
})

//show the number when user clicks the reveal number button
document.querySelector('.reveal').addEventListener('click', () =>{
    document.querySelector('.guess').disabled = true;
    title.textContent = "The secret number is..";
    number.textContent = secretNum;
    message.textContent = 'Click again to play';
})