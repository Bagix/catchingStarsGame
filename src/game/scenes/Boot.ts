import { Scene } from "phaser";

export class Boot extends Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image("background", "assets/bg.png");
    }

    create() {
        const { width, height } = this.scale;
        const isPortrait = height > width;

        if (width <= 360 || height <= 300 || isPortrait) {
            this.scene.start("CantPlay");
        } else {
            this.scene.start("Preloader");
        }
    }
}

