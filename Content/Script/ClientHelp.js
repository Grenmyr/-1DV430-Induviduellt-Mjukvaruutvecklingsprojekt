"use strict";
var ClientHelp = function () {
    var that = this;
    

    // Div for menu
    this.menuContent = document.getElementById("menuContent");
    this.menu = document.getElementById("menu");

    // Divs for gameview.
    this.mainDiv = document.getElementById("gameDiv");
    this.rulesDiv = document.getElementById("rulesDiv");
    this.ctrlDiv = document.getElementById("controlsDiv");

    document.getElementById("homeLink").onclick = function () {
        that.setMenu();
    };
    var homeCount = 1;

    document.getElementById("controlLink").onclick = function () {
        console.log(homeCount)
        homeCount += 1;
        if (homeCount % 2 == 0) {
            that.ctrlDiv.style.display = 'none';
        }
        else {
            that.ctrlDiv.style.display = 'block';
        }
    };
}
// function to load adjust to Game CSS/Html structure.
ClientHelp.prototype.setGame = function () {
    
    this.menuContent.style.display = "none";
    this.mainDiv.style.display = 'block';
    this.rulesDiv.style.display = 'block';
    this.ctrlDiv.style.display = 'block';
}
// function to load canvas
ClientHelp.prototype.setCanvas = function () {
    var mainDiv = document.getElementById("gameDiv");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id", "canvas");
    mainDiv.appendChild(canvas);
}
ClientHelp.prototype.setMenu = function () {
    location.reload();
}
