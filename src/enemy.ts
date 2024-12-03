import { Player } from "./player";

export class Enemy extends Player {
    static step = 120;
    static timeForChangeDirection = 2000;
    static intervalForChangePosition = 500;
    constructor(name: string) {
      super(name);
      this.playerDiv.classList.add("enemy");
      this.playerImg.src="/fireball.jpg";
      if(this.pacContainer?.clientHeight!==undefined){
      let randomX = Math.floor(Math.random() * (this.pacContainer?.clientWidth/this.playerDiv.offsetWidth));
      let randomY = Math.floor(Math.random() * (this.pacContainer?.clientHeight/this.playerDiv.offsetHeight));
  
      
      this.positionX = this.playerDiv.offsetWidth * randomX;
      this.playerDiv.style.top = `${this.positionX}px`;
      this.positionY = this.playerDiv.offsetHeight * randomY;
      this.playerDiv.style.left = `${this.positionY}}px`;
      console.log(this.positionX,this.positionY);
      }
    }
    randomChangeDirect() {
        let randomIndex = Math.floor(Math.random() * this.directs.length);
        this.direct = this.directs[randomIndex];
    }
  }