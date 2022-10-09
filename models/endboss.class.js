class Endboss extends MovableObject {
    height = 400;
    width = 250;
    position_y = -460;
    game_music_endboss = game_music;
    collidingOffset = {
        'top': 140,
        'right': 40,
        'bottom': 80,
        'left': 60,
    };
    hitChicken = hitEndboss;
    endboss_spawning_sound = endboss_spawning_sound;

    constructor() {
        super();
        this.img = endbossImagesCache['img/4_enemie_boss_chicken/2_alert/G10.png'];
        this.imageCache = endbossImagesCache;
        this.position_x = 1000;
        this.animate();
        this.endbossAnimation();
        this.acceleration = 0.01;
    }

    animate() {
        let endbossDeadInterval =
            setInterval(() => {
                //for walking
                if (this.isDead()) {
                    this.playAnimation(endbossImagesDead);
                    setTimeout(() => {
                        this.speedY = 1;
                        this.applyGravity();
                        clearInterval(endbossDeadInterval)
                    }, 1000);
                } else if (this.isHurt()) {
                    this.playAnimation(endbossImagesHurt);
                } else {
                    this.playAnimation(endbossImagesAlert);
                }
            }, 200);
    }

    endbossAnimation() {
        let endbossAnimationInterval =
            setInterval(() => {
                if (isEndbossReached) {
                    this.applyGravity();
                    this.endboss_spawning_sound.play();
                    if (this.position_y > 60) {
                        isEndbossReached = false; //so that the character can move again
                        endbossStatusBar = true; //used in world for endboss healthBar
                        clearInterval(endbossAnimationInterval);
                        // this.test();
                        this.EndbossMusic();
                    }
                }
            }, 200);
    }

    EndbossMusic() {
        this.game_music_endboss.src = './audio/music_fast.mp3';
        this.game_music_endboss.autoplay = true;
        this.game_music_endboss.loop = true;
    }

    //hier kommen später die Laufattacken rein
    // test(){
    //     setInterval(() => {
    //         console.log('Enemy reached')
    //     }, 100);
    // }
}