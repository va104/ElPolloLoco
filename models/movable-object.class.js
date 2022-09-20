class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0; //Geschwindigkeit
    acceleration = 2.5; //Beschleunigung
    hpCharacter = 10;
    lastHit = 0;
    chickenisDead = false;
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

    playJumpAnimation(images) {
        // console.log(this.speedY)   
        if (this.speedY <= 30 && this.speedY > 20) {
            this.jumpingImage(images[0])
        }
        else if (this.speedY <= 20 && this.speedY > 10) {
            this.jumpingImage(images[1])
        }
        else if (this.speedY <= 10 && this.speedY > 0) {
            this.jumpingImage(images[2])
        }
        else if (this.speedY <= 0 && this.speedY > -7.5) {
            this.jumpingImage(images[3])
        }
        else if (this.speedY <= -7.5 && this.speedY > -15) {
            this.jumpingImage(images[4])
        }
        else if (this.speedY <= -15 && this.speedY > -22.5) {
            this.jumpingImage(images[5])
        }
        else if (this.speedY <= -22.5 && this.speedY > -30) {
            this.jumpingImage(images[6])
        }
        else if (this.speedY < -30) {
            this.jumpingImage(images[7])
        }
    };

    jumpingImage(image) {
        this.img = this.imageCache[image];
    }

    applyGravity() {
        try {
            setInterval(() => {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.position_y -= this.speedY;
                    this.speedY -= this.acceleration;
                    // console.log('nach: pos y = ', this.position_y, 'speedy = ', this.speedY, 'Beschleunigung: ', this.acceleration)
                }
            }, 1000 / 25);
        } catch (error) {
            console.log('Fehler')
        }
    }

    isAboveGround() {
        if (this instanceof ThrowableObject || this instanceof Chicken) { //Throwable object should always fall
            // without this condition the object doesn´t stop falling
            if (this.position_y > 500) {
                return false
            } else {
                return true
            }
        } else {
            return this.position_y < 150;
        }
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(obj) {
        return (this.position_x + this.width - this.collidingOffset.right) >= obj.position_x
            && (this.position_y + this.height - this.collidingOffset.bottom) >= obj.position_y
            && (this.position_x + this.collidingOffset.left) <= (obj.position_x + obj.width)
            && (this.position_y + this.collidingOffset.top) <= (obj.position_y + obj.height)
        // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        this.hpCharacter -= 0.1;
        if (this.hpCharacter < 0) {
            this.hpCharacter = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.hpCharacter == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Diff in ms
        timepassed = timepassed / 1000 // Diff in sec
        return timepassed < 0.5
    }

    jumpOnChicken(obj, i, arr) {
        return (this.position_x + this.width - this.collidingOffset.right) >= obj.position_x
            // && (this.position_y + this.height - this.collidingOffset.bottom) >= obj.position_y
            && (this.position_x + this.collidingOffset.left) <= (obj.position_x + obj.width)
            && (this.position_y + this.collidingOffset.top) <= (obj.position_y + obj.height)
            && ((this.position_y + this.height - this.collidingOffset.bottom) >= obj.position_y - 10
            && (this.position_y + this.height - this.collidingOffset.bottom) <= obj.position_y + 10)
            && this.speedY < 0 // otherwise Pepe kills the chicken while he is hit an jumps in the air

        // arr.splice(i, 1);
    }

}