import { GameObjects, Scene } from "phaser";

export class CantPlay extends Scene {
    text: GameObjects.Text;

    constructor() {
        super("CantPlay");
    }

    create() {
        const { width, height } = this.scale;
        const horizontalCenter = width / 2;
        const verticalCenter = height / 2;

        this.text = this.add
            .text(horizontalCenter, verticalCenter * 0.55, "ERROR", {
                fontFamily: "Arial Black",
                fontSize: 52,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);
    }
}
