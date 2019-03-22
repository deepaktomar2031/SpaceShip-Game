///<reference path="../tsd/phaser.d.ts" />
///<reference path="Ship.ts" />
namespace ingenuity.game {
    export class GameState extends Phaser.State{
        public ship!: Ship;
        public init(){
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
        }
        public preload(){
            const loadBar: HTMLDivElement = document.getElementById("progressBar") as HTMLDivElement;
            const loadPercent: HTMLDivElement = document.getElementById("progressPercent")as HTMLDivElement;
            const loaderDiv: HTMLDivElement = document.getElementById("loader")as HTMLDivElement;
            this.game.load.onFileComplete.add(function (progress: number) {
                loadBar.style.width = progress + "%";
                loadPercent.innerText = progress + "%";
            });
            this.game.load.onLoadComplete.add(function () {
                loaderDiv.style.display = "none";
            });
            this.game.load.image("ship", "img/ship.png");
            this.game.load.atlasJSONArray("laser", "img/laser.png", "img/laser.json");
        }
        public create(){
            this.ship = new Ship(this.game, 50, this.game.world.centerY, "ship");
            this.game.world.addChild(this.ship);
        }
        public update(){
            this.ship.move();
        }
    }
}