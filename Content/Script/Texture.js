Texture = function (width, height) {

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
        xpos: Math.floor((Math.random()*600)+1),
        ypos: Math.floor((Math.random() * 450) + 1),
        width: 20,
        height:20
    }
    var terrain = {

    }

    this.bullet = function (bullets) {
      
        for (var i = 0; i < bullets.length; i++) {
            console.log(bullets[i].x)
            ctx.fillRect(bullets[i].x -= bullets[i].vx, bullets[i].y -= bullets[i].vy, 5, 5);
            ctx.stroke();
            checkCol(bullets[i].x, bullets[i].y);
            if (bullets[i].y < 0 || bullets[i].y > height ||bullets[i].x > width || bullets[i].x < 0 ) {
                bullets.splice(i, 1)
          
            }
        }
    }

    this.Player = function (xPos, yPos) {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(playerImage, xPos, yPos);
       

    }
    this.aim = function (xPos, yPos,angle) {
     
        ctx.drawImage(aimImage, xPos -50* Math.cos(angle), yPos- 50* Math.sin(angle), 20, 20);
      
       
    }
    this.Enemy = function () {
        ctx.drawImage(enemyImage, enemyPos.xpos, enemyPos.ypos);
    }
    function checkCol(bulletX,bulletY) {
  
        
        if ((bulletX < enemyPos.xpos + enemyPos.width && bulletX > enemyPos.xpos - enemyPos.width) && (bulletY < enemyPos.ypos + enemyPos.height && bulletY > enemyPos.ypos - enemyPos.height)) {
            enemyPos.xpos = Math.floor((Math.random() * 600) + 1);
            enemyPos.ypos = Math.floor((Math.random() * 450) + 1);
        }
    }
}
