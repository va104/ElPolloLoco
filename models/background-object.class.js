class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    constructor(image, x){
        super();
        this.img = image;
        this.position_x = x;
        this.position_y = 0;
    }
}