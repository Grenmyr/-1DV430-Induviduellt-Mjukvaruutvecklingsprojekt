"use strict";
var Init = function () {
    //var menu = document.getElementById("menu")
    //document.getElementById("start").onclick = function () {
    //    menu.style.display = "none";
    //};
    var mainDiv = document.getElementById("main");
    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id", "canvas")
    mainDiv.appendChild(canvas);

}
var Game = function () {
    var menu = document.getElementById("menu")
    menu.style.display = "none";

    var game = {
        x: 0,
        y: 0,
        interval: 10,
        width: 800,
        height: 450,
        gunModolus: 0,
        gravity: 10,
        map: [],

    }
    var staticTexture = new StaticTexture(800, 450)
    staticTexture.background();
    staticTexture.terrain();
    staticTexture.weapon(game.gunModolus);

    var enemy = new Enemy(800, 450);
    var player = new Player(800, 450);

    // My aim to player, perhaps integrate with player objekt in sp5?.
    var weapon = {
        firearm: 0,
        angle: 90,
        speed: 0.05,
    }

    // Array to creat new bullets or grenades or whatever is fired.
    //var projectile = null;

    // Loading current map array for collision check.

    game.map = staticTexture.getMap();

    // Two evenlistner to check keypresses and to delete keypress event. and also declare object.
    var keyPressed = {};
    addEventListener("keydown", function (e) {
        keyPressed[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keyPressed[e.keyCode];
    }, false);


    function playerAction() {
        game.gravity = 5;
        Game.checkFall(player, game);
        Game.checkFall(enemy, game);

        if (Game.playerTurn == true && player.fired == false) {
            // CONTROLS FOR MOVEMENT
            //if (38 in keyPressed) { // Player jumping on Up key
            //    if (!player.jumping) {
            //        //player.jumping = true;
            //        //player.y -= 80;

            //        var tempX = player.x
            //        var tempY = player.y -= 50;
            //        if (checkCol(tempX, tempY)) {
            //            player.jumping = true;
            //            player.y = tempY;

            //        }
            //    }
            //}
            if (37 in keyPressed) { // Player holding left key.
                //var tempX = player.x - player.speed;
                //var tempY = player.y;
                //if (checkCol(tempX, tempY)) {
                //    player.x -= player.speed;
                //    player.faceRight = false;
                //}
                //var oldX = player.x;
                //player.x -= player.speed;
                //for (var i = 0; i < game.map.length; i++) {
                //    if (Game.checkCollision(player, game.map[i])) {
                //        console.log(true)
                //        player.x = oldX;
                //        player.faceRight = false;
                //    }
                //    else {
                //        console.log(false);
                //    }

                //}
                player.x -= player.speed;
                for (var i = 0; i < game.map.length; i++) {

                    if (Game.checkCollision(player, game.map[i])) {
                        player.x += player.speed
                        console.log("tjohej")
                        player.faceRight = true;
                        break;
                    }

                }

            }
            if (39 in keyPressed) { // Player holding right key.
                //var tempX = player.x + player.speed;
                //var tempY = player.y;
                //if (checkCol(tempX, tempY)) {
                //    player.x += player.speed;
                //    player.faceRight = true;
                //}
                

              
                player.x += player.speed;
                for (var i = 0; i < game.map.length; i++) {
                    
                    if (Game.checkCollision(player, game.map[i])) {
                        player.x -= player.speed
                        console.log("tjohej")
                        player.faceRight = true;
                        break;
                    }
                
                } 
            }

            // CONTROLS FOR AIM 
            if (87 in keyPressed) { // Player aiming up on W key.
                //weapon.angle += weapon.speed;
                player.angle += player.aimSpeed;
            }
            if (83 in keyPressed) { // Player aiming down on S key.
                //weapon.angle -= weapon.speed;
                player.angle -= player.aimSpeed;
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


            }
        }
        // Function to check if object collide with any of my texture sprites.
        //function checkCol(tempX, tempY) {
        //    for (var i = 0; i < game.map.length; i++) {
        //        if ((tempX < game.map[i].x + game.map[i].width && tempX +player.width > game.map[i].x - game.map[i].width) && (tempY < game.map[i].y + game.map[i].height && tempY > game.map[i].y - game.map[i].height)) {
        //            player.move = false;
        //        }
        //    }
        //    console.log(player.y + player.height)
        //    console.log(game.map[0].y)
        //    console.log(player.x + player.width)
        //    console.log(game.map[0].x)
        //    return player.move;
        //}


        gameGravity(player);
        gameGravity(enemy);

        function gameGravity(obj) {
            obj.y += game.gravity;
            if (obj.y >= game.height - obj.height) {
                obj.y = game.height - obj.height;
                obj.jumping = false;
            }
            if (obj.x >= game.width - obj.width) {
                obj.x = game.width - obj.width;
            }
            else if (obj.x <= 0) {
                obj.x = 0;
            }
            obj.move = true;
        }

        //// Checking borders of game and keep within.
        //player.y += game.gravity;
        ////enemy.y += game.gravity;
        //if (player.y >= game.height - player.height) {
        //    player.y = game.height - player.width;
        //    player.jumping = false;
        //}
        //if (player.x >= game.width - player.width) {
        //    player.x = game.width - player.width;
        //}
        //else if (player.x <= 0) {
        //    player.x = 0;
        //}
        //player.move = true;

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
                alert();
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
       
        //if (Game.projectile != null) {
            if (Game.playerTurn == true && Game.projectile != null) {
                console.log("playerturn == true")
                if (Game.checkCollision(Game.projectile, enemy)) {
                    console.log("Hit enemy")
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
                    console.log("Hit player")
                    player.health -= 1;
                    Game.projectile.clear();
                    Game.projectile = null;
                    Game.playerTurn = true;
                    //console.log(Game.playerTurn);
                }
            }



       
            if (Game.projectile != null && !Game.checkCollision(Game.projectile, game) && player.firearm == 0) {
                console.log("utanfor banan")
                //Game.projectile.clear();
                Game.projectile = null;
                Game.playerTurn = !Game.playerTurn;
                console.log(Game.playerTurn);

            }
            if (Game.projectile != null && !Game.checkCollNoTop(Game.projectile, game) && player.firearm == 1) {
                console.log("notop")
              
                Game.projectile.y = 400;
                console.log(Game.projectile.y)
                Game.projectile.vy = 0;
                Game.projectile.vx = 0;
                var granade = Game.projectile;
                setTimeout(function () {
                    granade.clear();
                }, 1000);
                //Game.projectile.clear();
                Game.projectile = null;
                Game.playerTurn = !Game.playerTurn;
                console.log(Game.playerTurn);
            }
         

            for (var i = 0; i < game.map.length; i++) {
                if (Game.checkCollision(Game.projectile, game.map[i])) {
                    console.log("hit texture")
                    Game.projectile.clear();
                    Game.projectile = null;
                    Game.playerTurn = !Game.playerTurn;
                    console.log(Game.playerTurn);
                }
            }
        //}
            player.draw()
            enemy.draw();
        window.requestAnimationFrame(draw);
        //}, game.interval);
    }
    draw();
}
Game.checkFall = function (obj, game) {
    var map = game.map;
    // Forloop checking if player is falling on texture, then gravity is set to 0.
    for (var i = 0; i < map.length; i++) {
        if ((obj.x < map[i].x + map[i].width && obj.x > map[i].x - map[i].width) &&
            (obj.y + obj.gravity >= map[i].y - map[i].height && obj.y + obj.gravity <= map[i].y + map[i].height)) {
            obj.y = map[i].y - map[i].height;
            obj.jumping = false;
        }
    }
}
Game.projectile = null;
Game.playerTurn = true;


Game.checkCollision = function (obj1, obj2) {
    if (obj1 == null || obj2 == null) {
        return false;
    }
    return ((obj1.x - obj1.width < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x) &&
             (obj1.y - obj1.height < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y))
}
Game.checkCollNoTop = function (obj1, obj2) {
    if (obj1 == null || obj2 == null) {
        return false;
    }
    return ((obj1.x - obj1.width < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x) &&
             (obj1.y - obj1.height < obj2.y + obj2.height))
}
Game.enemyTurn = function (enemy, player) {
    player.fired = false;
    Game.enemyAim(enemy, player);
    setTimeout(function () {
        if (Game.projectile == null && !Game.playerTurn) {
            Game.projectile = new Gun(enemy);
        }
    }, 3000);
}
Game.enemyAim = function (enemy, player) {

    enemy.angle = Math.atan2(enemy.y - player.y, enemy.x - player.x);

}

window.onload = function () {
    Init();
    Game();
};