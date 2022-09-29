class StatusBarHealth extends StaticObject{
    countHP = 5;

    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.position_x = 20;
        this.position_y = 0;
        this.width = 70;
        this.height = 70;
    }
}