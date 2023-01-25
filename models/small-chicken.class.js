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
        this.position_x = this.randomIntFromInterval(500, 4500);
        this.backAndForthSpeed = 2;
        this.speed = 0.15 + Math.random() * speedVariable;
        this.timeOutJump = this.randomIntFromInterval(4000, 5000);
        this.timeOutJumpBack = this.randomIntFromInterval(7000, 8000);
        this.animate();
        this.applyGravity();
    }

    animate() {
        this.runSkills();
        this.runAnimation();
    }

    runSkills() {
        if (!this.chickenisDead) {
            // this.position_y = 360;
            this.otherDirection = false;
            const intervalIDmoveLeft = this.skillMoveLeft();
            const intervalIDJump = this.skillJump(); //every two secons
            // after six seconds the chicken is jumping back as long its above the ground
            // when its landing, it starts from the beginning
            setTimeout(() => {
                if (!pauseGame) {
                    clearInterval(intervalIDmoveLeft);
                    clearInterval(intervalIDJump);
                    this.jump();
                    this.skillJumpBack();
                }
            }, this.timeOutJumpBack);
        }
    }

    skillMoveLeft() {
        return setStoppapleInterval(() => {
            if (!pauseGame) {
                if (!this.chickenisDead) {
                    this.moveLeft();
                }
            }
        }, 1000 / 25);
    }

    skillJump() {
        return setStoppapleInterval(() => {
            if (!pauseGame) {
                if (!this.chickenisDead) {
                    this.jump();
                }
            }
        }, this.timeOutJump);
    }

    skillJumpBack() {
        this.otherDirection = true;
        const intervalIDJumpBack = setStoppapleInterval(() => {
            if (this.isAboveGround()) {
                this.position_x += 5;
            } else {
                clearInterval(intervalIDJumpBack);
                this.runSkills();
            }
        }, 1000 / 25);
    }

    runAnimation() {
        setStoppapleInterval(() => {
            if (!pauseGame) {
                if (this.chickenisDead)
                    return this.playAnimation(chickenSmallImagesDead), this.chickenFallsDown();
                this.playAnimation(chickenSmallImagesWalking);
            }
        }, 100)
    }

    chickenFallsDown() {
        setTimeout(() => {
            this.speedY = -20;
            if (this.position_y < 500) {
                this.position_y -= this.speedY;
                this.position_x += this.movingDirection
                this.movingDirection++;
            }
        }, 500);
    }
}