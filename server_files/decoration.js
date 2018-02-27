var Decoration = (function(){
    function Decoration(game, x, y, sprite, col, inter, func){
        Phaser.Sprite.call(this, game, x, y, sprite);

        var collision = col;
        var interactive = inter;

        if(interactive){
            this.interact = func;
        }
    }
})();