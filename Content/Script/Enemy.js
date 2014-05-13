"use strict";
var Enemy = function (width, height) {
    //var mainDiv = document.getElementById("main");
    // //var canvas = document.createElement("canvas")
    //var canvas = document.getElementById("canvas")
    //this.ctx = canvas.getContext("2d");

    var mainDiv = document.getElementById("main");
    var canvas = document.createElement("canvas")
    this.ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id", "enemy");
    mainDiv.appendChild(canvas);

    this.enemyImage = new Image();
    this.enemyImage.src = "Content/Image/3.png";
    this.healthImage = new Image();
    this.healthImage.src = "Content/Image/healthbar.png";

    this.health = 4;
    //this.x = Math.floor((Math.random() * 600) + 1);
    this.x = 500
    this.y = 300;
    this.angle = 90;
    this.fire = false;
    this.vy = 0;
  
  
};
Enemy.prototype = {
    width: 20,
    height: 20,
    gravity: 10,
    aimSpeed: 0.05,
    speed: 5
};
Enemy.prototype.clear = function (player) {
    this.ctx.clearRect(0, 0, 800, 450)

};
Enemy.prototype.draw = function () {
    if (this.vy > -5) {
        this.vy -= this.gravity;
    }
    this.y -= this.vy;
    if (this.y + this.height > Game.game.height) {
        this.y = Game.game.height - this.height;
        this.jumping = false;
    }
    for (var i = 0; i < Game.map.length; i++) {

        if (Game.checkCollision(this, Game.map[i])) {
            this.y += this.vy;
            this.jumping = false;

        }
    }
    this.clear();
    if (this.health >= 0) {
        this.ctx.drawImage(this.enemyImage, this.x, this.y,this.width,this.height);
        if (this.health == 4) {
            this.ctx.drawImage(this.healthImage, 0, 0, 58, 58, this.x - 10, this.y - 25, 40, 40);
        }
        if (this.health == 3) {

            this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x - 5, this.y - 25, 40 * (this.health / 4), 40);
        }
        if (this.health == 2) {
            this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x, this.y - 25, 40 * (this.health / 4), 40);
        }
        if (this.health == 1) {
            this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x + 5, this.y - 25, 40 * (this.health / 4), 40);
        }
    }
}




