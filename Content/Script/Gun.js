var Gun = function (player) {
    var mainDiv = document.getElementById("main");
    var canvas = document.createElement("canvas")
    this.ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id", "gun")
    mainDiv.appendChild(canvas);
   
    this.x = player.x;
    this.y = player.y;
    this.vy = Math.sin(player.angle) * 10;
    this.vx = Math.cos(player.angle) * 10;
    this.height = 5
    this.width = 5

}

Gun.prototype.clear = function (player) {
    this.ctx.clearRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4)
}

Gun.prototype.draw = function (player) {
    this.clear();
    this.ctx.fillRect(this.x -= this.vx, this.y -= this.vy, this.width, this.height);
}

