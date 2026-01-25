import { GameObjects, Scene } from "phaser";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    title: GameObjects.Text;
    startButton: GameObjects.Text;

    constructor() {
        super("MainMenu");
    }

    create() {
        this.background = this.add.image(512, 384, "background");

        this.title = this.add
            .text(512, 50, "Main Menu", {
                fontFamily: "Arial Black",
                fontSize: 52,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.startButton = this.add
            .text(512, 400, "Start Game", {
                fontFamily: "Arial Black",
                fontSize: 26,
                color: "#2acf5b",
                align: "center",
                backgroundColor: "#2d2d2d",
            })
            .setPadding(24)
            .setOrigin(0.5);

        this.startButton.setInteractive({ useHandCursor: true });

        this.startButton.on("pointerover", () => {
            this.startButton.setBackgroundColor("#5a5a5a");
        });

        this.startButton.on("pointerout", () => {
            this.startButton.setBackgroundColor("#2d2d2d");
        });

        this.startButton.on("pointerdown", () => {
            this.scene.start("Game");
        });
    }
}
