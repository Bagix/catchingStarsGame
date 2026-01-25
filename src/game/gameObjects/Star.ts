export class Star extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "star");
        this.setScale(0.5);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVelocityY(200);
        this.setBounce(0.4);
        // scene.sound.add("catch");
    }

    destroy() {
        super.destroy();
    }
}
