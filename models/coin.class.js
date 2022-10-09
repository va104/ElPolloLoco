class Coin extends MovableObject {
    height = 130;
    width = 130;
    collidingOffset = {
        'top': 40,
        'right': 40,
        'bottom': 40,
        'left': 40,
    };
    coins_collect_sound = coins_collect_sound;
    newHP_sound = newHP_sound;

    constructor() {
        super();
        this.img = coinImagesCache['img/8_coin/coin_1.png'];
        this.imageCache = coinImagesCache;
        this.position_x = (Math.random() * 2000);
        this.position_y = (Math.random() * 60);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(coinImages);
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
            world.character.hpObject++;
            world.statusBarCoin.countCoins = 0
        }
    }
}