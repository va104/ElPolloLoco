class Endboss extends MovableObject {
    height = 400;
    width = 250;
    position_y = -460;
    collidingOffset = {
        'top': 140,
        'right': 40,
        'bottom': 80,
        'left': 60,
    };
    hitChicken = hitEndboss_sound;
    isAboveOffset = 60;
    speed = 10;
    firstHit = false;

    constructor() {
        super();
        this.img = endbossImagesCache['img/4_enemie_boss_chicken/2_alert/G10.png'];
        this.imageCache = endbossImagesCache;
        this.position_x = 1000;
        this.position_xInital = this.position_x;
        this.animate();
        this.endbossAnimation();
        this.acceleration = 0.01;
        this.hpObject = 6;
    }

    animate() {
        this.runAnimation();
        this.runSkills();
        this.checkEndbossHealth();
    }

    runAnimation() {
        setStoppapleInterval(() => {
            if (!pauseGame) {
                //for walking
                if (this.isDead()) return this.playAnimation(endbossImagesDead), this.winGame();
                if (this.isHurt()) return this.playAnimation(endbossImagesHurt);
                if (this.isAttacking()) return this.playAnimation(endbossImagesAttack);
                if (!this.startingPositionReached() && this.firstHit) return this.playAnimation(endbossImagesWalking);
                this.playAnimation(endbossImagesAlert);
            }
        }, 200);
    }

    runSkills() {
        setStoppapleInterval(() => {
            if (!pauseGame) {
                if (this.chickenisHit) return this.attackToLeft(), this.turnLeft(), this.firstEndbossHit();
                if (!this.chickenisHit && !this.startingPositionReached() && this.firstHit) return this.walkToRight();
                if (this.startingPositionReached()) return this.turnLeft();
                if (this.hpObject == 5) return this.shrinkEndboss(), this.increaseSpeed(); 
            }
        }, 1000 / 25);
    }

    checkEndbossHealth() {
        setStoppapleInterval(() => {
            if (!pauseGame) {
                if (this.hpObject == 5) return this.shrinkEndboss(), this.increaseSpeed(); 
            }
        }, 300);
    }

    shrinkEndboss(){
        if (this.height >= 300) {
            this.height -= this.height * .10;
            this.width -= this.width * .10;
            this.position_y += this.position_y  * .35
        }
    }

    increaseSpeed(){
        this.speed = 13;
    }

    firstEndbossHit() {
        this.firstHit = true;
    }

    isAttacking() {
        return this.chickenisHit;
    }

    turnLeft() {
        setTimeout(() => {
            return this.otherDirection = false;
        }, 1000);
    }

    attackToLeft() {
        setTimeout(() => {
            this.moveLeft();
        }, 1000);
    }

    walkToRight() {
        setTimeout(() => {
            this.otherDirection = true;
            this.moveRight();
        }, 1000);
    }

    startingPositionReached() {
        return this.position_xInital < this.position_x
    }

    endbossAnimation() {
        const endbossAnimationInterval =
            setInterval(() => {
                if (!pauseGame) {
                    if (isEndbossReached) {
                        this.applyGravity();
                        endboss_spawning_sound.play();
                        if (this.position_y > 60) {
                            isEndbossReached = false; //so that the character can move again
                            endbossStatusBar = true; //used in world for endboss healthBar
                            clearInterval(endbossAnimationInterval);
                            this.endbossMusic();
                        }
                    }
                }
            }, 200);
    }

    endbossMusic() {
        if (gameMusicStatus) {
            game_music.src = './audio/music_fast.mp3';
            game_music.play();
            game_music.loop = true;
        }
    }

    winGame() {
        setTimeout(() => {
            win_sound.play();
            game_music.src = './audio/music.mp3';
            game_music.volume = false;
            this.img = endbossImagesCache['img/4_enemie_boss_chicken/5_dead/G26.png'];
            const win = getDocumentID('win');
            const afterGame = getDocumentID('afterGame');
            win.classList.remove('d-none');
            afterGame.classList.remove('d-none');
            win.classList.add('growmenu');
            afterGame.classList.add('growmenu');
            clearAllIntervals();
        }, 1000)
    }
}