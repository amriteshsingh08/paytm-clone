// eventually, later in the code, the user will be able to choose the max life of the monster and the player, but for now, let's hard code the max lives
const ATTACK_VALUE = 7;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
let strongAttackTimes = 4;
let healtimes = 2;
const ATTACK_MODE = "attack";
const STRONG_ATTACK_MODE = "strong_attack";
// const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
// const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
// const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
// const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
// const LOG_EVENT_GAME_OVER = "GAME_OVER";
// let chosenMaxLife = 100;

function getValidInput(){
  let enteredValue = parseInt( prompt("Enter the Maximum HP for you and the monster", "100"));
if (isNaN(enteredValue) || enteredValue <= 0) {
  // chosenMaxLife = 100;  now we don't do this, but we throw an error
  throw {message : 'Invalid user input! Not a number!'}  // this is an object,often we throw an object

  // VVIMP!!---- after throw, no button function works

}
return enteredValue;
}
let chosenMaxLife;
try{
   chosenMaxLife = getValidInput();
}catch(error){
  console.log(error); // now, the error message in 'throws' is just displayed, but the site function doesn't stop
  chosenMaxLife = 100;  // HANDLING ERROR
  alert('You entered something wrong, default value of 100 was used');
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHEalth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

// function attackHandler(){    // name all function of eventListener with "handler"
//    const damage = dealMonsterDamage(ATTACK_VALUE);
//    currentMonsterHealth -= damage;
//    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
//    currentPlayerHEalth -= playerDamage;
//    if(currentMonsterHealth <=0 && currentPlayerHEalth > 0){
//     alert('Yay! You Won');
//    }else if(currentPlayerHEalth <= 0 && currentMonsterHealth > 0){
//     alert('Oops! You Lost');
//    }else if(currentPlayerHEalth === 0 && currentMonsterHealth === 0){
//     alert("It's a Draw");
//    }
// }
// function strongAttackHandler(){
//   const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
//    currentMonsterHealth -= damage;
//    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
//    currentPlayerHEalth -= playerDamage;
//    if(currentMonsterHealth <=0 && currentPlayerHEalth > 0){
//     alert('Yay! You Won');
//    }else if(currentPlayerHEalth <= 0 && currentMonsterHealth > 0){
//     alert('Oops! You Lost');
//    }else if(currentPlayerHEalth === 0 && currentMonsterHealth === 0){
//     alert("It's a Draw");
//    }

//    //VVVV IMP!!---   HERE we see that the code is repeated and its never a good
//                    //practice to repeat code and therefore, we'll use a function
// }
let hasBonusLife = true;

function endRound() {
  const initialPlayerHealth = currentPlayerHEalth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHEalth -= playerDamage;
  writeToLog("MONSTER_ATTACK" , playerDamage, currentMonsterHealth, currentPlayerHEalth, 'PLAYER');
  // battleLog.push(logEntry);

  if (currentPlayerHEalth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHEalth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would have died but the bonus life save yo ass !");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHEalth > 0) {
    alert("Yay! You Won");
    writeToLog("GAME_OVER" , 'player_won', currentMonsterHealth, currentPlayerHEalth, null);
    reset();
    strongAttackTimes = 4;
    healtimes = 2;
    // if(hasBonusLife === false){
    //   addBonusLifeAfterGame();
    // }

  } else if (currentPlayerHEalth <= 0 && currentMonsterHealth > 0) {
    alert("Oops! You Lost");
    writeToLog("GAME_OVER" , 'player_lost', currentMonsterHealth, currentPlayerHEalth, null);
    reset();
    strongAttackTimes = 4;
    healtimes = 2;
    // if(hasBonusLife === false){
    //   addBonusLifeAfterGame();
    // }
  } else if (currentPlayerHEalth === 0 && currentMonsterHealth === 0) {
    alert("It's a Draw");
    writeToLog("GAME_OVER" , 'draw', currentMonsterHealth, currentPlayerHEalth, null);
    reset();
    strongAttackTimes = 4;
    healtimes = 2;
    // if(hasBonusLife === false){
    //   addBonusLifeAfterGame();
    // }
  }
}
let maxDamage;
function attackMonster(mode) {
  let attackType;
  if (mode === ATTACK_MODE) {
    maxDamage = ATTACK_VALUE;
    attackType = 'PLAYER_ATTACK'; 
  } else if (mode === STRONG_ATTACK_MODE && strongAttackTimes >= 0) {
    maxDamage = STRONG_ATTACK_VALUE;
    attackType = 'PLAYER_STRONG_ATTACK';
  } else {
    alert("You can't use strong attack on the monster for more than 4 times ");
    maxDamage = ATTACK_VALUE;
    attackType = 'PLAYER_ATTACK';
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  if(attackType === 'PLAYER_ATTACK'){
    writeToLog('PLAYER_ATTACK' , damage, currentMonsterHealth, currentPlayerHEalth, 'MONSTER');
  } else if(attackType === 'PLAYER_STRONG_ATTACK'){
    writeToLog('PLAYER_STRONG_ATTACK' , damage, currentMonsterHealth, currentPlayerHEalth, 'MONSTER');
  }
  endRound();

}

function attackHandler() {
  attackMonster(ATTACK_MODE);
}

function strongAttackHandler() {
  strongAttackTimes--;
  attackMonster(STRONG_ATTACK_MODE);
}

function healPlayerHandler() {
  // increasePlayerHealth(HEAL_VALUE);
  // the monster should still be able to hit us while we heal, so.

  // const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  // currentPlayerHEalth -= playerDamage;
  // if (currentMonsterHealth <= 0 && currentPlayerHEalth > 0) {
  //   alert("Yay! You Won");
  // } else if (currentPlayerHEalth <= 0 && currentMonsterHealth > 0) {
  //   alert("Oops! You Lost");
  // } else if (currentPlayerHEalth === 0 && currentMonsterHealth === 0) {
  //   alert("It's a Draw");
  // }

  // with the above code, the player's health decreases when we heal at the start of the game when we already have full health,  but we don't want that, also, if we press heal a lot, we eventually lose, even though the heal bar doest go empty, it is because we haven't adjusted the current health value of the player after hr heals.
  // since this code is repeated, we can make a function.
  healtimes--;
  let healValue;
  if (currentPlayerHEalth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health");
    healValue = chosenMaxLife - currentPlayerHEalth;
  } else {
    healValue = HEAL_VALUE;
  }
  if(healtimes>=0){
  increasePlayerHealth(healValue);
  currentPlayerHEalth += healValue;
  writeToLog('PLAYER_HEAL' , healValue, currentMonsterHealth, currentPlayerHEalth, 'PLAYER');
  endRound();
  }
  else{
    alert("can't heal more than twice");
  }
}
function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHEalth = chosenMaxLife;
  // adjustHealthBars(chosenMaxLife);
  resetGame(chosenMaxLife);
}
let battleLog = [];
let logEntry;
function writeToLog(ev, val, monsterHealth , playerHealth,tar ){
  
  logEntry = {
    event: ev,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
    value: val,
    target: tar
  };
  battleLog.push(logEntry);
  // console.log(battleLog);
  

}
function printwriteToLog()
{
  for(let i=0; i<3; i++){
    console.log("----------");   // doesn't show 3 lines in console cuz of browser or some stuff, it just writes 3 there.
  }
  // for(let i=0; i < battleLog.length ; i++){
  //   console.log(i);  // printing index of every entry
  //   console.log(battleLog[i]);
  // }               
                        ///    OR(using for-of)
    
  // let i=0;   // for index(since for-of doesn't give that benefit)
  // for(const log of battleLog){
  
  //  console.log(i);
  //  console.log(log);
  //  i++;
  // }
                              //  OR using (for-in)
  let i=0;
  for(const log of battleLog){
     console.log(`#${i}`);
     for(const key in logEntry){
      // console.log(key);
      // console.log(logEntry[key]); 

      //to make it more readable in console, we can also write above 2 lines as:
      console.log(`${key} --> ${logEntry[key]}`);
     }
     i++;
  }


  // let j=4;
  // console.log(j + 'meow');
    // console.log(battleLog);   // initially, only this was there in this function
}


attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printwriteToLog);
