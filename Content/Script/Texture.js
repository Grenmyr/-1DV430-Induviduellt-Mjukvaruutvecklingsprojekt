Texture = function (width, height) {
        var canvas = document.createElement("canvas")
        var ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        canvas.setAttribute("id", "canvas")
        document.body.appendChild(canvas);
       
        this.bullet = function (xPos, yPos) {
            ctx.rect(xPos, yPos, 20, 20);
            ctx.stroke();
        }

    this.Background = function () {
        var backgroundImage = new Image();
        backgroundImage.onload = function () {
            ctx.drawImage(backgroundImage, 0, 0);
        }
        backgroundImage.src = "Content/Image/background.png";   
    }
    this.Player = function (xPos, yPos) {
        var playerImage = new Image();
        playerImage.onload = function () {
            ctx.drawImage(playerImage, xPos, yPos);
        }
        playerImage.src = "Content/Image/unit.png";
    }
    this.Enemy = function () {
        var enemyImage = new Image();
        enemyImage.onload = function () {
            ctx.drawImage(enemyImage, 100, 100);
        }
        enemyImage.src = "Content/Image/3.png";
    }
}
