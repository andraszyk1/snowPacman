import { Player } from "./player";

export class Enemy extends Player {
    static step = 120;
    static timeForChangeDirection = 2000;
    static intervalForChangePosition = 500;
    constructor(name: string) {
      super(name);
      this.playerDiv.classList.add("enemy");
      if(this.pacContainer?.clientHeight!==undefined){
      let randomX = Math.ceil(Math.random() * (Math.floor(this.pacContainer?.clientWidth/this.playerDiv.offsetWidth)));
      let randomY = Math.ceil(Math.random() * (Math.floor(this.pacContainer?.clientHeight/this.playerDiv.offsetHeight)));
      this.positionX = Enemy.step * randomX;
      this.playerDiv.style.top = `${this.positionX}px`;
      this.positionY = Enemy.step * randomY;
      this.playerDiv.style.left = `${this.positionY}}px`;
      }
    }
    randomChangeDirect() {
        let randomIndex = Math.floor(Math.random() * this.directs.length);
        this.direct = this.directs[randomIndex];
    }
  }