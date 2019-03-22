///<reference path="../tsd/phaser.d.ts" />

namespace ingenuity.game {
    export class Ship extends Phaser.Sprite {
        private cursorKeys: Phaser.CursorKeys;
        public speed: number;
        private lazers: Phaser.Group;
        private fireKey: Phaser.Key;
        private oneOnly: boolean;
        constructor(game: Phaser.Game, x: number, y: number, key: string, frame?: number | string) {
            super(game, x, y, key, frame);
            this.anchor.set(1, 0.5);
            this.cursorKeys = this.game.input.keyboard.createCursorKeys();
            this.speed = 8;
            this.lazers = this.game.add.group(this.game.world, "Lazers");
            this.fireKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.oneOnly = false;
        }
        move() {
            if (this.cursorKeys.left.isDown) {
                this.x -= this.speed;
                this.scale.x = -1;
                this.angle = 0;
            } else if (this.cursorKeys.right.isDown) {
                this.x += this.speed;
                this.scale.x = 1;
                this.angle = 0;
            }
            if (this.cursorKeys.up.isDown) {
                this.y -= this.speed;
                this.angle = -90;
                this.scale.x = 1;
            } else if (this.cursorKeys.down.isDown) {
                this.y += this.speed;
                this.angle = 90;
                this.scale.x = 1;
            }
            if (this.fireKey.isDown) {
                this.createLazer();
            }
            this.lazers.forEachAlive(this.moveLazer, this);
        }
        createLazer() {
            if (!this.oneOnly) {
                const laser = this.game.add.sprite(this.x, this.y, "laser", "frame02");
                laser.animations.add("fire");
                this.lazers.addChild(laser);
                this.oneOnly = true;
            }
        }
        moveLazer(lazer: Phaser.Sprite) {
            lazer.x += this.speed;
            lazer.animations.next();
            if (lazer.animations.frameName === "frame30") {
                if (lazer.x < this.game.world.width) {
                    lazer.x += (this.speed * 2);
                } else {
                    this.oneOnly = false;
                    lazer.kill();
                }
            }
        }
    }
}