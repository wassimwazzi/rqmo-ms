export default class Doctor {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'doctor'); // Doctor sprite
        this.sprite.setCollideWorldBounds(true); // Make sure the doctor can't leave the scene
        this.sprite.setImmovable(true);
        this.createAnimations(scene);
    }

    createAnimations(scene) {
        // Define animations for the doctor if needed
        // For example, idle, talking, etc.
        scene.anims.create({
            key: 'idle',
            frames: [{ key: 'doctor', frame: 0 }],
            frameRate: 10,
            repeat: -1
        });
    }

    startConversation() {
        this.scene.dialogueText.setText('Doctor: How can I help you today?');
        this.scene.showActionButtons();
    }

    update() {
        // Update logic for the doctor, if any
        // You can add animations or other behaviors here
        this.sprite.anims.play('idle', true);
    }
}
