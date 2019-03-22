"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ingenuity;
(function (ingenuity) {
    var game;
    (function (game_1) {
        var Ship = (function (_super) {
            __extends(Ship, _super);
            function Ship(game, x, y, key, frame) {
                var _this = _super.call(this, game, x, y, key, frame) || this;
                _this.anchor.set(1, 0.5);
                _this.cursorKeys = _this.game.input.keyboard.createCursorKeys();
                _this.speed = 8;
                _this.lazers = _this.game.add.group(_this.game.world, "Lazers");
                _this.fireKey = _this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                _this.oneOnly = false;
                return _this;
            }
            Ship.prototype.move = function () {
                if (this.cursorKeys.left.isDown) {
                    this.x -= this.speed;
                    this.scale.x = -1;
                    this.angle = 0;
                }
                else if (this.cursorKeys.right.isDown) {
                    this.x += this.speed;
                    this.scale.x = 1;
                    this.angle = 0;
                }
                if (this.cursorKeys.up.isDown) {
                    this.y -= this.speed;
                    this.angle = -90;
                    this.scale.x = 1;
                }
                else if (this.cursorKeys.down.isDown) {
                    this.y += this.speed;
                    this.angle = 90;
                    this.scale.x = 1;
                }
                if (this.fireKey.isDown) {
                    this.createLazer();
                }
                this.lazers.forEachAlive(this.moveLazer, this);
            };
            Ship.prototype.createLazer = function () {
                if (!this.oneOnly) {
                    var laser = this.game.add.sprite(this.x, this.y, "laser", "frame02");
                    laser.animations.add("fire");
                    this.lazers.addChild(laser);
                    this.oneOnly = true;
                }
            };
            Ship.prototype.moveLazer = function (lazer) {
                lazer.x += this.speed;
                lazer.animations.next();
                if (lazer.animations.frameName === "frame30") {
                    if (lazer.x < this.game.world.width) {
                        lazer.x += (this.speed * 2);
                    }
                    else {
                        this.oneOnly = false;
                        lazer.kill();
                    }
                }
            };
            return Ship;
        }(Phaser.Sprite));
        game_1.Ship = Ship;
    })(game = ingenuity.game || (ingenuity.game = {}));
})(ingenuity || (ingenuity = {}));
var ingenuity;
(function (ingenuity) {
    var game;
    (function (game) {
        var GameState = (function (_super) {
            __extends(GameState, _super);
            function GameState() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GameState.prototype.init = function () {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.pageAlignVertically = true;
            };
            GameState.prototype.preload = function () {
                var loadBar = document.getElementById("progressBar");
                var loadPercent = document.getElementById("progressPercent");
                var loaderDiv = document.getElementById("loader");
                this.game.load.onFileComplete.add(function (progress) {
                    loadBar.style.width = progress + "%";
                    loadPercent.innerText = progress + "%";
                });
                this.game.load.onLoadComplete.add(function () {
                    loaderDiv.style.display = "none";
                });
                this.game.load.image("ship", "img/ship.png");
                this.game.load.atlasJSONArray("laser", "img/laser.png", "img/laser.json");
            };
            GameState.prototype.create = function () {
                this.ship = new game.Ship(this.game, 50, this.game.world.centerY, "ship");
                this.game.world.addChild(this.ship);
            };
            GameState.prototype.update = function () {
                this.ship.move();
            };
            return GameState;
        }(Phaser.State));
        game.GameState = GameState;
    })(game = ingenuity.game || (ingenuity.game = {}));
})(ingenuity || (ingenuity = {}));
var ingenuity;
(function (ingenuity) {
    var game;
    (function (game_2) {
        var game = new Phaser.Game(800, 600, Phaser.AUTO, "gameContainer");
        game.state.add("game", new game_2.GameState(), true);
    })(game = ingenuity.game || (ingenuity.game = {}));
})(ingenuity || (ingenuity = {}));
