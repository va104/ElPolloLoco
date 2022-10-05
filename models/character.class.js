class Character extends MovableObject {
    width = 170;
    height = 280;
    position_y = 150;
    speed = 10;
    collidingOffset = {
        'top': 120,
        'right': 30,
        'bottom': 40,
        'left': 30,
    }
    world;
    walking_sound = new Audio('./audio/walking.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');
    hurting_sound = new Audio('./audio/hurt.mp3');
    dying_sound = new Audio('./audio/dying.mp3');

    constructor() {
        super()
        this.img = characterImagesCache['img/2_character_pepe/1_idle/idle/I-1.png'];
        this.imageCache = characterImagesCache;
        this.animate();
        this.applyGravity();
        this.checkIfEndbossIsReached();
    };

    checkIfEndbossIsReached() {
        let endbossAnimationInterval =
            setInterval(() => {
                if (this.position_x >= 700) {
                    isEndbossReached = true;
                    game_music.pause();
                    //interval should stop if endboss is reached
                    clearInterval(endbossAnimationInterval);
                }
            }, 1000 / 60
            )
    }

    animate() {
        setInterval(() => {
            if (!isEndbossReached) {
                this.walking_sound.pause();
                if (this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.walking_sound.play();
                }

                if (this.world.keyboard.LEFT && this.position_x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.walking_sound.play();
                }

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                    this.jumping_sound.play();
                }

                this.world.camera_x = -this.position_x + 100;
            }
        }, 1000 / 60);

        // Different images for dead, hurt, juming, walking 

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(characterImagesDead)
                this.dying_sound.play();
            } else if (this.isHurt()) {
                this.hurting_sound.play();
                this.playAnimation(characterImagesHurt);
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
                // walk animation 
                this.playAnimation(characterImagesWalking)
            }
        }, 50);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(characterImagesJumping)
            }
        }, 180);

        setInterval(() => {
            if (this.noKeyboardButtonSelected() && !this.isAboveGround()) {
                this.playAnimation(characterImagesIdle)
            }
        }, 130)
    }

    noKeyboardButtonSelected() {
        return (!this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE)
    }
}  