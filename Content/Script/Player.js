var Player = function (width, height) {
    //var mainDiv = document.getElementById("main");
    //var canvas = document.getElementById("canvas")
    //this.ctx = canvas.getContext("2d");

    var mainDiv = document.getElementById("main");
    var canvas = document.createElement("canvas")
    this.ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id", "player")
    mainDiv.appendChild(canvas);

    this.playerImage = new Image();
    this.playerImage.src = "Content/Image/unit.png";
    this.aimImage = new Image();
    this.aimImage.src = "Content/Image/aim.png";
    this.healthImage = new Image();
    this.healthImage.src = "Content/Image/healthbar.png";
    this.jumping = false;
    this.x = 0;
    this.y = 0;
    this.angle = 90;
    this.firearm = 0;
    this.health = 1;

}
Player.prototype = {
    width: 20,
    height: 20,
    gravity: 10,
    aimSpeed: 0.05,
    speed: 5
}
Player.prototype.aim = function () {
    this.clear();
}
Player.prototype.clear = function (player) {
    this.ctx.clearRect(0, 0, 800, 450)

}
Player.prototype.draw = function () {
    this.clear();
    this.ctx.drawImage(this.playerImage, this.x, this.y);
    this.ctx.drawImage(this.aimImage, this.x - 50 * Math.cos(this.angle), this.y - 50 * Math.sin(this.angle), 20, 20);
    if (this.health == 4) {
        this.ctx.drawImage(this.healthImage, 0, 0, 58, 58, this.x -10, this.y - 25, 40, 40);
    }
    if (this.health == 3) {
        
        this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x- 5 , this.y - 25, 40 * (this.health / 4), 40);
    }
    if (this.health == 2) {
        this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x , this.y - 25, 40 * (this.health / 4), 40);
    }
    if (this.health == 1) {
        this.ctx.drawImage(this.healthImage, 0, 0, 58 * (this.health / 4), 58, this.x + 5, this.y - 25, 40 * (this.health / 4), 40);
    }
}
