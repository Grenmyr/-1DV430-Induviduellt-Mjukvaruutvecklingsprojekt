"use strict";
var StaticTexture = function (width, height) {
    var mainDiv = document.getElementById("gameDiv");
    var staticCanvas = document.createElement("canvas");
    var ctxTerrain = staticCanvas.getContext("2d");
    staticCanvas.width = width;
    staticCanvas.height = height;
    staticCanvas.setAttribute("id", "staticCanvas");

    mainDiv.appendChild(staticCanvas);

    var backgroundCanvas = document.createElement("canvas");
    var ctxbackground = backgroundCanvas.getContext("2d");
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    backgroundCanvas.setAttribute("id", "backgroundCanvas");
    mainDiv.appendChild(backgroundCanvas);

    var weapon = document.createElement("canvas");
    var ctxweapon = backgroundCanvas.getContext("2d");
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    backgroundCanvas.setAttribute("id", "weapon");
    mainDiv.appendChild(weapon);

    var backgroundImage = new Image();
    var weaponImage = new Image();
    var terrain = new Image();

    this.background = function () {
        backgroundImage.src = "Content/Image/background1.png";
        backgroundImage.onload = function () {
            ctxbackground.drawImage(backgroundImage, 0, 0);
        };
    };

    this.weapon = function (type) {
        ctxweapon.clearRect(0, 0, width, height);
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
    };
    this.terrain = function () {
        terrain.src = "Content/Image/rabbit.png";
        ctxTerrain.clearRect(0, 0, width, height);
        terrain.onload = function () {
            for (var i = 0; i < map.length; i++) {
                if (map[i] != null) {
                    ctxTerrain.drawImage(terrain, map[i].SpriteposX, map[i].SpritePosy, map[i].xLength, map[i].Yheight, map[i].x, map[i].y, 20, 20);
                }
            }
        }
    }
    // Function to return my map.
    this.getMap = function () {
        return map;
    }

    // Map, atm it is only 1 map, if more made, break out into another class.
    var map = [

        // W
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 40, y: 40, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 50, y: 60, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 60, y: 80, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 70, y: 100, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 80, y: 120, width: 20, height: 20 },

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 90, y: 140, width: 20, height: 20 },


        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 100, y: 120, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 110, y: 100, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 120, y: 80, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 130, y: 60, width: 20, height: 20 },

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 140, y: 40, width: 20, height: 20 },

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 150, y: 60, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 160, y: 80, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 170, y: 100, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 180, y: 120, width: 20, height: 20 },

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 190, y: 140, width: 20, height: 20 },


        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 200, y: 120, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 210, y: 100, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 220, y: 80, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 60, width: 20, height: 20 },

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 240, y: 40, width: 20, height: 20 },

        // P
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 40, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 60, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 80, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 100, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 120, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 140, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 160, width: 20, height: 20 },

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 40, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 380, y: 50, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 390, y: 70, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 380, y: 90, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 110, width: 20, height: 20 },

        // 1
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 500, y: 40, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 40, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 60, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 80, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 100, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 120, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 140, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 160, width: 20, height: 20 },

        // 3
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 580, y: 40, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 50, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 610, y: 70, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 90, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 580, y: 100, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 110, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 610, y: 130, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 150, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 580, y: 160, width: 20, height: 20 },

        // -------
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 0, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 20, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 40, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 60, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 80, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 80, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 100, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 120, y: 210, width: 20, height: 20 },


        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 170, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 190, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 210, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 230, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 250, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 250, y: 270, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 270, y: 270, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 270, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 250, y: 290, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 270, y: 290, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 290, y: 290, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 310, y: 290, width: 20, height: 20 },

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 500, y: 350, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 350, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 540, y: 350, width: 20, height: 20 },

        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 400, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 620, y: 400, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 640, y: 400, width: 20, height: 20 },

        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 180, y: 400, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 200, y: 400, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 220, y: 400, width: 20, height: 20 },

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 120, y: 350, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 140, y: 350, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 160, y: 350, width: 20, height: 20 },

        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 70, y: 300, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 90, y: 300, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 110, y: 300, width: 20, height: 20 },

        // cross

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 660, y: 260, width: 20, height: 20 },

        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 650, y: 280, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 630, y: 280, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 670, y: 280, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 690, y: 280, width: 20, height: 20 },

        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 660, y: 300, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 660, y: 320, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 660, y: 340, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 660, y: 360, width: 20, height: 20 },

        // Dots

        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 580, y: 280, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 20, y: 420, width: 20, height: 20 },
//
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 100, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 100, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 120, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 140, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 160, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 180, y: 200, width: 20, height: 20 },
//
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: , y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 100, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 120, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 140, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 160, y: 200, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 180, y: 200, width: 20, height: 20 },
//
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 100, y: 220, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 100, y: 240, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 120, y: 260, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 140, y: 280, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 160, y: 350, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 180, y: 370, width: 20, height: 20 },
//
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 300, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 320, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 340, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 350, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 390, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 410, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 430, width: 20, height: 20 },
//
//
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 650, y: 400, width: 20, height: 20 },
//
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 320, y: 400, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 400, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 550, y: 400, width: 20, height: 20 },
//
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 330, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 350, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 370, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 390, width: 20, height: 20 },
//        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 430, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 380, width: 20, height: 20 }

    ];



}
