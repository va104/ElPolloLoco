class Bottle extends MovableObject{
    position_y = 355;
    height = 70;
    width = 60;
    offset = 0;
    bottle_collect_sound = new Audio('./audio/bottles.mp3')

    constructor(offset, image, x){
        super().loadImage(image);
        this.position_x = (Math.random() * 100) + x;
        this.offset = offset;
        this.setCollidingOffsetBottle();
    }

    setCollidingOffsetBottle(){
        if(this.offset == 1){
            this.collidingOffset = {
                'top': 10,
                'right': 10,
                'bottom': 10,
                'left': 20,
            }
        }
        if(this.offset == 2){
            this.collidingOffset = {
                'top': 10,
                'right': 10,
                'bottom': 10,
                'left': 10,
            }
        }
    }

    collectBottle (i, arr ){
        this.bottle_collect_sound.play();
        arr.splice(i, 1);
        world.statusBarBottle.countBottles++;
    }
}