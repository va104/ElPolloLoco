class Endboss extends MovableObject {
    height = 400;
    width = 250;
    position_y = -460;
    game_music_endboss = document.createElement("audio");
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    collidingOffset = {
        'top': 140,
        'right': 40,
        'bottom': 80,
        'left': 60,
    };
    hitChicken = new Audio('./audio/hit_endboss.mp3');
    endboss_spawning_sound = new Audio('./audio/spawn_endboss.mp3')

    constructor() {
        super().loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
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
                    this.playAnimation(this.IMAGES_DEAD);
                    setTimeout(() => {
                        this.speedY = 1;
                        this.applyGravity();
                        clearInterval(endbossDeadInterval)
                    }, 1000);
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                } else {
                    this.playAnimation(this.IMAGES_ALERT);
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
                        // this.EndbossMusic();
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