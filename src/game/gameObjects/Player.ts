export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "dude");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.initAnimations();
        const gravityY = Math.max(scene.cameras.main.height / 10, 200);
        this.setGravityY(gravityY);
        scene.sound.add("jump");
    }

    initAnimations() {
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 1,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
    }

    moveLeft(cameraWidth: number) {
        this.setVelocityX(-cameraWidth / 5);
        this.anims.play("left", true);
    }

    moveRight(cameraWidth: number) {
        this.setVelocityX(cameraWidth / 5);
        this.anims.play("right", true);
    }

    idle() {
        this.setVelocityX(0);
        this.anims.play("turn");
    }

    jump(cameraHeight: number) {
        if (this.body?.blocked.down) {
            const jumpVelocity = Math.max(cameraHeight / 3, 250);
            this.setVelocityY(-jumpVelocity);
            this.scene.sound.play("jump", { volume: 0.25 });
        }
    }
}
