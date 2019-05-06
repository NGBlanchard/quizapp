'use strict';

//shows question and score
let questionNum = 0;
let score = 0;

//this function looks for when the button is clicked
//then it takes user to questionBox
function startButton() {
    $('.buttonStart').on('click', event => {
    $('.container1').remove();
    $('.questionContainer').css({
      'display': 'flex',
      'flex-direction': 'column'});
    $('.questionNum').text(1);
    console.log(questionNum);
    questionBox(questionNum);
});
}

//this function displays the question container 
function questionBox(){
    const userQuestionIndex = questionNum + 1;
    const quizbox = `
        <form class="quizbox">
            <fieldset>
            <legend>${STORE[questionNum].question}
            <p class="warning">Please select an answer!</p>
            </legend>
            <label class="answerOption">
            <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required>
            <span>${STORE[questionNum].answers[0]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required>
            <span>${STORE[questionNum].answers[1]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required>
            <span>${STORE[questionNum].answers[2]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required>
            <span>${STORE[questionNum].answers[3]}</span>
            </label>
            <button type="submit" class="submit-btn">Submit</button>
            </fieldset>
            <section class="counter">
                <p>Question: <span class=>${userQuestionIndex}</span>/10</p>
                <p>Score: <span class="score">${score}</span></p>
            </section>
        </form>`
    $('.questionContainer').html(quizbox);
  }


//this function handles submit button
function submitAnswer(){
    $('.questionContainer').on('click', '.submit-btn', event => {
        event.preventDefault();
        const userAnswer = $('input:checked').val();
        const userIsCorrect = getAnswer(userAnswer);
        if (!userAnswer) {
          chooseAnswerWarning();
        } else if (userIsCorrect) {
        correctAnswer();
        changeQuestionNumber();
        } else {
        incorrectAnswer();
        changeQuestionNumber();
        }
        console.log("made it to the console!", userAnswer);
      //if (questionNum < STORE.length) {
      //     questionBox();
      //  } else {
      //      displayScore();
      //  }
    });
    }
  
function chooseAnswerWarning() {
  $('.warning').css('display', 'block');
}

//this function updates the question number
function changeQuestionNumber(){
    questionNum++;
    console.log(questionNum);
    $('.questionNum').text(questionNum + 1);
    
}

//this compares users answer with data
function getAnswer(userAnswer) {
  if (userAnswer === STORE[questionNum].correctAnswer) {
    return true;
  } else {
    return false;
  }
}

//this function handles answers that are correct
function correctAnswer(){
  score++;
    const youreCorrect = `
    <form class="quizbox">
            <fieldset>
            <legend>You're correct! Cheers to your literary prowess.</legend>
            <img class= "img1" src="https://media.giphy.com/media/3o6ZtfLJXFkJEROJSU/giphy.gif" alt="Hemingway drinking wine.">
            <p>Your current score is ${score} out of 10.</p>
            </fieldset>
            <div class="correct">
            <button type="submit" class="next">Next</button>
            </div>
        </form>`
    $('.questionContainer').html(youreCorrect);
}

//this function handles answers that are incorrect
function incorrectAnswer(){
  const youreIncorrect = `
    <form class="quizbox">
            <fieldset>
            <legend>Nope! The correct answer is ${STORE[questionNum].correctAnswer}. Better luck next time.</legend>
            <img class="img2" src="https://media.giphy.com/media/3o7aTEvWRHBIbNeG2s/giphy.gif" alt="Princess Bride old man shuts book.">
            <p>Your current score is ${score} out of 10.</p>
            </fieldset>
            <div class="correct">
            <button type="submit" class="next">Next</button>
            </div>
        </form>`
    $('.questionContainer').html(youreIncorrect);
}

function nextQuestion(){
  $('.questionContainer').on('click', '.next', event => {
        event.preventDefault();
  if (questionNum < STORE.length) {
            questionBox();
        } else {
            displayScore();
        }
})
}

//this function displays the user's score
function displayScore(){
      const endQuiz = `
        <form class="quizbox">
            <fieldset>
            <legend>Your score was ${score} out of 10!</legend>
            </label>
            </fieldset>
            <div>
            <img class="img1" src="https://media.giphy.com/media/3o85xG3i2IQrHhPJyU/giphy.gif" alt="Agent Scully reading a book.">
            <button type="submit" class="restart">Play Again</button>
            </div>
        </form>`
    $('.questionContainer').html(endQuiz);
  }

//this function handles a button that users can play again
function tryAgain(){
  $('.questionContainer').on('click', '.restart', event => {
    event.preventDefault();
    questionNum = 0;
    score = 0;
    questionBox(questionNum);
});
}

//callback function
function makeQuiz(){
    startButton();
    submitAnswer();
    nextQuestion();
    displayScore();
    tryAgain();
}


//wait for DOM to load
$(document).ready(function() {
    makeQuiz();
});