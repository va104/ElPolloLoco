class Coin extends MovableObject {
    height = 130;
    width = 130;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    collidingOffset = {
        'top': 40,
        'right': 40,
        'bottom': 40,
        'left': 40,
    };
    coins_collect_sound = new Audio('./audio/collect-coins.mp3');
    newHP_sound = new Audio ('./audio/heartbeat.mp3')

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.position_x = (Math.random() * 2000);
        this.position_y = (Math.random() * 60);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 350);
    }

    collectCoins (i, arr ){
        this.coins_collect_sound.play();
        arr.splice(i, 1);
        world.statusBarCoin.countCoins++;
        // console.log(world.statusBarCoin.countCoins)
        // 5 coins == 1HP+
        if(world.statusBarCoin.countCoins == 5){
            world.statusBarHealth.countHP++;
            this.newHP_sound.play();
            world.statusBarCoin.countCoins = 0
        }
    }
}