var Init = function () {
    // Static texture and classes being initialised first.
    var width = 800;
    var height = 450;
    var textureConstructor = Texture;
    Texture = new textureConstructor(800, 450);

    var staticTextureConstructor = StaticTexture;
    StaticTexture = new staticTextureConstructor(800, 450)

    // Testmap, will be refactored to another class later..
    var map = [
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 300, Ypos: 430, width: 20, height: 20 },
        { SpriteposX: 0, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 400, width: 20, height: 20 },
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 360, width: 20, height: 20 },
        { SpriteposX: 58, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 320, Ypos: 400, width: 20, height: 20 },
        { SpriteposX: 0, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 340, Ypos: 400, width: 20, height: 20 },
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 380, Ypos: 400, width: 20, height: 20 },
        { SpriteposX: 58, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 380, width: 20, height: 20 }
    ];

    var backgroundTexture = StaticTexture.background();
    var terrain = StaticTexture.terrain(map);


    // My player object.
    var player = {
        speed: 30, // Variable to set speed.
        jumping: false, 
        x: 0,
        y: 0,
        sizey: 20,
        sizex: 20,
        gravity: 1.5,
        faceRight: true,
        move: true
    }

    // My aim to player, perhaps integrate with player objekt in sp5?.
    var aim = {
        angle: 0,
        speed: 0.01
    }


    var bullets = [];

    // Two evenlistner to check keypresses and to delete keypress event. and also declare object.
    var keyPressed = {};
    addEventListener("keydown", function (e) {

        keyPressed[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keyPressed[e.keyCode];
    }, false);

  

    var position = function (modifier) {

        player.gravity = 1.5;

        // Forloop checking if player is falling on texture, then gravity is set to 0.
        for (var i = 0; i < map.length; i++) {
            if ((player.x < map[i].xPos + map[i].width && player.x > map[i].xPos - map[i].width) && (player.y + player.gravity >= map[i].Ypos - map[i].height)) {
                player.gravity = 0;
                player.jumping = false;
            }
       
        }
        if (38 in keyPressed) { // Player jumping on Up key
            if (!player.jumping) {
                player.jumping = true;

                player.y += -150;
            }
        }


        if (87 in keyPressed) { // Player aiming up on W key.
            if (aim.angle < 180) {
                aim.angle += aim.speed;
                console.log(aim.angle)
            }

        }
        if (83 in keyPressed) { // Player aiming down on S key.
            if (aim.angle > 0) {
                aim.angle -= aim.speed;
                console.log(aim.angle)
            }
        }

        if (32 in keyPressed) { // Player firing with space key.
            delete keyPressed[32];

            bullets.push({
                x: player.x + player.sizex / 2,
                y: player.y + player.sizey / 2,
                vy: Math.sin(aim.angle) * 5,
                vx: Math.cos(aim.angle) * 5
            });
        }
       
        if (37 in keyPressed) { // Player holding left key.
            var tempX = player.x - player.speed * modifier;
            var tempY = player.y;
            if (checkCol(tempX, tempY)) {
                player.x -= player.speed * modifier;
                player.faceRight = false;
            }

        }
        if (39 in keyPressed) { // Player holding right key.
            var tempX = player.x + player.speed * modifier;
            var tempY = player.y;
            if (checkCol(tempX, tempY)) {
                player.x += player.speed * modifier;
                player.faceRight = true;
            }


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
        player.y += player.gravity;
        if (player.y >= height - player.sizey) {
            player.y = height - player.sizey;
            player.jumping = false;
        }
        if (player.x >= width - player.sizex) {
            player.x = width - player.sizex;
        }
        else if (player.x <= 0) {
            player.x = 0;
        }
      
        player.move = true;
    }

    // This is used to adjust gamespeed if slow computor it get high modifier value in Position function.
    var PrevTime = Date.now();
    var main = function () {
        var NewDate = Date.now();
        var timeDiff = NewDate - PrevTime;

        position(timeDiff / 100);
        renderTexture();
        PrevTime = NewDate;
    };

    // Game loop, calling main function as fast as possible.
    setInterval(main, 1);

    // Function to reder units and texture.
    var renderTexture = function () {

        Texture.Player(player.x, player.y);
        Texture.aim(player.x, player.y, aim.angle);
        Texture.Enemy();
        Texture.bullet(bullets);
    }

}
//var animationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mossRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;

window.onload = function () {

    Init();
};