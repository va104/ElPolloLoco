class StatusBarCoin extends StaticObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];   

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.position_x = 240;
        this.position_y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
}
