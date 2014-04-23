var Init = function () {
    var width = 800;
    var height = 450;
    var textureConstructor = Texture;
    Texture = new textureConstructor(800, 450);

    var staticTextureConstructor = StaticTexture;
    StaticTexture = new staticTextureConstructor(800, 450)
    var map = [
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 300, Ypos: 400 },
        { SpriteposX: 0, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 400 },
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 360 },
        { SpriteposX: 58, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 320, Ypos: 400 },
        { SpriteposX: 0, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 340, Ypos: 400 },
        { SpriteposX: 116, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 380, Ypos: 400 },
        { SpriteposX: 58, SpritePosy: 0, xLength: 58, Yheight: 58, xPos: 360, Ypos: 380 },
    ];

    var backgroundTexture = StaticTexture.background();
    var terrain = StaticTexture.terrain(map);



    var player = {
        speed: 30, // movement in pixels per second
        jumping: false,
        x: 0,
        y: 0,
        sizey: 20,
        sizex: 20,
        gravity: 1.5,
        faceRight : true
    }

    var aim = {
        angle: 0,
        speed: 0.005
    }

    var bullets = [];

    var keyPressed = {};

    addEventListener("keydown", function (e) {

        keyPressed[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keyPressed[e.keyCode];
    }, false);

    var position = function (modifier) {
        
        if (87 in keyPressed) { // Player aiming up
            if (aim.angle < 180 ) {
                aim.angle += aim.speed;
                console.log(aim.angle)
            }
            
        }
        if (83 in keyPressed) { // Player aiming down
            if (aim.angle > 0) {
                aim.angle -= aim.speed;
                console.log(aim.angle)
            }
        }

        if (32 in keyPressed) {
            delete keyPressed[32];

            bullets.push({
                x: player.x+player.sizex/2,
                y: player.y+player.sizey/2,
                vy: Math.sin(aim.angle) * 5,
                vx : Math.cos(aim.angle)*5
            });
        }
        if (38 in keyPressed) { // Player holding up
            if (!player.jumping) {
                player.jumping = true;
                player.y += -150;
            }

        }
        if (37 in keyPressed) { // Player holding left
            player.x -= player.speed * modifier;
            player.faceRight = false;

        }
        if (39 in keyPressed) { // Player holding right

            player.x += player.speed * modifier;
            player.faceRight = true;
        }
        if (40 in keyPressed) { // Player holding down
            player.y += player.speed * modifier;
        }


        player.y += player.gravity;


        if (player.y >= 450 - player.sizey) {
            player.y = 450 - player.sizey;
            player.jumping = false;
        }
        if (player.x >= 800 - player.sizex) {
            player.x = 800 - player.sizex;
        }
        else if (player.x <= 0) {
            player.x = 0;
        }

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