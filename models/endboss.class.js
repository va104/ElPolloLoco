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

    constructor() {
        super();
        this.img = endbossImagesCache['img/4_enemie_boss_chicken/2_alert/G10.png'];
        this.imageCache = endbossImagesCache;
        this.position_x = 1000;
        this.animate();
        this.endbossAnimation();
        this.acceleration = 0.01;
        this.hpObject = 1;
    }

    animate() {
        setStoppapleInterval(() => {
                if (!pauseGame) {            
                    //for walking
                    if (this.isDead()) {
                        this.playAnimation(endbossImagesDead);
                        this.winGame();
                    } else if (this.isHurt()) {
                        this.playAnimation(endbossImagesHurt);
                    } else {
                        this.playAnimation(endbossImagesAlert);
                    }
                }
            }, 200);
    }

    endbossAnimation() {
        let endbossAnimationInterval =
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
            let win = getDocumentID('win');
            let afterGame = getDocumentID('afterGame');
            win.classList.remove('d-none');
            afterGame.classList.remove('d-none');
            win.classList.add('growmenu');
            afterGame.classList.add('growmenu');
            clearAllIntervals();
        }, 1000)
    }

    //hier kommen später die Laufattacken rein
    // test(){
    //     setInterval(() => {
    //         console.log('Enemy reached')
    //     }, 100);
    // }
}