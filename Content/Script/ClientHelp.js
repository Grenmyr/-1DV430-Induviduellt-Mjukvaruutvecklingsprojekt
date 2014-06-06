"use strict";
/**
 *
 * @constructor Handle ugly Html and CSS help for game and menu depending what state it is in.
 */
var ClientHelp = function () {
    var that = this;
     
    // Div for menu
    this.menuContent = document.getElementById("menuContent");
    this.menu = document.getElementById("menu");

  
    // Divs for game view.
    this.mainDiv = document.getElementById("gameDiv");
    this.rulesDiv = document.getElementById("rulesDiv");
    this.ctrlDiv = document.getElementById("controlsDiv");

    // Event listener for home button.
    document.getElementById("homeLink").onclick = function () {
        that.setMenu();
    };
    

    // Event listener for toggling key map on and off.
    var homeCount = 1;
    document.getElementById("controlLink").onclick = function () {
        homeCount += 1;
        if (homeCount % 2 == 1) {
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
    //this.ctrlDiv.style.display = 'block';
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
// Reload game function
ClientHelp.prototype.setMenu = function () {
    location.reload();
}
