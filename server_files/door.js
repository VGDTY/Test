var Door = (function(){
    function Door(game, x, y, sprite, room){
        Phaser.Sprite.call(this, game, x, y, sprite);
        console.log(x, y, sprite, room);
        //game.add.image(x, y, sprite);
        console.log(sprite);
        game.physics.arcade.enable(this);
        this.collision = function(obj){

        }
    }

    Door.prototype = Object.create(Phaser.Sprite.prototype);

    Door.prototype.constructor = Door;

    return Door;
})();