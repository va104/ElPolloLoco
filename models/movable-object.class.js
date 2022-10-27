class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0; //Geschwindigkeit
    acceleration = 2.5; //Beschleunigung
    isAboveOffset = 150;
    hpObject = 10;
    lastHit = 0;
    chickenisDead = false;
    chickenisHit = false;
    collidingOffset = {
        'top': 0,
        'right': 0,
        'bottom': 0,
        'left': 0,
    }

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
        return setStoppapleInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.position_y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
            return this.position_y <= this.isAboveOffset;
    }

    jump() {
        this.speedY = 30;
    }

    
    hit() {
        this.hpObject--;
        if (this.hpObject < 0) {
            this.hpObject = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.hpObject == 0;
    }
    
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Diff in ms
        timepassed = timepassed / 1000 // Diff in sec
        return timepassed < 1
    }

    isColliding(obj) {
        return (this.position_x + this.width - this.collidingOffset.right) >= (obj.position_x + obj.collidingOffset.left)
            && (this.position_x + this.collidingOffset.left) <= (obj.position_x + obj.width - obj.collidingOffset.right)
            && (this.position_y + this.collidingOffset.top) <= (obj.position_y + obj.height - obj.collidingOffset.bottom)
            && (this.position_y + this.height - this.collidingOffset.bottom) >= (obj.position_y + obj.collidingOffset.top)
        // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    jumpOnChicken(obj) {
        return (this.position_x + this.width - this.collidingOffset.right) >= (obj.position_x + obj.collidingOffset.left)
            && (this.position_x + this.collidingOffset.left) <= (obj.position_x + obj.width - obj.collidingOffset.right)
            && (this.position_y + this.collidingOffset.top) <= (obj.position_y + obj.height - obj.collidingOffset.bottom)
            && ((this.position_y + this.height - this.collidingOffset.bottom) >= (obj.position_y - 10 + obj.collidingOffset.top)
                && (this.position_y + this.height - this.collidingOffset.bottom) <= (obj.position_y + 10 + obj.collidingOffset.top))
            && this.speedY < 0 // otherwise Pepe kills the chicken while he is hit an jumps in the air
    }

    deleteObject(i, arr) {
        arr.splice(i, 1);
    }

    randomIntFromInterval(min, max) {
        return (Math.random() * (max - min + 1) + min);
      }

      resetChickenHit(){
        setTimeout(() => {
            this.chickenisHit = false;
        }, 2000);
    }
}