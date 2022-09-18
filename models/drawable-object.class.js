class DrawableObject {
    position_x = 120;
    position_y = 280;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        // not a current image in the DOM --> is used later
        this.img = new Image(); // this.img = document.getElementByID('image') <img id="image" src>
        this.img.src = path
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.position_x, this.position_y, this.width, this.height);
        } catch (error) {
            console.warn('Error loading image', error);
            console.log('Could not load', this)
        }
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png, 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    drawFrame(ctx) {
        if (this instanceof Character
            // || this instanceof Chicken 
            || this instanceof Bottle
            || this instanceof Coin
        ) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.position_x, this.position_y, this.width, this.height);
            ctx.stroke();



            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            if (this instanceof Character) {
                ctx.rect(
                    this.position_x + this.collidingOffset.left,
                    this.position_y + this.collidingOffset.top,
                    this.width - (this.collidingOffset.right * 2),
                    this.height - (this.collidingOffset.bottom * 3)
                );
            }
            if (this instanceof Coin || this instanceof Bottle) {
                ctx.rect(
                    this.position_x + this.collidingOffset.left,
                    this.position_y + this.collidingOffset.top,
                    this.width - (this.collidingOffset.right * 2),
                    this.height - (this.collidingOffset.bottom * 2)
                );
            }
        }
        ctx.stroke();
    }
}
