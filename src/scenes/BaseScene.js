import Phaser from 'phaser';
import { GameTree } from '../gameobjects/Game';

export default class BaseScene extends Phaser.Scene {
    // Handles getting next node and actions
    // Handles switching scenes when next node has different scene
    constructor({ key }) {
        super({ key });
    }

    isCurrentScene() {
        return this.head.scene == this.scene.key;
    }

    getMessage() {
        if (this.isCurrentScene()) {
            return this.head.getPrompt()
        }
        return "I don't have anything more to share ..."
    }

    getActionMessages() {
        if (!this.isCurrentScene()) {
            return []
        }
        return this.actions.map((action) => action.getMessage())
    }

    newMessage(message) {
        // TODO: This can be something other than just newMessage.
        // It's a base class to handle next action
        if (message.sender === 'Player') {
            const selectedAction = this.actions.find((action) => action.getMessage() == message.message)
            if (selectedAction) {
                this.gameTree.applyAction(selectedAction)
                this.actions = this.gameTree.getPossibleActions()
                this.head = this.gameTree.getHead()
                // Call subclass specific implementation
                this.onNewMessage(message)
                // change scene if not equal to this
                if (!this.isCurrentScene()) {
                    this.scene.switch(this.head.scene);
                }
            } else {
                console.error('No Selection Action found')
            }
        }
    }

    onNewMessage(message) {
    }

    preload() { }

    create() {
        // Set up Game graph data
        this.gameTree = GameTree.getInstance()
        this.head = this.gameTree.getHead()
        this.actions = this.gameTree.getPossibleActions()
        // Set up the scene visuals
        this.canvas = this.sys.game.canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    update() { }

}
