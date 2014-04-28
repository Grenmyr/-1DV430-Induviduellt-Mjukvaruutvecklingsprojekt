Texture = function (width, height, staticTexture) {

    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute("id", "canvas")
    document.body.appendChild(canvas);

    var playerImage = new Image();
    playerImage.src = "Content/Image/unit.png";

    var aimImage = new Image();
    aimImage.src = "Content/Image/aim.png";

    var enemyImage = new Image();
    enemyImage.src = "Content/Image/3.png";
    var enemyPos = {
        xpos: Math.floor((Math.random() * 600) + 1),
        ypos: Math.floor((Math.random() * 450) + 1),
        width: 20,
        height: 20
    }

    var map = []
    map = staticTexture.getMap()


    this.bullet = function (bullets, gun) {
        var grenadeGrav = 0.5;
        //setTimeout(function () { alert("Boom grenade off!!") }, 3000);
        for (var i = 0; i < bullets.length; i++) {
            if (gun == 0) {
                ctx.fillRect(bullets[i].x -= bullets[i].vx, bullets[i].y -= bullets[i].vy, 5, 5);
            }
            if (gun == 1) {
                ctx.fillRect(bullets[i].x -= bullets[i].vx, bullets[i].y -= bullets[i].vy -= grenadeGrav, 15, 15);
            }
            ctx.stroke();
            if (checkCol(bullets[i].x, bullets[i].y)) {
                bullets.splice(i,1)
            }
            //checkCol(bullets[i].x, bullets[i].y);
        }
    }
    this.Player = function (xPos, yPos) {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(playerImage, xPos, yPos);
    }
    this.aim = function (xPos, yPos, angle) {
        ctx.drawImage(aimImage, xPos - 50 * Math.cos(angle), yPos - 50 * Math.sin(angle), 20, 20);
    }
    this.Enemy = function () {
        ctx.drawImage(enemyImage, enemyPos.xpos, enemyPos.ypos);
    }
    function checkCol(bulletX, bulletY) {
        if ((bulletX < enemyPos.xpos + enemyPos.width && bulletX > enemyPos.xpos - enemyPos.width) && (bulletY < enemyPos.ypos + enemyPos.height && bulletY > enemyPos.ypos - enemyPos.height)) {
            enemyPos.xpos = Math.floor((Math.random() * 600) + 1);
            enemyPos.ypos = Math.floor((Math.random() * 450) + 1);
            return true;
        }
        for (var i = 0; i < map.length; i++) {// maste anpassa for bullet width också.
            if ((bulletX < map[i].xPos + map[i].width && bulletX > map[i].xPos - map[i].width) &&
                   (bulletY >= map[i].Ypos  && bulletY <= map[i].Ypos + map[i].height)) {
                return true;
            }
        }
        if (bulletY < 0 || bulletY > height || bulletX > width || bulletX < 0) {
            return true;
        }
    }

}
