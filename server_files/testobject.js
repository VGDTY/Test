var test = (function(){
    function test(game){
        Phaser.Sprite.call(this, game, 200, 200, 'door1');
    }

    test.prototype = Object.create(Phaser.Sprite.prototype);

    test.prototype.constructor = test;
})();