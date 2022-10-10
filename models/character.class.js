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
    walking_sound = walking_sound;
    jumping_sound = jumping_sound;
    hurting_sound = hurting_sound;
    dying_sound = dying_sound;
    loose_sound = loose_sound;

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
            if (!pauseGame) {
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
            }
        }, 1000 / 60);

        // Different images for dead, hurt, juming, walking 

        setInterval(() => {
            if (!pauseGame) {
                if (this.isDead()) {
                    this.playAnimation(characterImagesDead)
                    this.dying_sound.play();
                    this.looseGame();
                } else if (this.isHurt()) {
                    this.hurting_sound.play();
                    this.playAnimation(characterImagesHurt);
                } else if (this.characterIsMoving() && !this.isAboveGround()) {
                    // walk animation 
                    this.playAnimation(characterImagesWalking)
                }
            }
        }, 50);

        setInterval(() => {
            if (!pauseGame) {
                if (this.isAboveGround()) {
                    this.playAnimation(characterImagesJumping)
                }
            }
        }, 180);

        setInterval(() => {
            if (!pauseGame) {
                if (this.noKeyboardButtonSelected() && !this.isAboveGround()) {
                    this.playAnimation(characterImagesIdle)
                }
            }
        }, 130)
    }

    characterIsMoving(){
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
    }

    noKeyboardButtonSelected() {
        return (!this.world.keyboard.RIGHT &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE)
    }

    looseGame() {
        setTimeout(() => {
            this.loose_sound.play();
            game_music.volume = false;
            game_music.src = './audio/music.mp3';
            this.img = characterImagesCache['img/2_character_pepe/5_dead/D-56.png'];
            let loose = getDocumentID('loose');
            let afterGame = getDocumentID('afterGame');
            loose.classList.remove('d-none');
            afterGame.classList.remove('d-none');
            loose.classList.add('growmenu');
            afterGame.classList.add('growmenu');
            game_music.volume = false;
            clearAllIntervals();
        }, 500)
    }
}  