class MovableObject {
    position_x = 120;
    position_y = 280;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false; 

    
    loadImage(path) {
        // not a current image in the DOM --> is used later
        this.img = new Image(); // this.img = document.getElementByID('image') <img id="image" src>
        this.img.src = path 
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png, 'img/image2.png', ...]
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    moveRight(){
    }
    
    moveLeft() {
        setInterval(() => {
            this.position_x -= this.speed;
        }, 1000 / 60);
    };
}