class MovableObject {
    position_x = 120;
    position_y = 280;
    width = 100;
    height = 150;
    img;

    constructor() {

    }

    loadImage(path) {
        // not a current image in the DOM --> is used later
        this.img = new Image(); // this.img = document.getElementByID('image') <img id="image" src>
        this.img.src = path 
    }

    moveRight(){
        console.log('Moving right')
    }

    moveLeft(){
        
    }
}