"use strict";
var Init = function () {
    var game = {
        interval: 10,
        //fps: 60,
        width: 800,
        height: 450,
        gunModolus: 0,
        gravity: 10,
    }
    var staticTextureConstructor = StaticTexture;
    StaticTexture = new staticTextureConstructor(800, 450)
    StaticTexture.background();
    StaticTexture.terrain();
    StaticTexture.weapon(game.gunModolus);

    var textureConstructor = Texture;
    Texture = new textureConstructor(800, 450, StaticTexture);


    // My player object.
    var player = {
        speed: 5, // Variable to set speed.
        jumping: false,
        x: 0,
        y: 0,
        sizey: 20,
        sizex: 20,
        gravity: 10,
        faceRight: true,
        move: true,
    }

    // My aim to player, perhaps integrate with player objekt in sp5?.
    var weapon = {
        gun: 0,
        angle: 90,
        speed: 0.05,
    }

    // Array to creat new bullets or grenades or whatever is fired.
    var bullets = [];

    // Loading current map array for collision check.
    var map = []
    map = StaticTexture.getMap();

    // Two evenlistner to check keypresses and to delete keypress event. and also declare object.
    var keyPressed = {};
    addEventListener("keydown", function (e) {
        keyPressed[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keyPressed[e.keyCode];
    }, false);


    function playerAction() {
        game.gravity = 10;
        //if (Texture.checkCol(player.x, player.y)) {
        //    console.log("true;")
        //}
        // Forloop checking if player is falling on texture, then gravity is set to 0.
        for (var i = 0; i < map.length; i++) {

            if ((player.x < map[i].xPos + map[i].width && player.x > map[i].xPos - map[i].width) &&
                (player.y + player.gravity >= map[i].Ypos - map[i].height && player.y + player.gravity <= map[i].Ypos + map[i].height)) {
                game.gravity = 0;
                player.y = map[i].Ypos - map[i].height;
                player.jumping = false;
            }
        }

        // CONTROLS FOR MOVEMENT
        if (38 in keyPressed) { // Player jumping on Up key
            if (!player.jumping) {
                player.jumping = true;
                player.y += -150;
            }
        }
        if (37 in keyPressed) { // Player holding left key.
            var tempX = player.x - player.speed;
            var tempY = player.y;
            if (checkCol(tempX, tempY)) {
                player.x -= player.speed;
                player.faceRight = false;
            }

        }
        if (39 in keyPressed) { // Player holding right key.
            var tempX = player.x + player.speed;
            var tempY = player.y;
            if (checkCol(tempX, tempY)) {
                player.x += player.speed;
                player.faceRight = true;
            }
        }

        // CONTROLS FOR AIM 
        if (87 in keyPressed) { // Player aiming up on W key.
                weapon.angle += weapon.speed;
        }
        if (83 in keyPressed) { // Player aiming down on S key.
                weapon.angle -= weapon.speed;
        }

        // CONTROLS FOR SWAP WEAPON AND FIRE
        if (17 in keyPressed) { // player swapping weapons on ctrl
            delete keyPressed[17];
            game.gunModolus += 1;
            if (game.gunModolus % 2 == 1) {
                weapon.gun = 1;
                StaticTexture.weapon(weapon.gun)
            }
            else {
                weapon.gun = 0;
                StaticTexture.weapon(weapon.gun)
            }
        }

        if (32 in keyPressed) { // Player firing with space key.
            delete keyPressed[32];
            if (Object.keys(bullets).length > 0) {
                return
            }
            bullets.push({
                x: player.x + player.sizex / 2,
                y: player.y + player.sizey / 2,
                vy: Math.sin(weapon.angle) * 25,
                vx: Math.cos(weapon.angle) * 25,
                grenadeGrav: 0.5
            });
        }

        // Function to check if object collide with any of my texture sprites.
        function checkCol(tempX, tempY) {
            for (var i = 0; i < map.length; i++) {
                if ((tempX < map[i].xPos + map[i].width && tempX > map[i].xPos - map[i].width) && (tempY < map[i].Ypos + map[i].height && tempY > map[i].Ypos - map[i].height)) {
                    player.move = false;
                }
            }
            return player.move;
        }

        // Checking borders of game and keep within.
        player.y += game.gravity;
        if (player.y >= game.height - player.sizey) {
            player.y = game.height - player.sizey;
            player.jumping = false;
        }
        if (player.x >= game.width - player.sizex) {
            player.x = game.width - player.sizex;
        }
        else if (player.x <= 0) {
            player.x = 0;
        }
        player.move = true;
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
        setTimeout(function () {
            playerAction();
            window.requestAnimationFrame(draw);
            Texture.Player(player.x, player.y);
            Texture.aim(player.x, player.y, weapon.angle);
            Texture.Enemy();

            if (Object.keys(bullets).length > 0) {
                game.firing = Texture.bullet(bullets, weapon.gun);
            }
        }, game.interval);
    }
    draw();
}
window.onload = function () {

    Init();

};