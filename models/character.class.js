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
                    this.img = characterImagesCache['img/2_character_pepe/1_idle/idle/I-1.png']
                    game_music.pause();
                    //interval should stop if endboss is reached
                    clearInterval(endbossAnimationInterval);
                }
            }, 1000 / 60
            )
    }

    animate() {
        this.runSkills();
        this.runAnimation();
    }

    runSkills() {
        setInterval(() => {
            if (!pauseGame) {
                // character can not move when endboss is showing up
                if (!isEndbossReached) {
                    walking_sound.pause();
                    this.checkDirectionRight();
                    this.checkDirectionLeft();
                    this.checkJumping();
                    //adjust camera
                    this.world.camera_x = -this.position_x + 100;
                }
            }
        }, 1000 / 60)
    }

    checkDirectionRight() {
        if (this.world.keyboard.RIGHT && this.position_x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            walking_sound.play();
        }
    }

    checkDirectionLeft() {
        if (this.world.keyboard.LEFT && this.position_x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            walking_sound.play();
        }
    }

    checkJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            jumping_sound.play();
        }
    }


    runAnimation() {
        setInterval(() => {
            if (!pauseGame) {
                if (!isEndbossReached) {
                    if (this.isDead()) {
                        this.playAnimation(characterImagesDead)
                        dying_sound.play();
                        this.looseGame();
                    } else if (this.isHurt()) {
                        hurting_sound.play();
                        this.playAnimation(characterImagesHurt);
                    } else if (this.characterIsMoving() && !this.isAboveGround()) {
                        // walk animation 
                        this.playAnimation(characterImagesWalking)
                    }
                }
            }
        }, 50);

        setInterval(() => {
            if (!pauseGame) {
                if (!isEndbossReached) {
                    if (this.isAboveGround()) {
                        this.playAnimation(characterImagesJumping)
                    }
                }
            }
        }, 180);

        setInterval(() => {
            if (!pauseGame) {
                if (!isEndbossReached) {
                    if (this.noKeyboardButtonSelected() && !this.isAboveGround()) {
                        this.playAnimation(characterImagesIdle)
                    }
                }
            }
        }, 130)
    }

    // Different images for dead, hurt, juming, walking 


    characterIsMoving() {
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
            loose_sound.play();
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
    
    playJumpAnimation(images) {
        // console.log(this.speedY)   
        if (this.speedY <= 30 && this.speedY > 20) {
            this.jumpingImage(images[0])
        }
        else if (this.speedY <= 20 && this.speedY > 10) {
            this.jumpingImage(images[1])
        }
        else if (this.speedY <= 10 && this.speedY > 0) {
            this.jumpingImage(images[2])
        }
        else if (this.speedY <= 0 && this.speedY > -7.5) {
            this.jumpingImage(images[3])
        }
        else if (this.speedY <= -7.5 && this.speedY > -15) {
            this.jumpingImage(images[4])
        }
        else if (this.speedY <= -15 && this.speedY > -22.5) {
            this.jumpingImage(images[5])
        }
        else if (this.speedY <= -22.5 && this.speedY > -30) {
            this.jumpingImage(images[6])
        }
        else if (this.speedY < -30) {
            this.jumpingImage(images[7])
        }
    };

    jumpingImage(image) {
        this.img = this.imageCache[image];
    }
}  