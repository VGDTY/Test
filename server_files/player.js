var Player = (function(){
    function Player(game, x, y){
        Phaser.Sprite.call(this, game, x, y, 'dude');
        //console.log(x, y);
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

        this.mup = false;
        this.mdown = false;
        this.mright = false;
        this.mleft = false;
        this.last = 0;

        this.collision = function (obj){
            if (obj instanceof Door){
                console.log(obj);
            }
            if (obj.hasOwnProperty('body')){
                this.mup = this.body.y - obj.body.y < 0;
                this.mdown = this.body.y - obj.body.y > 0;
                this.mright = this.body.x - obj.body.x < 0;
                this.mleft = this.body.x - obj.body.x > 0;
            }
            //console.log("Collide");
            /*
            console.log("up, down, right, left")
            console.log(this.mup);
            console.log(this.mdown);
            console.log(this.mright);
            console.log(this.mleft);
            //*/
        }

        this.move = function (dir){
            //console.log(this.mright, this.mleft);
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
                    if (!this.mleft){
                        this.animations.play('left');
                        this.last = -4;
                    } else {
                        this.dir_x = 0;
                    }
                    break;
                case 1:                    
                    if (!this.mright){
                        this.animations.play('right');
                        this.last = 1;
                    } else {
                        this.dir_x = 0;
                    }
                    break;
                default:
                    switch(this.dir_y){
                        case -1:
                            if (!this.mdown){
                                this.animations.play('down');
                                this.last = 0;
                            } else {
                                this.dir_y = 0;
                            }
                            break;
                        case 1:
                            if (!this.mup){
                                this.animations.play('up');
                                this.last = 0;
                            } else {
                                this.dir_y = 0;
                            }
                            break;
                    }
            }
            if (this.dir_x == 0 && this.dir_y == 0){
                this.frame = 4 + this.last;
                this.animations.stop();
            }

            this.body.velocity.y = this.dir_y*this.velocity;
            this.body.velocity.x = this.dir_x*this.velocity;

            this.mup = false;
            this.mdown = false;
            this.mright = false;
            this.mleft = false;
        }
        //console.log(this);
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);

    Player.prototype.constructor = Player;

    return Player;
    
})();