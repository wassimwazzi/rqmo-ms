import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, callback) {
        super(scene, x, y, text, style);

        scene.add.existing(this);

        this.setInteractive({ useHandCursor: true });

        // Add a pointerdown (click) event listener to the button
        this.on('pointerdown', () => {
            callback();
        });

        this.on('pointerover', () => {
            this.setStyle({ fill: '#ff0' }); // Change text color on hover
        });

        this.on('pointerout', () => {
            this.setStyle({ fill: '#fff' }); // Change text color back when not hovering
        });
    }
}
