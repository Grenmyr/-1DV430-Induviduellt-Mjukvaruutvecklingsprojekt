"use strict";
var StaticTexture = function (width, height) {
    var mainDiv = document.getElementById("main");
    var staticCanvas = document.createElement("canvas")
    var ctxTerrain = staticCanvas.getContext("2d");
    staticCanvas.width = width;
    staticCanvas.height = height;
    staticCanvas.setAttribute("id", "staticCanvas")

    mainDiv.appendChild(staticCanvas);

    var backgroundCanvas = document.createElement("canvas")
    var ctxbackground = backgroundCanvas.getContext("2d");
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    backgroundCanvas.setAttribute("id", "backgroundCanvas")
    mainDiv.appendChild(backgroundCanvas);

    var weapon = document.createElement("canvas")
    var ctxweapon = backgroundCanvas.getContext("2d");
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    backgroundCanvas.setAttribute("id", "weapon")
    mainDiv.appendChild(weapon);

    var backgroundImage = new Image();
    var weaponImage = new Image();
    var terrain = new Image();

    this.background = function () {
        backgroundImage.src = "Content/Image/background.png";
        backgroundImage.onload = function () {
            ctxbackground.drawImage(backgroundImage, 0, 0);
        };
    }

    this.weapon = function (type) {
        ctxweapon.clearRect(0, 0, width, height)
        ctxbackground.drawImage(backgroundImage, 0, 0);
        if (type == 0) {
            weaponImage.src = "Content/Image/gun.png";
        }
        if (type == 1) {
            weaponImage.src = "Content/Image/grenade.png";
        }
        weaponImage.onload = function () {
            ctxweapon.drawImage(weaponImage, 700, 0, 80, 80);
        };
    }
    this.terrain = function () {
        terrain.src = "Content/Image/spriteMap.png";
        terrain.onload = function () {
            for (var i = 0; i < map.length; i++) {
                ctxTerrain.drawImage(terrain, map[i].SpriteposX, map[i].SpritePosy, map[i].xLength, map[i].Yheight, map[i].xPos, map[i].Ypos, 20, 20);
            }
        }
    }
    // Function to return my map.
    this.getMap = function () {
        return map;
    }

    // Testmap
    var map = [
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 300, Ypos: 430, width: 20, height: 20 },
        { SpriteposX: 0, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 400, width: 20, height: 20 },
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 360, width: 20, height: 20 },
        { SpriteposX: 58, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 320, Ypos: 400, width: 20, height: 20 },
        { SpriteposX: 0, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 340, Ypos: 400, width: 20, height: 20 },
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 380, Ypos: 400, width: 20, height: 20 },
        { SpriteposX: 58, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 380, width: 20, height: 20 }
    ];



}
