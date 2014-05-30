﻿"use strict";
var Grenade = function (player) {
    var that = this;

    var canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d");
    
    this.x = player.x;
    this.y = player.y;
    this.vy = Math.sin(player.angle) * 15;
    this.vx = Math.cos(player.angle) * 15;
    this.height = 10;
    this.width = 10;
    this.grenadeGrav = 0.3;
    this.drawModolus = 0;

    setInterval(function () {
        that.drawModolus += 1
    }, 100);
};

Grenade.prototype.clear = function () {
    this.ctx.clearRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4)
};
Grenade.prototype.checkColl = function (obj1, obj2) {
    if (obj1 == null || obj2 == null) {
        return false;
    }
    return ((obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width) &&
             (obj1.y < obj2.y + obj2.height))
};
Grenade.prototype.draw = function (player) {
    this.clear();
    var that = this;
    if (this.y > 450) {
        this.y = 450 - this.height;
        this.vy = 0;
        this.vx = 0;
        this.grenadeGrav = 0;
        setTimeout(function () {
            that.clear();
            Game.projectile = null;
            Game.playerTurn = !Game.playerTurn;
        }, 1000);


    }
    this.ctx.fillRect(this.x -= this.vx, this.y -= this.vy -= this.grenadeGrav, this.width, this.height);
};


 