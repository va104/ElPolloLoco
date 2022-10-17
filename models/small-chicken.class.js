class smallChicken extends MovableObject {
    position_y = 360;
    width = 40;
    height = 60;
    isAboveOffset = 360;
    hitChicken = hitSmallChicken;
    movingDirection = 7;

    constructor(speedVariable) {
        super();
        this.img = chickenImagesCache['img/3_enemies_chicken/chicken_small/1_walk/1_w.png'];
        this.imageCache = chickenImagesCache
        this.position_x = 500 + Math.random() * 500 // Number between 200 and 700;
        this.backAndForthSpeed = 2;
        this.speed = 0.15 + Math.random() * speedVariable;
        this.jumpSpeed = Math.random() * 1000;
        this.animate();
        this.applyGravity();
    }

    animate() {
        this.runSkills();
        this.runAnimation();
    }

    runSkills() {
        // Chicken Moves Left
        setStoppapleInterval(() => {
            if (!pauseGame) {
                this.moveLeft();
            }
        }, 1000 / 25);

        setStoppapleInterval(() => {
            if (!pauseGame) {
                if (!this.chickenisDead) {
                    this.jump()
                }
            }
        }, 2000)
    }

    runAnimation() {
        setStoppapleInterval(() => {
            if (!pauseGame) {
                if (this.chickenisDead) {
                    this.playAnimation(chickenSmallImagesDead);
                    this.chickenFallsDown();
                } else {
                    this.playAnimation(chickenSmallImagesWalking);
                }
                // if (this.isDead()) return this.animationDead();
            }
        }, 100)
    }

    chickenFallsDown() {
        setTimeout(() => {
            if (this.position_y < 500) {
                this.position_y -= this.speedY;
                this.position_x += this.movingDirection
                this.movingDirection++;
            }
        }, 500);
    }

    // Sprung zwei vor eins zurück 
}