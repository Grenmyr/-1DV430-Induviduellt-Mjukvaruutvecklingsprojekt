StaticTexture = function (width, height) {
    var staticCanvas = document.createElement("canvas")
    var ctx = staticCanvas.getContext("2d");
    staticCanvas.width = width;
    staticCanvas.height = height;
    staticCanvas.setAttribute("id", "staticCanvas")
    document.body.appendChild(staticCanvas);
   
    this.Background = function () {
        var backgroundImage = new Image();
        backgroundImage.src = "Content/Image/background.png";
        ctx.drawImage(backgroundImage, 0, 0);
    }

}
