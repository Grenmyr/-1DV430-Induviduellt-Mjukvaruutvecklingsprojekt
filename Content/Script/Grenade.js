"use strict";
var Grenade = function (player) {
    var that = this;

    var mainDiv = document.getElementById("main");
    var canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d");
   
    this.x = player.x;
    this.y = player.y;
    this.vy = Math.sin(player.angle) * 20;
    this.vx = Math.cos(player.angle) * 20;
    this.height = 10;
    this.width = 10;
    this.grenadeGrav = 0.3;

    setTimeout(function () {
        that.clear();
        that.x = -9999;
    }, 3000);

}

Grenade.prototype.clear = function (player) {
    this.ctx.clearRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4)
}

Grenade.prototype.draw = function (player) {
    this.clear();
    if (this.y > 450 ) { this.y = 450-this.height, this.vy = 0, this.vx = 0,this.grenadeGrav = 0 }
    this.ctx.fillRect(this.x -= this.vx, this.y -= this.vy -= this.grenadeGrav, this.width, this.height);
}

