var Door = (function(){
    function Door(game, x, y, sprite, room){
        console.log(x, y, sprite, room);
        Phaser.Sprite.call(this, game, x, y, sprite);
        game.physics.arcade.enable(this);
        this.collision = function(obj){

        }
    }

    Door.prototype = Object.create(Phaser.Sprite.prototype);

    Door.prototype.constructor = Door;

    return Door;
})();