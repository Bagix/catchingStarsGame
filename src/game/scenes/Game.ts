import { Scene } from "phaser";
import { Player } from "../gameObjects/Player";
import { Star } from "../gameObjects/Star";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    platform: Phaser.Physics.Arcade.StaticGroup;
    player: Player;
    cursor: Phaser.Types.Input.Keyboard.CursorKeys;
    bgMusic: Phaser.Sound.BaseSound;
    catchStartSound: Phaser.Sound.BaseSound;
    stars: Phaser.Physics.Arcade.Group;
    score: number = 0;
    scoreText: Phaser.GameObjects.Text;
    treshold: number = 0.008;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.bgMusic = this.sound.add("bg-music", { loop: true, volume: 0.25 });
        this.catchStartSound = this.sound.add("catch", {
            loop: false,
            volume: 0.1,
        });

        this.bgMusic.play();

        this.platform = this.physics.add.staticGroup();

        this.player = new Player(this, 100, 600);

        this.physics.add.collider(this.player, this.platform);

        this.stars = this.physics.add.group();

        this.physics.add.overlap(
            this.player,
            this.stars,
            this.collectStar,
            undefined,
            this,
        );

        // Score text
        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            color: "#ffffff",
        });
        this.scoreText.setDepth(100);

        // Spawn first star
        this.spawnStar();
        this.platform.create(512, 750, "platform").setScale(2.5).refreshBody();
        this.cursor = this.input.keyboard!.createCursorKeys();
    }

    update() {
        if (this.cursor.left.isDown) {
            this.player.moveLeft();
        } else if (this.cursor.right.isDown) {
            this.player.moveRight();
        } else {
            this.player.idle();
        }

        if (this.cursor.up.isDown) {
            this.player.jump();
        }

        // Remove stars that fell off screen
        this.stars.children.entries.forEach((star: any) => {
            if (star.y > 800) {
                star.destroy();
            }
        });

        // Randomly spawn new stars
        if (Math.random() < this.treshold) {
            this.spawnStar();
        }
    }

    spawnStar() {
        const x = Phaser.Math.Between(50, 974);
        const star = new Star(this, x, -10);
        this.stars.add(star);
    }

    collectStar(player: unknown, star: unknown) {
        const s = star as Star;
        this.catchStartSound.play();
        s.destroy();
        this.score += 1;
        this.scoreText.setText("Score: " + this.score);

        if (this.score === 40) {
            this.bgMusic.stop();
            this.scene.start("GameOver");
        }

        if (this.treshold < 0.02 && this.score % 2 === 0) {
            this.treshold *= 1.05;
        }
    }
}
