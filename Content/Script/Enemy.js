"use strict";
/**
 *
 * @param width Canvas height
 * @param height Canvas height
 * @constructor Contains all properties and AI for my Enemy.
 */
var Enemy = function (width, height) {
    var mainDiv = document.getElementById("gameDiv");
    var canvas = document.createElement("canvas")
    this.ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id", "enemy");
    mainDiv.appendChild(canvas);

    this.enemyImage = new Image();
    this.enemyImage.src = "Content/Image/rabbit.png";
    this.healthImage = new Image();
    this.healthImage.src = "Content/Image/healthbar.png";

    this.health = 4;
    this.x = 20;
    this.y = 100;
    this.angle = 90;
    this.fire = false;
    this.vy = 0;
    this.faceLeft = false;
    this.moveRange = 100;
    this.target = false;


};
Enemy.prototype = {
    width: 40,
    height: 40,
    gravity: 5,
    aimSpeed: 0.05,
    speed: 5,
    dead: false
};
/**
 *
 * @param player clear function clear playerobject from canvas
 */
Enemy.prototype.clear = function (player) {
    this.ctx.clearRect(0, 0, 800, 450)

};
// Function to draw enemy image from sprite. Also draw health bar
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

    if (this.faceLeft == true) {
        this.ctx.drawImage(this.enemyImage, 0, 196, 114, 98, this.x, this.y, this.width, this.height);
    }
    else {
        this.ctx.drawImage(this.enemyImage, 0, 300, 114, 98, this.x, this.y, this.width, this.height);
    }
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
    if (this.health <= 0) {
        this.dead = true;
    }

}
/**
 * Function to handle Enemy AI.
 * Most important functions is the temprojectile Ai use to calculate if he can hit Player. If not he tries to move.
 * Ai can only travel 100 pixels in moverange. Then he fires toward player. Ai always hit if he does't hit texture.
 * @param player I need to know where player is so i send it to my enemy AI
 */
Enemy.prototype.enemyTurn = function (player) {
    player.fired = false;

    var tempProjectile = new Gun(this);
    var temp = true;
    while (temp) {
        tempProjectile.update();
        if (!Game.checkCollision(tempProjectile, Game.game)) {
            temp = false;
        } else if (Game.checkCollision(tempProjectile, player)) {
            this.target = true;
            temp = false;
        } else {
            for (var i = 0; i < Game.map.length; i++) {
                if (Game.checkCollision(tempProjectile, Game.map[i])) {
                    this.target = false;
                    temp = false;
                    break;
                }
            }
        }
    }
    if (this.target == false) {
        if (player.x < this.x) {
            this.faceLeft = true;
            this.speed = -5;
        }
        else {
            this.faceLeft = false;
        }

        if (this.moveRange >= 0 ) {
            if (this.x > 0 || this.x < Game.game.width){
                this.x += this.speed;
            }
            this.moveRange -= 10;
            for (var i = 0; i < Game.map.length; i++) {
                if (Game.checkCollision(this, Game.map[i])) {
                    this.x -= 10
                    this.speed = -this.speed
                }
            }
        }
    }
    this.enemyAim(player);
    var that = this;
    // Timeout to give impression Ai is thinking.
    setTimeout(function () {
        if (Game.projectile == null && !Game.playerTurn) {
            Game.projectile = new Gun(that);
        }
    }, 2000);
};
// Algoritm so AI know where to aim when he fire projectile.
Enemy.prototype.enemyAim = function (player) {
    this.angle = Math.atan2(this.y - player.y, this.x - player.x);
};


