const startGameBtn = document.getElementById('start-game-btn');

// const person = {
//   greet: function greet(name){
//     console.log('Hello ' + name);
//   }
// };                                        here, greet() function is called a method since it is
//                                            inside an abject

// person.greet('yash');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSOR = 'SCISSOR';
const DEFAULT_USER_CHOICE = ROCK;
let gameIsRunning = false;

const getPlayerChoice = function(){
  const selection= prompt(`${ROCK}, ${PAPER} OR ${SCISSOR}?`).toUpperCase();
  if(selection !== ROCK && selection !== PAPER && selection !== SCISSOR){

    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you`);
    return DEFAULT_USER_CHOICE;

  }
  return selection;
};

const getComputerChoice = function(){
  const randomVal = Math.random();
  if(randomVal < 0.34){
    return ROCK;
  }else if(randomVal < 0.67){
    return PAPER;
  }else{
    return SCISSOR;
  }
}

// const getWinner = function(pChoice, cChoice){
//   if(pChoice === ROCK && cChoice === SCISSOR || pChoice=== SCISSOR && cChoice=== PAPER ||
 //    pChoice=== PAPER && cChoice=== ROCK){
//      return 'You Won!';
//     }else if(pChoice === cChoice){
//       return "It's a Draw!";
//     }else{
//       return 'Computer Won';
//     }
// }              WE CAN WRITE THE ABOVE FUNCTION JUSING "ARROW FUNCTIONS" TOO

let DRAW = "It's a Draw!"; 
let pWin= 'You Won';
let cWin = 'Computer Won'

const getWinner = (pChoice , cChoice) =>
  cChoice=== pChoice ? DRAW : (pChoice === ROCK && cChoice === SCISSOR || pChoice=== SCISSOR && cChoice=== PAPER || pChoice=== PAPER && cChoice=== ROCK) ? pWin : cWin;


startGameBtn.addEventListener('click' , function(){
  if(gameIsRunning){
    return;        // come out of the function(indirectly stopping everything) if the game is already running
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerSelection = getPlayerChoice();
  console.log(`You chose ${playerSelection}`);
  const computerSelection = getComputerChoice();
  console.log(`The computer chose ${computerSelection}`);
  const winner = getWinner(playerSelection, computerSelection);
  console.log(winner);
  if(winner === DRAW){
    alert(`The computer chose ${computerSelection} and you chose ${playerSelection}, so it's a Draw!`);
  }else if(winner === pWin){
    alert(`The computer chose ${computerSelection} and you chose ${playerSelection}, so ${pWin}`);
  }else{
    alert(`The computer chose ${computerSelection} and you chose ${playerSelection}, so ${cWin}`);
  }
  gameIsRunning = false;  // TO START THE GAME AGAIN

})

// THe below is not related to the game

const sumUp = (...numbers) =>{
  const validateNum = (number)=>{
    return isNaN(number) ? 0 : number;   // locally available function having block scope
  };
  let sum = 0;
  for(const num of numbers){
    sum += validateNum(num);
  }
  return sum;
};
console.log(sumUp(1,2,3,'kji',5));

// Call-back functions--------------------------------------------

const sumUp2 = (callBackFunction, ...numbers)=>{
  const validateNum = (number)=>{
    return isNaN(number) ? 0 : number;   
  };
  let sum = 0;
  for(const num of numbers){
    sum += validateNum(num);
  }
  callBackFunction(sum);
};

const showResult = (num)=>{
  alert('The result is:' + num);       //   CALL- BACK FUNCTION
};
sumUp2(showResult , 1,2,3,4,5);


