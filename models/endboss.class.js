class Endboss extends MovableObject {
    height = 400;
    width = 250;
    position_y = -460;
    game_music_endboss = document.createElement("audio");
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',

    ];
    collidingOffset = {
        'top': 140,
        'right': 40,
        'bottom': 80,
        'left': 60,
    };
    hitChicken = new Audio('./audio/hit_endboss.mp3');
    endboss_spawning_sound = new Audio ('./audio/spawn_endboss.mp3')

    constructor() {
        super().loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.position_x = 1000;
        this.animate();
        this.endbossAnimation();
        this.acceleration = 0.01;
    }

    animate() {
        setInterval(() => {
            if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
            } else{
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    endbossAnimation(){
        let endbossAnimationInterval = 
        setInterval(() => {
            if (isEndbossReached) {
                this.applyGravity();
                this.endboss_spawning_sound.play();
                if(this.position_y > 60) {
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