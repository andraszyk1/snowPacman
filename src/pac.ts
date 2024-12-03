import { Enemy } from "./enemy";
import { Player } from "./player";

type TLevel = "easy" | "medium" | "hard";
export class Pac {
  level: TLevel;
  player: Player;
  enemies: Enemy[];
  intervalPlayer:any;intervalEnemiesPosition:any;intervalEnemiesDirection:any;timeoutLevelUp:any;
  foodTab:HTMLDivElement[];
  scores=0;
  pacContainer = document.querySelector(".pacContainer");
  constructor(nick: string, level: TLevel) {
    this.level = level;
    this.enemies = []; 
    this.foodTab=[]
    this.player = new Player(nick, 0, 0);

    this.player.changeDirection()
    this.addEnemies();
    this.createFood()
    this.createScoresDiv()
    this.game();
  }

  addEnemy(nick: string) {
    let enemy = new Enemy(nick);
    this.enemies.push(enemy);
  }

  addEnemies() {
    if (this.level === "easy") {
      this.addEnemy("Gryzio");
    }
    if (this.level === "medium") {
      this.addEnemy("Gryzio");
      this.addEnemy("Dyzio");
    }
    if (this.level === "hard") {
      this.addEnemy("Gryzio");
      this.addEnemy("Dyzio");
      this.addEnemy("Fizio");
    }
  }
  levelUp(){
    this.timeoutLevelUp=setTimeout(()=>{
      this.level="medium"
      this.addEnemies()
    },60000)
  }
  createGameOver(){
    clearInterval(this.intervalPlayer);
    clearInterval(this.intervalEnemiesPosition);
    clearInterval(this.intervalEnemiesDirection)
    clearTimeout(this.timeoutLevelUp)
    let gameOver=document.createElement("div")
    gameOver.classList.add('gameOver')
    gameOver.textContent="GAME OVER"
    this.pacContainer?.appendChild(gameOver)
    this.player.playerDiv.classList.add("destroy")
  }
  checkGameOver() {
    this.enemies.forEach((enemy) => {
      if(enemy.positionX!==undefined && this.player.positionX!=undefined && enemy.positionY!==undefined && this.player.positionY!==undefined){
      if (
        (enemy.playerDiv.offsetLeft-this.player.playerDiv.offsetLeft<=120 && enemy.playerDiv.offsetLeft-this.player.playerDiv.offsetLeft>=-120) &&
        (enemy.playerDiv.offsetTop-this.player.playerDiv.offsetTop)<=120&&(enemy.playerDiv.offsetTop-this.player.playerDiv.offsetTop)>=-120
      
      ) {
        console.log("game over");
        this.createGameOver()

      }}
    });
  }
  createFood(){
    let countFoodPerWidth=this.pacContainer?.clientWidth ?  this.pacContainer?.clientWidth/this.player.playerDiv.offsetWidth :0
    let countFoodPerHight=this.pacContainer?.clientHeight ? this.pacContainer?.clientHeight/this.player.playerDiv.offsetHeight:0
    for(let i=0;i<countFoodPerWidth;i++){
      for(let j=0;j<countFoodPerHight;j++){
      let lunchBox=document.createElement("div")
      lunchBox.classList.add('lunchBox')
      lunchBox.style.left=`${120*i}px`
      lunchBox.style.top=`${120*j}px`
      let food=document.createElement("div")
      food.classList.add('food')
      lunchBox.appendChild(food)
      this.pacContainer?.appendChild(lunchBox)
      this.foodTab.push(lunchBox)
      this.pacContainer?.appendChild(lunchBox)
    }
    }
  }
  checkIfPacmanEat(){
  this.foodTab.forEach((food,index)=>{
    if (
      food.offsetLeft === this.player.playerDiv.offsetLeft &&
      food.offsetTop === this.player.playerDiv.offsetTop
    ) {
       food.style.display='none'
       this.foodTab.splice(index,1)
       this.scores=this.scores+1
    }
  })
}
createScoresDiv(){
  let oldScores=document.querySelector('.scores')
  if(oldScores){
    oldScores.remove()
  }
  let scores=document.createElement("div")
  scores.classList.add('scores')
  scores.textContent="Total scores : "+ this.scores.toString()
  this.pacContainer?.parentNode?.appendChild(scores)
}
createWinner(){
  clearInterval(this.intervalPlayer);
  clearInterval(this.intervalEnemiesPosition);
  clearInterval(this.intervalEnemiesDirection)
  clearTimeout(this.timeoutLevelUp)
  let winner=document.createElement("div")
  winner.classList.add('gameWinner')
  winner.textContent="WINNER"
  this.pacContainer?.appendChild(winner)

}
checkPlayerWinner(){
 if(this.foodTab.length===0)
  this.createWinner()
}
  
  game() {
    this.intervalPlayer=setInterval(() => {
   
      this.player.changePosition()
      this.checkGameOver();
      this.checkIfPacmanEat();
      this.checkPlayerWinner();
      this.createScoresDiv()
 
    
    }, Player.speed);
    this.intervalEnemiesPosition=setInterval(() => {
      this.enemies.forEach((enemy) => {
        enemy.changePosition();
      });
    },  Enemy.intervalForChangePosition);
    this.intervalEnemiesDirection=setInterval(() => {
      this.enemies.forEach((enemy) => {
        enemy.randomChangeDirect();
      });
    }, Enemy.timeForChangeDirection);
    this.levelUp()
  }
}
