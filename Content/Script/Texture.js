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

        this.bullet = function (bullets) {
            for (var i = 0; i < bullets.length; i++) {
                ctx.fillRect(bullets[i].x, bullets[i].y -= bullets[i].vy, 20, 20);
                ctx.stroke();
            }
        }

    this.Background = function () {
        var backgroundImage = new Image();
        backgroundImage.onload = function () {
            ctx.drawImage(backgroundImage, 0, 0);
        }
        backgroundImage.src = "Content/Image/background.png";   
    }
    this.Player = function (xPos, yPos) {
        ctx.clearRect(0,0,width,height)
        
        
            ctx.drawImage(playerImage, xPos, yPos);
        
    }
    this.Enemy = function () {
       
    
            ctx.drawImage(enemyImage, 100, 100);
    
        
    }
}
