"use strict";
var Init = function () {
    var clientHelp = new ClientHelp();

    var menu = document.getElementById("menu");
    var selectedMap = document.getElementById('map');
    var amountUnits = document.getElementById('units');
    var difficult = document.getElementById('difficult');

    document.getElementById("start").onclick = function () {
        selectedMap = selectedMap.options[selectedMap.selectedIndex].value;
        amountUnits = amountUnits.options[amountUnits.selectedIndex].value;
        difficult = difficult.options[difficult.selectedIndex].value;
        menu.style.display = "none";
        Game(selectedMap, amountUnits, difficult, clientHelp);
    };
    clientHelp.setCanvas();
};
/**
 *
 * @param selectedMap A number, of what selected value from Map in menu.
 * @param units A number, of what selected value from units in menu.
 * @param difficult  A number, of what selected value from difficulty in menu.
 * @param clientHelp object, referense to be used in Game.
 * @constructor Game function, it handle all keypress event, Its the core and all other JS files are initialized from it.
 * It also contains my draw function that render games update on canvas.
 */
var Game = function (selectedMap, units, difficult, clientHelp) {

    clientHelp.setGame();


    var game = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
        gunModolus: 0,
        difficult: 1,
        sound : true

    };

    /**
     *
     * @type {StaticTexture}  Initialize StaticTexture,js to load canvas settings and What Gun that is selected.
     * Also used as reference to load what map that was selected in menu.
     */
    var staticTexture = new StaticTexture(canvas.width, canvas.height, selectedMap);
    staticTexture.background();
    staticTexture.weapon(game.gunModolus);
    Game.map = staticTexture.getMap();
    Game.sound = new Sound(game);
    Game.game = game;
    // Initializing player and Enemy, later this is done will be done for loading mutiple units.
    var enemy = new Enemy(canvas.width, canvas.height);
    var player = new Player(canvas.width, canvas.height);


    // difficult 2 = hard.
    if (difficult == 2) {
        player.health = 2;
    }

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
                delete keyPressed[38];
                if (!player.jumping) {
                    if (game.sound == true) {
                        Game.sound.jumped()
                    }
                    player.jumping = true;
                    player.vy = +40;
                }
            }
            if (37 in keyPressed) { // Player holding left key.
                player.x -= player.speed;
                if (player.faceLeft == false) {
                    player.angle = -player.angle + Math.PI;
                    player.angle %= Math.PI
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
    /**
     * Draw function It update my game canvas with content happening in game. It contains alot if statements to handle
     * If projectile if fired and if it is Ai (Enemy) or players turn.
     */
    function draw() {

        // Cases to handle Game over.
        if (player.dead) {
            Game.over = true;
            staticTexture.gameOver(player.dead);
        }
        else if (enemy.dead) {
            Game.over = true;
            staticTexture.gameOver(player.dead);
        }
        
        // check for player commands
        playerAction();

        // Multiple IF to check if it is players turn or Enemy, also if Projectile exist or not.
        if (Game.projectile != null) {
            Game.projectile.draw();
        }
        if (Game.playerTurn == true && Game.projectile != null) {
            if (Game.checkCollision(Game.projectile, enemy)) {
                Game.hit(enemy)
                Game.playerTurn = false;
            }
        }
        if (Game.playerTurn == false) {
            enemy.enemyTurn(player);
            if (Game.checkCollision(Game.projectile, player)) {
                Game.hit(player)
                Game.playerTurn = true;
            }
        }
        if (Game.projectile != null && !Game.checkCollision(Game.projectile, game) && player.firearm == 0) {
            Game.miss();
        }
        for (var i = 0; i < Game.map.length; i++) {
            if (Game.checkCollision(Game.projectile, Game.map[i])) {
                Game.projectile.clear();
               
                staticTexture.clear(Game.map[i])
                Game.map[i] = null;
                Game.miss();

            }
        }
        player.draw();
        enemy.draw();
        // If game over, stop callback.
        if (Game.over == false) {
            window.requestAnimationFrame(draw);
        }
    }
        draw();
};
// Global variables
Game.projectile = null;
Game.playerTurn = true;
Game.over = false;

// If target hit.
Game.hit = function (target) {
    if (Game.game.sound == true) {
        Game.sound.play();
    }
    target.health -= 1;
    Game.projectile.clear();
    Game.projectile = null;
}
// If target miss
Game.miss = function () {
    if (Game.game.sound == true) {
        Game.sound.miss();
    }
    Game.projectile = null;
    Game.playerTurn = !Game.playerTurn;
}

// Global function, handling all collisions in game, except 1 for grenade that i want dirrefent algoritm.
Game.checkCollision = function (obj1, obj2) {
    if (obj1 == null || obj2 == null) {
        return false;
    }
    return ((obj1.x + obj1.width > obj2.x && obj1.x < obj2.x + obj2.width) &&
             (obj1.y + obj1.height > obj2.y && obj1.y < obj2.y + obj2.height))
};

window.onload = function () {
    Init();
};