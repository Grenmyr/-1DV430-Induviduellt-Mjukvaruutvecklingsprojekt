"use strict";
// Constructor to handle sounds in my Game. 
var Sound = function (game) {
    var soundCount = 0;
    var game = game;


    this.fuck = new Audio("Content/sound/fuck.wav");
    this.jump = new Audio("Content/sound/jump.wav");
    this.sucker = new Audio("Content/sound/sucker.wav");

    // Eventlistener to check if user want sound on or off.
    document.getElementById("soundLink").onclick = function () {
        console.log("dsadsa")
        soundCount += 1;
        if (soundCount % 2 == 0) {
            game.sound = true;
        }
        else {
            game.sound = false;
        }
    };
}
// Play this if target is hit.
Sound.prototype.play = function () {
    this.fuck.play();
    this.fuck.currentTime = 0.05;
}
// Play this if user jump.
Sound.prototype.jumped = function () {
    this.jump.play();
    this.jump.currentTime = 0.05;
}
// Play this if target is missed.
Sound.prototype.miss = function () {
    this.sucker.play();
    this.sucker.currentTime = 0.05;
}
