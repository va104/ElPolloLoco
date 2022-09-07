class Chicken extends MovableObject{
    position_y = 350;
    position_x = 400 + Math.random() * 500 // Number between 200 and 700;
    width = 60;
    height = 90;

    constructor() {
        // super() is just needed for methods but nut for properties
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}