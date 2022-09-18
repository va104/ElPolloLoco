class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
     'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
     'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
     'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
     'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.position_x = x;
        this.position_y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.position_x += 10;
        }, 25);
    }
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATION)
        }, 100);
    }
}