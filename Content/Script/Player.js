"use strict";
/**
 *
 * @param width is game width
 * @param height is game height
 * @constructor Contains all properties of player.
 */
var Player = function (width, height) {
    var that = this;
    var mainDiv = document.getElementById("gameDiv");
    var canvas = document.createElement("canvas")
    this.ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id", "player")
    mainDiv.appendChild(canvas);

    this.playerImage = new Image();
    this.playerImage.src = "Content/Image/rabbit.png";
    this.aimImage = new Image();
    this.aimImage.src = "Content/Image/aim.png";
    this.healthImage = new Image();
    this.healthImage.src = "Content/Image/healthbar.png";

    this.jumping = false;
    this.x = 225;
    this.y = 200;
    this.angle = 0;
    this.firearm = 0;
    this.health = 4;
    this.fired = false;
    this.faceLeft = true;
    this.vy = 0;
    this.drawModolus = 0;
    this.move = false;

    // Interval used to draw movement of player.
    setInterval(function () {
        that.drawModolus +=1
    }, 100);
}

Player.prototype = {
    width: 40,
    height: 40,
    gravity: 10,
    aimSpeed: 0.03,
    speed: 5,
    dead : false
}

Player.prototype.clear = function (player) {
    this.ctx.clearRect(0, 0, Game.game.width, Game.game.height)
}
/**
 * Function to draw and animate player on canvas.
 */
Player.prototype.draw = function () {
    this.clear();
    this.animatePlayer();
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
                this.jumping = false;
                this.y += this.vy;
        }
    }
    // Multiple IF cases that check what side player face, and then draw health bar depending on player health.
    if (this.faceLeft == true) {
        this.ctx.drawImage(this.aimImage, this.x  - 100 * Math.cos(this.angle), (this.y  - 100 * Math.sin(this.angle)) + this.height / 2 - 10, 20, 20);
    }
    if (this.faceLeft == false) {
        this.ctx.drawImage(this.aimImage, this.x - 100 * Math.cos(this.angle), this.y - 100 * Math.sin(this.angle) + this.height / 2 - 10, 20, 20);
    }
    if (this.health == 4) {
        this.ctx.drawImage(this.healthImage, 0, 0, 58, 58, this.x -10, this.y - 25, this.width, this.height);
    }
    if (this.health == 3) {
        this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x - 5, this.y - 25, this.width * (this.health / 4), this.height);
    }
    if (this.health == 2) {
        this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x, this.y - 25, this.width * (this.health / 4), this.height);
    }
    if (this.health == 1) {
        this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x + 5, this.y - 25, this.width * (this.health / 4), this.height);
    }
    if (this.health <= 0) {
        this.dead = true;
    }
};
// Function to animate player facing left or right and player movement.
Player.prototype.animatePlayer = function () {
    if(this.move == true) {
        if (this.faceLeft == true) {
           if (this.drawModolus % 3 == 0) {
                this.ctx.drawImage(this.playerImage, 0, 0, 114, 98, this.x, this.y, this.width, this.height);            }
            if (this.drawModolus % 3 == 1) {
                this.ctx.drawImage(this.playerImage, 114, 0, 114, 98, this.x, this.y, this.width, this.height);
            }
            else {
                this.ctx.drawImage(this.playerImage, 228, 0, 114, 98, this.x, this.y, this.width, this.height);
            }
        }
        else {
          if (this.drawModolus % 3 == 0) {
               this.ctx.drawImage(this.playerImage, 0, 98, 114, 98, this.x, this.y, this.width, this.height);
           }
             if (this.drawModolus % 3 == 1) {

                this.ctx.drawImage(this.playerImage, 114, 98, 114, 98, this.x, this.y, this.width, this.height);
            }
            else {
                this.ctx.drawImage(this.playerImage, 228, 98, 114, 98, this.x, this.y, this.width, this.height);
            }
        }
    }
    else if (this.faceLeft == true){
        this.ctx.drawImage(this.playerImage, 0, 0, 114, 98, this.x, this.y, this.width, this.height);
    }
    else{
        this.ctx.drawImage(this.playerImage, 0, 98, 114, 98, this.x, this.y, this.width, this.height);
    }
};

