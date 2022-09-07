class Cloud extends MovableObject{
    position_y = 20;
    height = 250;

    constructor() {
        // super() is just needed for methods but nut for properties
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.position_x = Math.random() * 500; // Number between 200 and 700
        this.width = 500;
    }
}