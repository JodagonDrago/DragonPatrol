let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config)

// reserve keyboard vars
let keyA, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyD, keyW;

//reserve music var
let music;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;