StaticTexture = function (width, height) {
    var staticCanvas = document.createElement("canvas")
    var ctxTerrain = staticCanvas.getContext("2d");
    staticCanvas.width = width;
    staticCanvas.height = height;
    staticCanvas.setAttribute("id", "staticCanvas")
    document.body.appendChild(staticCanvas);

    var backgroundCanvas = document.createElement("canvas")
    var ctxbackground = backgroundCanvas.getContext("2d");
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    backgroundCanvas.setAttribute("id", "backgroundCanvas")
    document.body.appendChild(backgroundCanvas);


    this.background = function () {
        var backgroundImage = new Image();
        backgroundImage.src = "Content/Image/background.png";
        ctxbackground.drawImage(backgroundImage, 0, 0);
    }

    this.terrain = function () {
        var terrain = new Image();
        terrain.src = "Content/Image/spriteMap.png";
        ctxTerrain.drawImage(terrain, 0, 0, 116, 58, 300, 300, 40, 20);
        ctxTerrain.drawImage(terrain, 116, 0, 58, 58, 360, 300, 20, 20);
    }



}
