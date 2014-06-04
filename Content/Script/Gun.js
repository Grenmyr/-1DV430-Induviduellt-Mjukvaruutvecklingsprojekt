"use strict";
/**
 *
 * @param shooter is either player or enemy. Need to set startpoint of shot.
 * @constructor Containts properties for a bullet shot.
 */
var Gun = function (shooter) {
    var canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.x = shooter.x;
    this.y = shooter.y + (shooter.height / 2);
    this.vy = Math.sin(shooter.angle) * 5;
    this.vx = Math.cos(shooter.angle) * 5;
    this.height = 5;
    this.width = 5
}

Gun.prototype.clear = function (shooter) {
    this.ctx.clearRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4)
}
// Change projectiles position each time it is called.
Gun.prototype.update = function () {
    this.x -= this.vx;
    this.y -= this.vy;
}

Gun.prototype.draw = function (shooter) {
    this.clear();
    this.ctx.fillRect(this.x -= this.vx, this.y -= this.vy, this.width, this.height);
}

