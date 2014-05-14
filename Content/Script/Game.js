﻿"use strict";
var Init = function () {
    var menu = document.getElementById("menu")
    document.getElementById("start").onclick = function () {
        selectMap = selectMap.options[selectMap.selectedIndex].value;
        amountUnits = amountUnits.options[amountUnits.selectedIndex].value;
        menu.style.display = "none";
        Game(selectMap, amountUnits);
    };
    var selectMap = document.getElementById('map');
    var amountUnits = document.getElementById('units');

    var mainDiv = document.getElementById("main");
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id", "canvas");
    mainDiv.appendChild(canvas);

    var selectedText = selectMap.options[selectMap.selectedIndex].text;
};
var Game = function (Map,units) {
    var menu = document.getElementById("menu2");
    menu.style.display = "none";
    console.log(Map);
    console.log(units);
    var game = {
        x: 0,
        y: 0,
        interval: 10,
        width: canvas.width,
        height: canvas.height,
        gunModolus: 0,
        difficult: 0
        //map: []

    };
    //    Initialize StaticTexture,js to load lvl configuration and weapon settings.
    var staticTexture = new StaticTexture(canvas.width, canvas.height);
    staticTexture.background();
    staticTexture.terrain();
    staticTexture.weapon(game.gunModolus);
    Game.map = staticTexture.getMap();
    Game.game = game;

    // Initializing player and Enemy, later this is done repeadedly for loading serveral units.
    var enemy = new Enemy(canvas.width, canvas.height);
    var player = new Player(canvas.width, canvas.height);



    // Two eventlistner to check keypresses and to delete keypress event. and also declare object.
    var keyPressed = {};
    addEventListener("keydown", function (e) {
        keyPressed[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keyPressed[e.keyCode];
    }, false);

    // Function to handle all keypress events.
    function playerAction() {
        player.move = false;
        if (Game.playerTurn == true && player.fired == false) {
            // CONTROLS FOR MOVEMENT
            if (38 in keyPressed) { // Player jumping on Up key
                if (!player.jumping) {
                    player.jumping = true;
                    player.vy = +60;
                }
            }
            if (37 in keyPressed) { // Player holding left key.
                player.x -= player.speed;
                if (player.faceLeft == false) {
                    player.angle = -player.angle + Math.PI;
                    player.angle %= Math.PI
                    console.log(player.angle);
                }
                player.faceLeft = true;
                player.move = true;
                for (var i = 0; i < Game.map.length; i++) {
                    if (Game.checkCollision(player, Game.map[i])) {
                        player.x += player.speed;
                        break;
                    }
                }
                if (player.x <= 0) {
                    player.x = 0;
                }
            }
            if (39 in keyPressed) { // Player holding right key.
                player.x += player.speed;
                if (player.faceLeft == true) {
                    player.angle %= Math.PI
                    player.angle = -player.angle - Math.PI;
                }
                player.faceLeft = false;
                player.move = true;
                for (var i = 0; i < Game.map.length; i++) {

                    if (Game.checkCollision(player, Game.map[i])) {
                        player.x -= player.speed;
                        break;
                    }
                }
                if (player.x + player.width >= game.width) {
                    player.x = game.width - player.width;
                }

            }
            // CONTROLS FOR AIM 
            if (87 in keyPressed) { // Player aiming up on W key.
                if (player.faceLeft == true) {
                    player.angle += player.aimSpeed;
                    if (player.angle > Math.PI / 2) {
                        player.angle = Math.PI / 2;
                    }
                }
                else {
                    player.angle -= player.aimSpeed;
                    if (player.angle < -Math.PI * 1.5) {
                        player.angle = -Math.PI * 1.5;
                    }
                }

            }
            if (83 in keyPressed) { // Player aiming down on S key.
                if (player.faceLeft == true) {
                    player.angle -= player.aimSpeed;
                    if (player.angle < -Math.PI / 2) {
                        player.angle = -Math.PI / 2;
                    }
                }
                else {
                    console.log(player.angle);
                    player.angle += player.aimSpeed;
                    if (player.angle > -Math.PI / 2) {
                        player.angle = -Math.PI / 2;
                    }
                }
            }

            // CONTROLS FOR SWAP WEAPON AND FIRE
            if (17 in keyPressed) { // player swapping weapons on ctrl
                delete keyPressed[17];
                game.gunModolus += 1;
                if (game.gunModolus % 2 == 1) {
                    player.firearm = 1;
                    staticTexture.weapon(player.firearm)
                }
                else {
                    player.firearm = 0;
                    staticTexture.weapon(player.firearm)
                }
            }

            if (32 in keyPressed) { // Player firing with space key.
                delete keyPressed[32];
                if (Game.projectile != null) {
                    Game.projectile.clear();
                }
                if (player.firearm == 0) {
                    Game.projectile = new Gun(player);
                }
                else {
                    Game.projectile = new Grenade(player);
                }
                player.fired = true;
                enemy.moveRange = Math.floor((Math.random() * 200) + 100);
                enemy.speed = 5;
                enemy.target = false;
            }
        }
    }

    // requestAnimationFrame polyfill by Erik Möller
    // fixes from Paul Irish and Tino Zijdel
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                       || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());

    function draw() {
        //setTimeout(function () {
        playerAction();
        if (Game.projectile != null) {
            Game.projectile.draw();
        }
        if (Game.playerTurn == true && Game.projectile != null) {
            console.log("playerturn == true");
            if (Game.checkCollision(Game.projectile, enemy)) {
                console.log("Hit enemy");
                enemy.health -= 1;
                Game.projectile.clear();
                Game.projectile = null;
                Game.playerTurn = false;
            }
        }
        if (Game.playerTurn == false) {
            console.log("playerturn == false");
            Game.enemyTurn(enemy, player);
            if (Game.checkCollision(Game.projectile, player)) {
                console.log("Hit player");
                player.health -= 1;
                Game.projectile.clear();
                Game.projectile = null;
                Game.playerTurn = true;
            }
        }
        if (Game.projectile != null && !Game.checkCollision(Game.projectile, game) && player.firearm == 0) {
            console.log("utanfor banan");
            Game.projectile = null;
            Game.playerTurn = !Game.playerTurn;
        }
        for (var i = 0; i < Game.map.length; i++) {
            if (Game.checkCollision(Game.projectile, Game.map[i])) {
                console.log("Träffade textur");
                Game.projectile.clear();
                Game.projectile = null;
                Game.playerTurn = !Game.playerTurn;
                console.log(Game.playerTurn);
            }
        }
        player.draw();


        enemy.draw();
        window.requestAnimationFrame(draw);
        //}, game.interval);
    }
    draw();
};
//Game.checkFall = function (obj, game) {
//    var map = Game.map;
//    // Forloop checking if player is falling on texture, then gravity is set to 0.
//    for (var i = 0; i < map.length; i++) {
//        if ((obj.x < map[i].x + map[i].width && obj.x > map[i].x - map[i].width) &&
//            (obj.y + obj.gravity >= map[i].y - map[i].height && obj.y + obj.gravity <= map[i].y + map[i].height)) {
//            obj.y = map[i].y - map[i].height;
//            obj.jumping = false;
//        }
//    }
//};
Game.projectile = null;
Game.playerTurn = true;

// Checkcollision function, handling all collisions in game, except 1 for grenade that i want dirrefent formula.
Game.checkCollision = function (obj1, obj2) {
    if (obj1 == null || obj2 == null) {
        return false;
    }
    return ((obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width) &&
             (obj1.y + obj1.height > obj2.y && obj1.y < obj2.y + obj2.height))
};


// Functions handling enemy Turn and Aim.
Game.enemyTurn = function (enemy, player) {
    player.fired = false;

    var tempProjectile = new Gun(enemy);
    var temp = true;
    while (temp) {
        tempProjectile.update();
        if (!Game.checkCollision(tempProjectile, Game.game)) {
            temp = false;
        } else if (Game.checkCollision(tempProjectile, player)) {
            console.log("dsadsa")
            enemy.target = true;
            temp = false;
        } else {
            for (var i = 0; i < Game.map.length; i++) {
                if (Game.checkCollision(tempProjectile, Game.map[i])) {
                    console.log("Träffade textur");
                    enemy.target = false;
                    temp = false;
                    break;
                }
            }
        }
    }
    console.log(enemy.target);
    if (enemy.target == false) {
        if (player.x < enemy.x) {
            enemy.faceLeft = true;
            enemy.speed = -5;
        }
        else {
            enemy.faceLeft = false;
        }

        if (enemy.moveRange >= 0) {
            enemy.x += enemy.speed;
            enemy.moveRange -= 10;
            for (var i = 0; i < Game.map.length; i++) {
                if (Game.checkCollision(enemy, Game.map[i])) {
                    enemy.x -= 10
                    enemy.speed = -enemy.speed
                }
            }
        }
    }
    Game.enemyAim(enemy, player);
    setTimeout(function () {
        if (Game.projectile == null && !Game.playerTurn) {
            Game.projectile = new Gun(enemy);
        }
    }, 1000);
};
Game.enemyAim = function (enemy, player) {
    enemy.angle = Math.atan2(enemy.y - player.y, enemy.x - player.x);
};

window.onload = function () {
    Init();
    //Game();
};