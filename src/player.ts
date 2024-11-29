type TDirect = "left" | "right" | "up" | "down" | "";
export class Player {
  name: string;
  positionX?: number;
  positionY?: number;
  moveInterval: any;
  static step = 120;
  static speed = 500;
  direct: TDirect;
  directs: TDirect[];

  speedRandom = 1000;
  playerDiv = document.createElement("div");
  playerImg = document.createElement("img");
  pacContainer = document.querySelector(".pacContainer");
  constructor(
    name: string,
    initialPositionX?: number,
    initialPositionY?: number
  ) {
    this.direct = "";
    this.directs = ["down", "left", "right", "up"];
    this.name = name;
    this.playerDiv.classList.add("player");
    this.playerImg.src="/snowball.jpg";
    
    this.playerImg.style.display='absolute'
    this.playerImg.style.width='120px'
    this.playerImg.style.height='120px'
    this.playerImg.style.borderRadius='50%'
    this.playerImg.style.objectFit='none'
    this.playerDiv.appendChild(this.playerImg);
    this.pacContainer?.appendChild(this.playerDiv);
    this.positionX = initialPositionX ? initialPositionX : 0;
    this.positionY = initialPositionY ? initialPositionY : 0;
    this.playerDiv.style.top = `${this.positionX}px`;
    this.playerDiv.style.left = `${this.positionY}px`;
  }
  moveLeft() {
    if (this.positionX!==undefined) {
      this.positionX = this.positionX - Player.step;
      this.playerDiv.style.left = `${this.positionX}px`;
    }
  }
  moveRight() {
    if (this.positionX!==undefined) {
    this.positionX = this.positionX + Player.step;
    this.playerDiv.style.left = `${this.positionX}px`;
  }
  }
  moveUp() {
    if (this.positionY!==undefined) {
    this.positionY = this.positionY - Player.step;
    this.playerDiv.style.top = `${this.positionY}px`;
  }
  }
  moveDown() {
    if(this.positionY!==undefined){
    this.positionY = this.positionY + Player.step;
    this.playerDiv.style.top = `${this.positionY}px`;
  }
  }
  changeDirection() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "ArrowRight") this.direct = "right";
      if (e.key === "ArrowLeft") this.direct = "left";
      if (e.key === "ArrowDown") this.direct = "down";
      if (e.key === "ArrowUp") this.direct = "up";
    });
  }
  changePosition() {
    if(this.positionX!==undefined &&  this.pacContainer?.clientHeight!==undefined && this.positionY!==undefined){
    if (this.direct === "left") this.moveLeft();
    if (this.direct === "left" && this.positionX < 0) this.moveRight();
    if (this.direct === "right") this.moveRight();
    if (this.direct === "right" && this.positionX > this.pacContainer?.clientWidth - this.playerDiv.offsetWidth)this.moveLeft();
    if (this.direct === "up") this.moveUp();
    if (this.direct === "up" && this.positionY < 0) this.moveDown();
    if (this.direct === "down") this.moveDown();
    if (this.direct === "down" && this.positionY > this.pacContainer?.clientHeight - this.playerDiv.offsetHeight)this.moveUp();
  }
}
 
}