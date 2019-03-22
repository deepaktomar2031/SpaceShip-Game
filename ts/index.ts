///<reference path="../tsd/phaser.d.ts" />
///<reference path="GameState.ts" />

namespace ingenuity.game {
    let game = new Phaser.Game(800,600, Phaser.AUTO, "gameContainer");
    game.state.add("game", new GameState(), true);
}