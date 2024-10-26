export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'dude');
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);

        // Initialize player inventory (e.g., to store health cards and test requests)
        this.inventory = [];
        // Create animations
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(cursors) {
        if (cursors.left.isDown) {
            this.sprite.setVelocityX(-160);
            this.sprite.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.sprite.setVelocityX(160);
            this.sprite.anims.play('right', true);
        } else {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play('turn');
        }
        if (cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-330);
        }
    }

    addToInventory(item) {
        this.inventory.push(item);
    }

    removeFromInventory(item) {
        this.inventory = this.inventory.filter(i => i !== item);
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    showInventory() {
        // Optionally display inventory items on screen
        // You can return the inventory items for UI display
        return this.inventory;
    }
}
