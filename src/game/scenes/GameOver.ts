import { Scene } from "phaser";

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText: Phaser.GameObjects.Text;
    resetButton: Phaser.GameObjects.Text;

    constructor() {
        super("GameOver");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.gameOverText = this.add
            .text(512, 250, "You win!", {
                fontFamily: "Arial Black",
                fontSize: 64,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.resetButton = this.add
            .text(512, 400, "Back To Main Menu", {
                fontFamily: "Arial Black",
                fontSize: 26,
                color: "#ffffff",
                align: "center",
                backgroundColor: "#2d2d2d",
            })
            .setPadding(24)
            .setOrigin(0.5);

        this.resetButton.setInteractive({ useHandCursor: true });

        this.resetButton.on("pointerover", () => {
            this.resetButton.setBackgroundColor("#5a5a5a");
        });

        this.resetButton.on("pointerout", () => {
            this.resetButton.setBackgroundColor("#2d2d2d");
        });

        this.resetButton.on("pointerdown", () => {
            this.scene.start("MainMenu");
        });
    }
}
