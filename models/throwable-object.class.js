class ThrowableObject extends MovableObject {
    throwing_sound = throwing_sound;
    isAboveOffset = 500;

    constructor(x, y) {
        super();
        this.imageCache = bottleImagesCache;
        this.img = bottleImagesCache['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
        this.position_x = x;
        this.position_y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw() {
        if (!pauseGame) {
            this.throwing_sound.play();
            this.speedY = 15;
            this.applyGravity()
        }
    }

    animate() {
        setStoppapleInterval(() => {
            if (!pauseGame) {
                if (!this.chickenisDead) {
                    this.playAnimation(bottleImagesRotation)
                } else {
                    this.playAnimation(bottleImagesSplash);
                }
            }
        }, 100);

        setStoppapleInterval(() => {
            if (this.isAboveGround() && !this.chickenisDead) {
                this.position_x += 14;
            } else if (this.chickenisDead) {
                this.position_y = 340;
            }
        }, 1000 / 25);
    }
}