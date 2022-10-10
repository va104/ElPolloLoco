class ThrowableObject extends MovableObject {
    position_x_otherDirection = 100;
    throwing_sound = throwing_sound;

    constructor(x, y) {
        super();
        this.imageCache = bottleImagesCache;
        this.img = bottleImagesCache['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];
        this.position_x = x;
        this.position_y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
    }

    throw() {
        if (!pauseGame) {    
            if(world.character.otherDirection){
                //offset for throwing to the left side
                this.position_x -= this.position_x_otherDirection;
            }
            this.throwing_sound.play();
            this.speedY = 15;
            this.applyGravity()
        }
    }

    animate() {
        setInterval(() => {
            if (!pauseGame) {            
                if (!this.chickenisDead) {
                    this.playAnimation(bottleImagesRotation)
                } else {
                    this.playAnimation(bottleImagesSplash);
                }
            }
        }, 100);
    }

    throwingDirection() {
        if (!pauseGame) {  
            if (world.character.otherDirection) {
                this.position_x -= 14;
            } else {
                this.position_x += 14;
            }
            return true
        }
    }
}