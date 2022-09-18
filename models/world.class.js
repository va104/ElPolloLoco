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
    throwableObjects = [];

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

    // for accessing the character 
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 150);

        setInterval(() => {
            this.checkCollisionTopOfChicken()
        }, 10);

        setInterval(() => {
            this.checkCollisionsEnemys();
        }, 300);
    }

    checkCollisionTopOfChicken(){
        this.level.enemies.forEach((enemy, i, arr) => {
            this.character.deadChicken(enemy, i, arr);
        });
    }

    checkCollisionsEnemys() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.countHP--;
                if(this.statusBarHealth.countHP <= 0){
                    this.statusBarHealth.countHP = 0;
                }
            }
        });
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
        if (this.keyboard.D && (this.statusBarBottle.countBottles > 0)) {
            let bottle = new ThrowableObject(this.character.position_x + 100, this.character.position_y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.countBottles--;
        }
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
        this.ctx.translate(this.camera_x, 0); // Forwards


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

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
        mo.drawFrame(this.ctx);

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

