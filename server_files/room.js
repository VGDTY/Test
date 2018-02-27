var Room = (function(){
    function Room(game, file){
        this.properties = game.cache.getJSON(file);
        //console.log(this.properties.background.file);
        this.background = game.add.image(64, 128, this.properties.background.file);
        this.doors = [];
        this.properties.doors.forEach(element => {
            console.log("Door" ,element);
            this.doors.push(new Door(game, element.x >= 0 ? element.x : game.world.width - element.x, element.y >= 0 ? element.y : game.world.height - element.y, element.sprite, element.room));
            console.log(element.sprite);
        });
    }

    this.leave = function(door){
        //Destroy sprite/groups
        return door.room;
    }

    Room.prototype.constructor = Room;

    return Room;
})();