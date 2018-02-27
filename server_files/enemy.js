var Enemy = (function(){
    function Enemy(game, x, y, sprite, health, defense, attacks){
        Phaser.Sprite.call(this, game, x, y, sprite);
        game.physics.arcade.enable(this);
        var HP = health;
        var DEF = defense;
        var special = attacks;
    }
})();