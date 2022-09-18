class StatusBarCoin extends StaticObject {
    countCoins = 0;

    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
        this.position_x = 130;
        this.position_y = 3;
        this.width = 70;
        this.height = 70;
    }
}
