class Chicken extends MovableObject {
    position_y = 340;
    width = 60;
    height = 90;
    hitChicken = hitChicken;
    speedY = -20;
    movingDirection = 7;

    constructor() {
        // super() is just needed for methods but nut for properties
        super();
        this.img = chickenImagesCache['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'];
        this.imageCache = chickenImagesCache;
        this.position_x = 500 + Math.random() * 500 // Number between 200 and 700;
        this.speed = 0.15 + Math.random() * 0.25
        this.animate();
    }

    animate() {
        setStoppapleInterval(() => {
            if (!pauseGame) {
                if (!this.chickenisDead) {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);

        setStoppapleInterval(() => {
            if (!pauseGame) {
                if (!this.chickenisDead) {
                    this.playAnimation(chickenNormalImagesWalking);
                } else {
                    this.playAnimation(chickenNormalImagesDead);
                    this.chickenFallsDown();
                }
            }
        }, 100);
    }

    chickenFallsDown() {
        setTimeout(() => {
            if (this.isAboveGround()) {
                this.position_y -= this.speedY;
                this.position_x += this.movingDirection
                this.movingDirection++;
            }
        }, 300);
    }

}

