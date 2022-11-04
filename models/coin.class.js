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

    constructor(posX, posY) {
        super();
        this.img = coinImagesCache['img/8_coin/coin_1.png'];
        this.imageCache = coinImagesCache;
        this.animate();
        this.setCoinPosition(posX, posY)
    }

    animate() {
        setStoppapleInterval(() => {
            if (!pauseGame) {
                this.playAnimation(coinImages);          
            }
        }, 350);
    }

    setCoinPosition(posX, posY) {
        return posX && posY ? this.setFixedCoinPosition(posX, posY) : this.setRandomCoinPosition();
    };

    setFixedCoinPosition(posX, posY) {
        this.position_x = posX;
        this.position_y = posY;
    }

    setRandomCoinPosition() {
        this.position_x = this.randomIntFromInterval(200, 4000);
        this.position_y = this.randomIntFromInterval(1, 60);   
    }

    collectCoins (i, arr ){
        this.coins_collect_sound.play();
        arr.splice(i, 1);
        world.statusBarCoin.countCoins++;
        if(world.statusBarCoin.countCoins == 5){
            world.statusBarHealth.countHP++;
            this.newHP_sound.play();
            world.character.hpObject++;
            world.statusBarCoin.countCoins = 0
        }
    }
}