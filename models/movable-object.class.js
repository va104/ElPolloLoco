class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0; //Geschwindigkeit
    acceleration = 2.5; //Beschleunigung
    hpObject = 5;
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

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.position_y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof Chicken) {
            // without this condition the object doesn´t stop falling
            //später beim Aufräumen Funktionen bauen, die einen Offset für die Positionen mitgeben, dann muss immer nur eine Funktion aufgerufen werden
            return (this.position_y > 500 ? false : true)
        }
        if (this instanceof ThrowableObject) {
            if (this.chickenisDead) {
                //for splashing animation
                this.position_y = 340;
                return false
                // stop falling
            } else if (this.position_y > 500) {
                return false
            } else {
                //check the direction for throwing
                return this.throwingDirection();
            }
        }
        if (this instanceof Endboss) {
            return this.position_y < 60;
        }
        else {
            return this.position_y < 150;
        }
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(obj) {
        return (this.position_x + this.width - this.collidingOffset.right) >= (obj.position_x + obj.collidingOffset.left)
            && (this.position_y + this.height - this.collidingOffset.bottom) >= (obj.position_y + obj.collidingOffset.right)
            && (this.position_x + this.collidingOffset.left) <= (obj.position_x + obj.width - obj.collidingOffset.right)
            && (this.position_y + this.collidingOffset.top) <= (obj.position_y + obj.height - obj.collidingOffset.bottom)
        // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        this.hpObject -= 1;
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

    jumpOnChicken(obj) {
        return (this.position_x + this.width - this.collidingOffset.right) >= (obj.position_x + obj.collidingOffset.left)
            && (this.position_x + this.collidingOffset.left) <= (obj.position_x + obj.width - obj.collidingOffset.right)
            && (this.position_y + this.collidingOffset.top) <= (obj.position_y + obj.height - obj.collidingOffset.bottom)
            && ((this.position_y + this.height - this.collidingOffset.bottom) >= obj.position_y - 10
                && (this.position_y + this.height - this.collidingOffset.bottom) <= obj.position_y + 10)
            && this.speedY < 0 // otherwise Pepe kills the chicken while he is hit an jumps in the air
    }

    deleteObject(i, arr) {
        arr.splice(i, 1);
    }
}