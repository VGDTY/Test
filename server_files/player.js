var Player = (function(){
    function Player(game, x, y){
        Phaser.Sprite.call(this, game, x, y, 'dude');
        
        this.scale.setTo(2, 2);

        this.animations.add('left', [0, 1, 2, 3], 10, true);
        this.animations.add('right', [5, 6, 7, 8], 10, true);
        this.animations.add('up', [4], 10, true);
        this.animations.add('down', [4], 10, true);

        game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;

        this.dir_x = 0;
        this.dir_y = 0;
        this.velocity = 280;

        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.last = 0;

        this.collision = function (obj){
            if (obj.hasOwnProperty('body')){
                this.up = this.body.y - obj.body.y < 0;
                this.down = this.body.y - obj.body.y > 0;
                this.right = this.body.x - obj.body.x < 0;
                this.left = this.body.x - obj.body.x > 0;
            }
            /*
            console.log("up, down, right, left")
            console.log(this.up);
            console.log(this.down);
            console.log(this.right);
            console.log(this.left);
            //*/
        }

        this.move = function (dir){
            //console.log(dir);
            switch(dir){
                case 'up':
                    this.dir_y = -1;
                    break;
                case 'down':
                    this.dir_y = 1;
                    break;
                case 'left':
                    this.dir_x = -1;
                    break;
                case 'right':
                    this.dir_x = 1;
                    break;
                case 'y':
                    this.dir_y = 0
                    break;
                case 'x':
                    this.dir_x = 0
                    break;
            }
            switch(this.dir_x){
                case -1:
                    if (!this.left){
                        this.animations.play('left');
                        this.last = -4;
                    } else {
                        this.dir_x = 0;
                    }
                    break;
                case 1:
                    if (!this.right){
                        this.animations.play('right');
                        this.last = 1;
                    } else {
                        this.dir_x = 0;
                    }
                    break;
                default:
                    switch(this.dir_y){
                        case -1:
                            if (!this.down){
                                this.animations.play('down');
                                this.last = 0;
                            } else {
                                this.dir_y = 0;
                            }
                            break;
                        case 1:
                            if (!this.up){
                                this.animations.play('up');
                                this.last = 0;
                            } else {
                                this.dir_y = 0;
                            }
                            break;
                    }
            }
            if (this.dir_x == 0 && this.dir_y == 0){
                this.animations.stop();
                this.frame = 4 + this.last;
            }

            this.body.velocity.y = this.dir_y*this.velocity;
            this.body.velocity.x = this.dir_x*this.velocity;

            this.up = false;
            this.down = false;
            this.right = false;
            this.left = false;
        }
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);

    Player.prototype.constructor = Player;

    return Player;
    
})();