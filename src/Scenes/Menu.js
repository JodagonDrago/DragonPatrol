class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload() {
      // load audio
      this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
      this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
      this.load.audio('menu', './assets/menu.wav');
      this.load.audio('playing', './assets/playing.wav');
  }

    create(){
        //menu text configuration
        let menuConfig = {
            fontFamily: 'Corsiva',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let titleConfig = {
          fontFamily: 'Corsiva',
          fontSize: '64px',
          backgroundColor: '#a83232',
          color: '#fac116',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }

        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, 'Dragon Patrol', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3, 'Player 1: Use ←→ arrows to move & ↑ to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2.5, 'Player 2: Use A and D keys to move & W to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#9654ff';
        menuConfig.color = '#251b36';
        this.add.text(game.config.width/2, game.config.height/4.1, 'Controls', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Game Select', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#dea516';
        menuConfig.color = '#ffe79e';
        this.add.text(game.config.width/2, game.config.height/1.7 + borderUISize + borderPadding, 'Single Player: Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.5 + borderUISize + borderPadding, 'Two Player: Press ↑ for Novice or ↓ for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //start music
        music = this.sound.add('menu');
        music.setLoop(true);
        music.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            player: false    
          }
          music.stop();
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            player: false
          }
          music.stop();
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            player: true    
          }
          music.stop();
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,
            player: true
          }
          music.stop();
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}