class Bottle extends MovableObject{
    position_y = 355;
    height = 70;
    width = 60;
    offset = 0;
    bottle_collect_sound = bottle_collect_sound;
    constructor(offset, image, x){
        super(); 
        this.img = image; 
        this.position_x = (Math.random() * 100) + x;
        this.offset = offset;
        this.setBottleOffset();
    }

    setBottleOffset(){
        if(this.offset == 1){
            this.setCollidingOffsetBottle(10, 10, 10, 20);
        }
        if(this.offset == 2){
            this.setCollidingOffsetBottle(10, 10, 10, 10)
        }
    }

    setCollidingOffsetBottle(top, right, bottom, left) {
        this.collidingOffset = {
            'top': top,
            'right': right,
            'bottom': bottom,
            'left': left,
        }
    }

    collectBottle (i, arr ){
        this.bottle_collect_sound.play();
        arr.splice(i, 1);
        world.statusBarBottle.countBottles++;
    }
}