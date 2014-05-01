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

    // Here is code for projectiles.
    var grenadeTimer = null
    this.bullet = function (bullets, gun) {
        for (var i = 0; i < bullets.length; i++) {
            if (checkCol(bullets[i].x, bullets[i].y, gun)) {
                if (gun === 0) { bullets.splice(i, 1); return }
                if (gun === 1) {
                    bullets[i].vy = 0;
                    bullets[i].vx = 0;
                    bullets[i].grenadeGrav = 0;
                }
            }
            if (gun === 0) {
                ctx.fillRect(bullets[i].x -= bullets[i].vx, bullets[i].y -= bullets[i].vy, 5, 5);
            }            
            if (gun === 1) {
                ctx.fillRect(bullets[i].x -= bullets[i].vx, bullets[i].y -= bullets[i].vy -= bullets[i].grenadeGrav, 15, 15);
                if (grenadeTimer === null) {
                    setTimeout(function () {
                        grenadeTimer = null, bullets.splice(0, 1)
                    }, 3000);
                    grenadeTimer = true;
                }
            }
            ctx.stroke();
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
    function checkCol(bulletX, bulletY, gun) {
        if (gun === 0) {
          
            if (bulletY < 0 || bulletY > height || bulletX > width || bulletX < 0) {
                return true;
            }
        }
        if ((bulletX < enemyPos.xpos + enemyPos.width && bulletX > enemyPos.xpos - enemyPos.width) && (bulletY < enemyPos.ypos + enemyPos.height && bulletY > enemyPos.ypos - enemyPos.height)) {
            enemyPos.xpos = Math.floor((Math.random() * 600) + 1);
            enemyPos.ypos = Math.floor((Math.random() * 450) + 1);
            return true;
        }
        for (var i = 0; i < map.length; i++) {// maste anpassa for bullet width också.
            if ((bulletX < map[i].xPos + map[i].width && bulletX > map[i].xPos - map[i].width) &&
                   (bulletY+15 >= map[i].Ypos && bulletY+15 <= map[i].Ypos + map[i].height)) {
                return true;
            }
        }

    }

}
