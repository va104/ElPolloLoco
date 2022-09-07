class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ];
    backgroundObject = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 400),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 400),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 400),
    ]
    canvas;
    ctx;
    
    constructor(canvas) {
        // with ctx it`s possible to invoke other functions
        this.ctx = canvas.getContext('2d');
        //we dont have the width and the hight of the canvas, so we need a new variable
        this.canvas = canvas;
        this.draw();
    }

    // Methods
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObject)
        this.addToMap(this.character)
        this.addObjectsToMap(this.enemies)
        this.addObjectsToMap(this.clouds)
        
        let self = this;
        // draw is invoked frequently
        requestAnimationFrame(() => {
            self.draw()
        })
    }

    addObjectsToMap(object) {
        object.forEach(o =>{
            this.addToMap(o)
        })
    }
    
    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.position_x, mo.position_y, mo.width, mo.height);
    }
}

