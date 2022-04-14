//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue; //store pointValue
        this.moveSpeed = 3; //pixels per frame
        this.ticker = 0;
    }

    update(){
        //move spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left to right
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }

        //make ship randomly accelerate and decelerate
        this.ticker += 1;

        if (this.ticker == 50){
            this.ticker = 0;
            this.moveSpeed += Phaser.Math.Between(-1, 1);
            if(this.moveSpeed == 8){
                this.moveSpeed = 7;
            }
            if(this.moveSpeed == 0){
                this.moveSpeed = 1;
            }
        }
    }

    //reset position
    reset(){
        this.x = game.config.width;
    }
}