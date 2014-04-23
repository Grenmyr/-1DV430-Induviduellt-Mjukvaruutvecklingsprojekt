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
        backgroundImage.onload = function () {
            ctxbackground.drawImage(backgroundImage, 0, 0);
        };
        
    }

    this.terrain = function (array) {
        var terrain = new Image();
        terrain.src = "Content/Image/spriteMap.png";
        terrain.onload = function () {
            for (var i = 0; i < array.length; i++) {
                //console.log(terrain, array[i].SpriteposX, array[i].SpritePosy, array[i].xLength, array[i].Yheight, array[i].xPos, array[i].Ypos, 20, 20)
                ctxTerrain.drawImage(terrain, array[i].SpriteposX, array[i].SpritePosy, array[i].xLength, array[i].Yheight, array[i].xPos, array[i].Ypos, 20, 20);
            }
        }
        //ctxTerrain.drawImage(terrain, 0, 0, 116, 58, 300, 400, 20, 20);
        //ctxTerrain.drawImage(terrain, 116, 0, 58, 58, 380, 400, 20, 20);
    }



}
