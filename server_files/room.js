var Room = (function(){
    function Room(game, file){
        this.properties = game.cache.getJSON(file);
        //console.log(this.properties.background.file);
        this.background = game.add.image(64, 128, this.properties.background.file);
        this.doors = [];
        this.properties.doors.forEach(e => {
            console.log("Door" ,e);
            this.doors.push(new Door(game, e.x >= 0 ? e.x : game.world.width + e.x, e.y >= 0 ? e.y : game.world.height + e.y, e.sprite, e.room));
            console.log(e.sprite);
        });
    }

    this.leave = function(door){
        //Destroy sprite/groups
        return door.room;
    }

    Room.prototype.constructor = Room;

    return Room;
})();