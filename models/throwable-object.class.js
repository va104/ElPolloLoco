class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
     'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
     'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
     'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
     'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',  
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',  
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',  
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',  
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',  
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',  
    ];
    throwing_sound = new Audio ('./audio/throw.mp3')

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH)
        this.position_x = x;
        this.position_y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw() {
        this.throwing_sound.play();
        this.speedY = 15;
        this.applyGravity()
    }
    
    animate() {
        setInterval(() => {
            if(!this.chickenisDead) {
                this.playAnimation(this.IMAGES_ROTATION)
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            }
        }, 100);
    }
}