
var game = new Phaser.Game(800, 640, Phaser.AUTO, '', {preload: preload, create: create, update: update });

function preload(){
    game.load.image('background', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48, 9);
}
var player;
var player_moving = false;

var border;
var stars;

var score = 0;
var scoreText;

var time = 1;
var deltaT = 500; //ms

var cursors;

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    border = game.add.group();
    border.enableBody = true;

    var bottom = border.create(0, 0, 'ground');
    bottom.scale.setTo(2, 2);
    bottom.body.immovable = true;

    var top = border.create(0, game.world.height - 64, 'ground');
    top.scale.setTo(2, 2);
    top.body.immovable = true;

    var left = border.create(-336, 0, 'ground');
    left.scale.setTo(1, 20);
    left.body.immovable = true;

    var right = border.create(game.world.width - 64, 0, 'ground');
    right.scale.setTo(1, 20);
    right.body.immovable = true;

    player = game.add.sprite(64, game.world.height - 112, 'dude');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 21; i++){
        for (var j = 0; j < 10; j++){
            if (getRandomInt(0, 2) == 1){
                var star = stars.create(i * 32 + 64 + 4, j * 48 + 64 + 8, 'star');
            }
        }
    }

    scoreText = game.add.text(16, 8, '', {fontsize: '32px', fill: '#000'});

    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();
    //setTimeout(framerate, deltaT);
}

function update(){
    //score++;

    var hitPlatform = game.physics.arcade.collide(player, border);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    if (cursors.up.isDown) {
        player.body.velocity.y = -160;
    } else if (cursors.down.isDown) {
        player.body.velocity.y = 160;
    } else {
        player.body.velocity.y = 0;
    }
    if (cursors.right.isDown) {
        player.body.velocity.x = 160;
        player.animations.play('right');
    } else if (cursors.left.isDown) {
        player.animations.play('left');
        player.body.velocity.x = -160;
    } else {
        player.body.velocity.x = 0;
    }
    if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
        player.animations.stop();
        player.frame = 4;
    }
}

function collectStar (player, star) {
    star.kill();

    score += 10;
    scoreText.text = 'Score: ' + score;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function framerate(){
    scoreText.text = String((score*1000)/(time*deltaT));
    time++;
    setTimeout(framerate, deltaT);
}