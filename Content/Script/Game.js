var Init = function () {
    var width = 800;
    var height = 450;
    var textureConstructor = Texture;
    Texture = new textureConstructor(800, 450);

   

    var player = {
        speed: 30, // movement in pixels per second
        jumping: false,
        x: 0,
        y: 0,
        sizey: 20,
        sizex: 20,
        gravity: 1
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


        if (32 in keyPressed) {
            delete keyPressed[32];
            bullets.push({
                x: player.x,
                y: player.y,
                vy: 5
            });
           
            
        }
        if (38 in keyPressed) { // Player holding up
            if (!player.jumping) {
                player.jumping = true;
                player.y += -100;
            }
        }
        if (37 in keyPressed) { // Player holding left
            player.x -= player.speed * modifier;
            
        }
        if (39 in keyPressed) { // Player holding right

            player.x += player.speed * modifier;
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
    
       
        //var backgroundTexture = Texture.Background();
        var playerTexture = Texture.Player(player.x, player.y);
        var enemyTexture = Texture.Enemy();
        var texture = Texture.bullet(bullets);
      
        
        
    }

}


window.onload = function () {

    Init();
};