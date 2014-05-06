"use strict";
var Gun = function (player) {
    var mainDiv = document.getElementById("main");
    var canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d");

    this.x = player.x;
    this.y = player.y;
    this.vy = Math.sin(player.angle) * 20;
    this.vx = Math.cos(player.angle) * 20;
    this.height = 5
    this.width = 5
}

Gun.prototype.clear = function (player) {
    this.ctx.clearRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4)
}

Gun.prototype.draw = function (player) {
    this.clear();
    this.ctx.fillRect(this.x -= this.vx, this.y -= this.vy, this.width, this.height);
}

