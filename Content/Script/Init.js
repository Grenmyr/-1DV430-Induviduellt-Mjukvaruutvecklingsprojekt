
function Init() {

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 450;
    canvas.setAttribute("id","canvas")
    document.body.appendChild(canvas);


    // Background image
   
    var bgImage = new Image();
    bgImage.src = "Content/Image/background.png";
    bgImage.onload = function () {
        ctx.drawImage(bgImage, 0, 0);
    };
    

};
window.onload = function () {

    Init();
};