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

// Joseph Squires, Dragon Patrol, 4/14/2022, 6 hours to complete
// 60 points: Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
// 30 points: Implement a simultaneous two-player mode
// 5 points: Add your own (copyright-free) background music to the Play scene
// #FACADE: Made rockets randomly increase and decrease their speeds during gameplay (cannot reach 0 or go above 7)