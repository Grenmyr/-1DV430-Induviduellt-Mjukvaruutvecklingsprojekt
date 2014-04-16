Texture = function (width, height) {

    var canvas = document.createElement("canvas")
    var ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute("id", "canvas")
    document.body.appendChild(canvas);

    var playerImage = new Image();
    playerImage.src = "Content/Image/unit.png";

    var enemyImage = new Image();
    enemyImage.src = "Content/Image/3.png";
    var enemyPos = {
        xpos: 100,
        ypos: 100,
        width: 20,
        height:20
    }

    this.bullet = function (bullets) {
      
        for (var i = 0; i < bullets.length; i++) {
            console.log(bullets[i].x)
            ctx.fillRect(bullets[i].x, bullets[i].y -= bullets[i].vy, 20, 20);
            ctx.stroke();
            checkCol(bullets[i].x, bullets[i].y);
            if (bullets[i].y < 0) {
                bullets.splice(i, 1)
            }
        }
    }

    this.Player = function (xPos, yPos) {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(playerImage, xPos, yPos);
    }
    this.Enemy = function () {
        ctx.drawImage(enemyImage, 100, 100);
    }
    function checkCol(bulletX,bulletY) {
        console.log(bulletX)
        console.log(enemyPos.xpos + enemyPos.width)
        console.log(enemyPos.xpos - enemyPos.width)
        if ((bulletX < enemyPos.xpos + enemyPos.width && bulletX > enemyPos.xpos - enemyPos.width) && (bulletY < enemyPos.ypos + enemyPos.height && bulletY > enemyPos.ypos - enemyPos.height)) {
           alert("BOOM")
        }
    }
}
