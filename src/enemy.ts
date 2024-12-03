import { Player } from "./player";

export class Enemy extends Player {
    static step = 120;
    static timeForChangeDirection = 4000;
    static intervalForChangePosition = 500;
    constructor(name: string) {
      super(name);
      this.playerDiv.classList.add("enemy");
      this.playerImg.src="/fireball.jpg";
      if(this.pacContainer?.clientHeight!==undefined){
      this.positionY = 480;
      this.playerDiv.style.top = `${this.positionY}px`;
      this.positionX = 1080;
      this.playerDiv.style.left = `${this.positionX}}px`;
      }
    }
    randomChangeDirect() {
        let randomIndex = Math.floor(Math.random() * this.directs.length);
        this.direct = this.directs[randomIndex];
    }
  }