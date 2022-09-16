class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0; //Geschwindigkeit
    acceleration = 2.5; //Beschleunigung
    energy = 100; //Prozent
    lastHit = 0;

    moveRight() {
        this.position_x += this.speed;
    }

    moveLeft() {
        this.position_x -= this.speed;
    };

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.position_y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable object should always fall
            return true
        } else {
            return this.position_y < 180;
        }
    }

    jump() {
        this.speedY = 30;
    }

    // character.isColliding(chicken) --> check if chicken is colliding with character
    // isColliding(obj) {
    //     return (this.position_x + this.width) >= obj.position_x && this.position_x <= (obj.position_x + obj.width) &&
    //         (this.position_y + this.offsetY + this.height) >= obj.position_y &&
    //         (this.position_y + this.offsetY) <= (obj.position_y + obj.height) 
    //         // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

    isColliding(mo) {
        return this.position_x + this.width > mo.position_x &&
            this.position_y + this.height > mo.position_y &&
            this.position_x < mo.position_x &&
            this.position_y < mo.position_y + mo.height
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Diff in ms
        timepassed = timepassed / 1000 // Diff in sec
        return timepassed < 1 //true if we were hit in the last 5 seconds
    }
}