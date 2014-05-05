 var Enemy = function (width, height) {
    var mainDiv = document.getElementById("main");
    var canvas = document.createElement("canvas")
    this.ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute("id", "Enemy")
    mainDiv.appendChild(canvas);

    this.enemyImage = new Image();
    this.enemyImage.src = "Content/Image/3.png";

    this.x = Math.floor((Math.random() * 600) + 1);
    this.y = 400;
 }
 Enemy.prototype.draw = function () {
     this.ctx.drawImage(this.enemyImage, this.x, this.y);
 }
Enemy.prototype.width = 20;
Enemy.prototype.height = 20;


