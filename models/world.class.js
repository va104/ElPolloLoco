class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    
    constructor(canvas, keyboard) {
        // with ctx it`s possible to invoke other functions
        this.ctx = canvas.getContext('2d');
        //we dont have the width and the hight of the canvas, so we need a new variable
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    // Methods
    setWorld(){
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.backgroundObjects)
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.clouds)
        this.addObjectsToMap(this.level.enemies)

        this.ctx.translate(-this.camera_x, 0)
        
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
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            // x-Coordiante got mirrored
            mo.position_x = mo.position_x * -1
        }
        this.ctx.drawImage(mo.img, mo.position_x, mo.position_y, mo.width, mo.height);
        
        if(mo.otherDirection) {
            this.ctx.restore();
            mo.position_x = mo.position_x * -1
        }
    }
}

