"use strict";
var Gun = function (shooter) {

    var mainDiv = document.getElementById("main");
    var canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d");
    
    this.x = shooter.x;
    this.y = shooter.y;
    this.vy = Math.sin(shooter.angle) * 5;
    this.vx = Math.cos(shooter.angle) * 5;
    this.height = 5
    this.width = 5
}

Gun.prototype.clear = function (shooter) {
    this.ctx.clearRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4)
}

Gun.prototype.draw = function (shooter) {
    this.clear();
    this.ctx.fillRect(this.x -= this.vx, this.y -= this.vy, this.width, this.height);
}

