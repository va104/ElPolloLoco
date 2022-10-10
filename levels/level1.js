let level1;

function initLevel1 () {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], -719),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/2.png'], -719),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/2.png'], -719),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/2.png'], -719),
    
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], 0),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/1.png'], 0),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/1.png'], 0),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/1.png'], 0),
    
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], 719),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/2.png'], 719),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/2.png'], 719),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/2.png'], 719),
    
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], 719 * 2),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/1.png'], 719 * 2),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/1.png'], 719 * 2),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/1.png'], 719 * 2),
            
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], 719 * 3),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/2.png'], 719 * 3),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/2.png'], 719 * 3),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/2.png'], 719 * 3),
    
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], 719 * 4),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/1.png'], 719 * 4),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/1.png'], 719 * 4),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/1.png'], 719 * 4),
    
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], 719 * 5),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/2.png'], 719 * 5),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/2.png'], 719 * 5),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/2.png'], 719 * 5),
    
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], 719 * 6),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/1.png'], 719 * 6),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/1.png'], 719 * 6),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/1.png'], 719 * 6),
    
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/air.png'], 719 * 7),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/3_third_layer/2.png'], 719 * 7),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/2_second_layer/2.png'], 719 * 7),
            new BackgroundObject(backgroundImagesCache['img/5_background/layers/1_first_layer/2.png'], 719 * 7),
        ],
        [
            new Bottle(1, bottleImagesCache['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'], 500), 
            new Bottle(1, bottleImagesCache['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'], 650), 
            new Bottle(1, bottleImagesCache['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'], 800), 
            new Bottle(1, bottleImagesCache['img/6_salsa_bottle/1_salsa_bottle_on_ground.png'], 850), 
            new Bottle(2, bottleImagesCache['img/6_salsa_bottle/2_salsa_bottle_on_ground.png'], 1000), 
            new Bottle(2, bottleImagesCache['img/6_salsa_bottle/2_salsa_bottle_on_ground.png'], 1200), 
            new Bottle(2, bottleImagesCache['img/6_salsa_bottle/2_salsa_bottle_on_ground.png'], 1300), 
            new Bottle(2, bottleImagesCache['img/6_salsa_bottle/2_salsa_bottle_on_ground.png'], 1600), 
            new Bottle(2, bottleImagesCache['img/6_salsa_bottle/2_salsa_bottle_on_ground.png'], 1800), 
            new Bottle(2, bottleImagesCache['img/6_salsa_bottle/2_salsa_bottle_on_ground.png'], 2000), 
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ]
    );
} 