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
Gun.prototype.checkColl = function (obj1, obj2) {
    if (obj1 == null || obj2 == null) {
        return false;
    }
    return ((obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width) &&
             (obj1.y + obj1.height > obj2.y && obj1.y < obj2.y + obj2.height))
}

Gun.prototype.draw = function (shooter) {
    this.clear();
    this.ctx.fillRect(this.x -= this.vx, this.y -= this.vy, this.width, this.height);
}

