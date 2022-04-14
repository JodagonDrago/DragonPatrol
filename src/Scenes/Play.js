class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('banner', './assets/banner.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
     
        // UI banner
        this.banner = this.add.tileSprite(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 'banner').setOrigin(0, 0);
    
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add rocket (p2)
        if(game.settings.player){
            console.log("detected");
            this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);
        }

        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
    
        // red borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xff3828).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xff3828).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xff3828).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xff3828).setOrigin(0, 0);
        //gold decal
        this.add.rectangle(0, 0, game.config.width, borderUISize/3, 0xb4a43c).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height, game.config.width, -borderUISize/3, 0xb4a43c).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize/3, game.config.height, 0xb4a43c).setOrigin(0, 0);
        this.add.rectangle(game.config.width, 0, -borderUISize/3, game.config.height, 0xb4a43c).setOrigin(0, 0);
        
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = {s: 0};
        // display score
        let scoreConfig = {
            fontFamily: 'Impact',
            fontSize: '28px',
            backgroundColor: '#cc44fc',
            color: '#e4acfc',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score.s, scoreConfig);

        // initialize score
        this.p2Score = {s: 0};
        let score2Config = {
            fontFamily: 'Impact',
            fontSize: '28px',
            backgroundColor: '#44d4fc',
            color: '#acecfc',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        if(game.settings.player){
            this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - score2Config.fixedWidth, borderUISize + borderPadding*2, this.p2Score.s, score2Config);
        }

        //start music
        music = this.sound.add('playing');
        music.setLoop(true);
        music.play();

        //Game Over flag
        this.gameOver  = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        if(game.settings.player){
            score2Config.fixedWidth = 0;
        }
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            music.stop();
        }

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver){
            // update rocket sprite
            this.p1Rocket.update();
            if(game.settings.player){
                this.p2Rocket.update();
            }
            // update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, this.p1Score, this.scoreLeft);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, this.p1Score, this.scoreLeft);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, this.p1Score, this.scoreLeft);
        }
        if(game.settings.player){
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03, this.p2Score, this.scoreRight);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02, this.p2Score, this.scoreRight);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01, this.p2Score, this.scoreRight);
            }   
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, playerScore, scoreSheet) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.on('animationcomplete', () => {    // callback after anim completes
          boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        playerScore.s += ship.points;
        scoreSheet.text = playerScore.s;
        this.sound.play('sfx_explosion'); 
      }
}