class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    bottleInAir = false; 

    font = new FontFace('ranchers', 'url(fonts/ranchers-regular.ttf)');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        //we dont have the width and the hight of the canvas, so we need a new variable
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

        this.font.load().then(function (loadedFace) {
            document.fonts.add(loadedFace);
            //do something after the font is loaded
            document.fonts.add(loadedFace);
        }).catch(function (error) {
            // error occurred
        });
    }

    // for accessing the world in the character
    setWorld() {
        this.character.world = this;
    }

    run() {
        setStoppapleInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 150);

        setStoppapleInterval(() => {
            this.checkCollisionsEnemys();
        }, 1000 / 60);
    }

    checkCollisionsEnemys() {
        this.level.enemies.forEach((enemy, i, arr) => {
            if (this.character.jumpOnChicken(enemy)) {
                return enemy instanceof Endboss ? this.damageEndboss(enemy) : this.damageChicken(enemy);
            } else if (enemy.position_y > 500) {
                enemy.deleteObject(i, arr);
            } else if (!enemy.chickenisDead && this.character.isColliding(enemy) && !this.character.isHurt()) {
                this.character.hit();
                this.reduceStatusBar(this.statusBarHealth);
            }
        })
    }

    damageEndboss(enemy) {
        this.character.jump();
        this.singleEndbossDamages(enemy);
    }

    damageChicken(enemy) {
        enemy.chickenisDead = true;
        enemy.hitChicken.play();
        this.character.jump();
    }

    bottleHitsEndboss(enemy, bottle){
        bottle.chickenisDead = true;
        this.singleEndbossDamages(enemy);
    }

    singleEndbossDamages(enemy) {
        enemy.hit();
        enemy.chickenisHit = true;
        enemy.resetChickenHit();
        enemy.hitChicken.play();
        this.reduceStatusBar(this.statusBarEndboss);
    }


    checkCollisions() {
        this.level.bottles.forEach((bottle, i, arr) => {
            if (this.character.isColliding(bottle)) {
                bottle.collectBottle(i, arr);
            }
        });

        this.level.coins.forEach((coins, i, arr) => {
            if (this.character.isColliding(coins)) {
                coins.collectCoins(i, arr);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && (this.statusBarBottle.countBottles > 0) && !this.character.otherDirection && !pauseGame && !this.bottleInAir) {
            this.bottleInAir = !this.bottleInAir;
            const bottle = new ThrowableObject(this.character.position_x + 100, this.character.position_y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.countBottles--;
            this.checkCollisionBottleEnemy(bottle);
        }
    }

    checkCollisionBottleEnemy(bottle) {
        const indexOfThrownBottle = this.throwableObjects.length - 1;
        const deleteBottle = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && enemy instanceof Endboss && !enemy.isHurt()) {
                    this.bottleHitsEndboss(enemy, bottle);
                    this.deleteBottleAfterHit(bottle, indexOfThrownBottle, deleteBottle)
                }
                else if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
                    this.bottleHitsChicken(enemy, bottle);
                    this.deleteBottleAfterHit(bottle, indexOfThrownBottle, deleteBottle)
                }
            })
        }, 100);
        setTimeout(() => {
            this.bottleInAir = !this.bottleInAir; 
        }, 1000);
    }

    bottleHitsChicken(enemy, bottle){
        enemy.chickenisDead = true;
        bottle.chickenisDead = true;
        hitChicken.play();
    }
    

    reduceStatusBar(statusBar){
        if (!isEndbossReached) {
            statusBar.countHP--;
        }
        if (statusBar.countHP <= 0) {
            statusBar.countHP = 0;
        }
    }

    deleteBottleAfterHit(bottle, indexOfThrownBottle, deleteBottle){
        setTimeout(() => {
            bottle.deleteObject(indexOfThrownBottle, this.throwableObjects);
            clearInterval(deleteBottle);
        }, 600);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Back
        // -------- Space for fixed objects ------------
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        //for the statusbars 
        this.ctx.font = '36px ranchers';
        this.ctx.fillStyle = "#FFFFFF"
        this.ctx.fillText(this.statusBarHealth.countHP, 90, 55);
        this.ctx.fillText(this.statusBarCoin.countCoins, 200, 55);
        this.ctx.fillText(this.statusBarBottle.countBottles, 305, 55);
        if(endbossStatusBar){
            this.addToMap(this.statusBarEndboss);
            this.ctx.fillText(this.statusBarEndboss.countHP, 590, 70);
        }
        this.ctx.translate(this.camera_x, 0); // Forwards


        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        // draw is invoked frequently
        requestAnimationFrame(() => {
            self.draw()
        })
    }

    addObjectsToMap(object) {
        object.forEach(o => {
            this.addToMap(o)
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        // x-Coordiante got mirrored
        mo.position_x = mo.position_x * -1
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.position_x = mo.position_x * -1
    }
}

