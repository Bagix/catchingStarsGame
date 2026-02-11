import { GameObjects, Scene } from "phaser";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    title: GameObjects.Text;
    description: GameObjects.Text;
    instruction: GameObjects.Text;
    startButton: GameObjects.Text;

    constructor() {
        super("MainMenu");
    }

    private calculateFontSize(baseSize: number): number {
        const { height } = this.scale;
        console.log(
            "Calculating font size based on height:",
            baseSize * (height / 500),
        );
        return baseSize * (height / 500);
    }

    create() {
        const { width, height } = this.scale;
        const horizontalCenter = width / 2;
        const verticalCenter = height / 2;

        const titleSize = this.calculateFontSize(48);
        const descSize = this.calculateFontSize(20);
        const buttonSize = this.calculateFontSize(24);
        const instructSize = this.calculateFontSize(16);

        this.title = this.add
            .text(horizontalCenter, height * 0.1, "Main Menu", {
                fontFamily: "Arial Black",
                fontSize: titleSize,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        this.description = this.add
            .text(
                horizontalCenter,
                height * 0.3,
                "Get score 40 score \ncatching stars",
                {
                    fontFamily: "Arial Black",
                    fontSize: descSize,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                },
            )
            .setOrigin(0.5)
            .setDepth(100);

        this.startButton = this.add
            .text(horizontalCenter, height * 0.5, "Start Game", {
                fontFamily: "Arial Black",
                fontSize: buttonSize,
                color: "#2acf5b",
                align: "center",
                backgroundColor: "#2d2d2d",
            })
            .setPadding(24)
            .setOrigin(0.5);

        this.instruction = this.add
            .text(
                horizontalCenter,
                height * 0.8,
                "Use arrows (left, right and up)",
                {
                    fontFamily: "Arial",
                    fontSize: instructSize,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 8,
                    align: "center",
                },
            )
            .setOrigin(0.5)
            .setDepth(100);

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
