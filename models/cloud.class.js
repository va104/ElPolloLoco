class Cloud extends MovableObject{
    position_y = 50;
    height = 250;
    width = 500;

    constructor() {
        // super() is just needed for methods but nut for properties
        super();
        this.img = cloudImagesCache['img/5_background/layers/4_clouds/1.png'];
        this.position_x = Math.random() * 500; // Number between 200 and 700;
        this.animate();
    }

    animate(){
        setInterval(() => {
            if (!pauseGame) {
                this.moveLeft();
            }
        }, 1000/60);
    };
}