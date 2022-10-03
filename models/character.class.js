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
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',

    ];
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    // IMAGES_WALKING = [
    //     'img/2_character_pepe/2_walk/W-21.png',
    //     'img/2_character_pepe/2_walk/W-22.png',
    //     'img/2_character_pepe/2_walk/W-23.png',
    //     'img/2_character_pepe/2_walk/W-24.png',
    //     'img/2_character_pepe/2_walk/W-25.png',
    //     'img/2_character_pepe/2_walk/W-26.png',
    // ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;
    walking_sound = new Audio('./audio/walking.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');
    hurting_sound = new Audio('./audio/hurt.mp3');
    dying_sound = new Audio('./audio/dying.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        // this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);

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
                this.playAnimation(this.IMAGES_DEAD)
                this.dying_sound.play();
            } else if (this.isHurt()) {
                this.hurting_sound.play();
                this.playAnimation(this.IMAGES_HURT);
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
                // walk animation 
                this.playAnimation(characterImagesCache)
            }
        }, 50);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playJumpAnimation(this.IMAGES_JUMPING);
            }
        }, 180);

        setInterval(() => {
            if (this.noKeyboardButtonSelected() && !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_IDLE)
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