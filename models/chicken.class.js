class Chicken extends MovableObject{
    position_y = 350;
    width = 60;
    height = 90;
    IMAGES_WALKING_NORMAL = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD_NORMAL = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];


    
    constructor() {
        // super() is just needed for methods but nut for properties
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.position_x = 200 + Math.random() * 500 // Number between 200 and 700;
        this.speed = 0.15 + Math.random() * 0.25

        this.loadImages(this.IMAGES_WALKING_NORMAL);
        this.loadImages(this.IMAGES_DEAD_NORMAL);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING_NORMAL);
        }, 100);
    }
}