"use strict";
/**
 *
 * @param width Canvas width
 * @param height Canvas height
 * @param selectedMap What map user selected from menu
 * @constructor Containts Dom structure to help navigate user between Menu and Game.
 */
var StaticTexture = function (width, height, selectedMap) {
    var that = this;
    this.selectedMap = selectedMap;
    var map = [];
    var mainDiv = document.getElementById("gameDiv");
    var staticCanvas = document.createElement("canvas");
    var ctxTerrain = staticCanvas.getContext("2d");
    staticCanvas.width = width;
    staticCanvas.height = height;
    staticCanvas.setAttribute("id", "staticCanvas");

    mainDiv.appendChild(staticCanvas);

    // Canvas to draw different backgrounds on.
    var backgroundCanvas = document.createElement("canvas");
    var ctxbackground = backgroundCanvas.getContext("2d");
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    backgroundCanvas.setAttribute("id", "backgroundCanvas");
    mainDiv.appendChild(backgroundCanvas);

    // Canvas to display what weapon user are wielding.
    var weapon = document.createElement("canvas");
    var ctxweapon = backgroundCanvas.getContext("2d");
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    backgroundCanvas.setAttribute("id", "weapon");
    mainDiv.appendChild(weapon);

    this.backgroundImage = new Image();
    var weaponImage = new Image();
    var terrain = new Image();
    terrain.src = "Content/Image/rabbit.png";
    terrain.onload = function () {
        for (var i = 0; i < map.length; i++) {
            if (map[i] != null) {
                ctxTerrain.drawImage(terrain, map[i].SpriteposX, map[i].SpritePosy, map[i].xLength, map[i].Yheight, map[i].x, map[i].y, 20, 20);
            }
        }
    }

    this.background = function () {
        this.backgroundImage.src = "Content/Image/background1.png";
        this.backgroundImage.onload = function () {
            ctxbackground.drawImage(that.backgroundImage, 0, 0);
        };
    };
    // Function to handle weapon swapping, swap src on image depening on what weapon user have.
    this.weapon = function (type) {
        ctxweapon.clearRect(0, 0, width, height);
        ctxbackground.drawImage(this.backgroundImage, 0, 0);
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

    // Function to clear terrain with.
    this.clear = function (map) {
        ctxTerrain.clearRect(map.x, map.y, map.width,map.height);
    }
    // Function to handle Game over events, it looks like shit but deadline is soon, its better then the alerts i had earlier.
    this.gameOver = function (winner) {
        ctxTerrain.font = "60px Impact";
        if (winner == true) {
   
            ctxTerrain.fillText("You Lost, Computer WON!", 50, 255);
            ctxTerrain.font = "30px Impact";
            ctxTerrain.fillText("Press Home in top left menu to start a new Game", 50, 300);
        }
        else  {
            ctxTerrain.fillText("YOU WON!! Good work!", 50, 255);
            ctxTerrain.font = "30px Impact";
            ctxTerrain.fillText("Press Home in top left menu to start a new Game", 50, 300);
        }
        ctxTerrain.font = "90px Impact";
    }

    // Function to return my map.
    this.getMap = function () {

        if (this.selectedMap == 1) {
            var map = Map1();
            return map;
        }
        else if (this.selectedMap == 2) {
            var map = Map2();
            return map;
        }

    }

    // Map1 returns array with map1
    function Map1() {
        return map = [

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
            { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 380, width: 20, height: 20 }

        ];
        
    }
    // Map2 returns array with map2
    function Map2() {
        that.backgroundImage.src = "Content/Image/background2.png" ;
        that.backgroundImage.onload = function () {
            ctxbackground.drawImage(that.backgroundImage, 0, 0);
        };
        return map = [
          
        

        // -------
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 0, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 20, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 40, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 60, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 80, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 100, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 120, y: 210, width: 20, height: 20 },

        // long x line
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 140, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 160, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 180, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 200, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 220, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 240, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 260, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 280, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 300, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 320, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 340, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 380, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 400, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 420, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 440, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 460, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 480, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 500, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 520, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 540, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 560, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 580, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 600, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 620, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 640, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 660, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 680, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 700, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 720, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 740, y: 210, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 760, y: 210, width: 20, height: 20 },
        { SpriteposX: 450, SpritePosy: 0, xLength: 50, Yheight: 50, x: 780, y: 210, width: 20, height: 20 },
        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 800, y: 210, width: 20, height: 20 },

        // Long Y line

        { SpriteposX: 400, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 230, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 250, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 270, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 310, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 330, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 350, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 370, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 390, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 410, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 430, width: 20, height: 20 },
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 230, y: 450, width: 20, height: 20 },
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
        { SpriteposX: 350, SpritePosy: 0, xLength: 50, Yheight: 50, x: 360, y: 380, width: 20, height: 20 }
    ];
    }

}
