Texture = function () {
        var canvas = document.createElement("canvas")
        var ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 450;
        canvas.setAttribute("id", "canvas")
        document.body.appendChild(canvas);

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
