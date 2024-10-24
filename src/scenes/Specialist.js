import { ChatBox, ChatDropdownInput } from '../gameobjects/Chat';
import background from '../assets/background.png';
import dude from '../assets/dude.png';
import Phaser from 'phaser';
import doctor from '../assets/doctor.png';
import { GameTree } from '../gameobjects/Game';

export default class SpecialistScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpecialistScene' });
    }

    preload() {
        this.load.image('SpecialistBackground', background);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('doctor', doctor, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        // Access the scene data directly from the JavaScript object
        this.gameTree = GameTree.getInstance()
        // Set up the scene visuals
        this.canvas = this.sys.game.canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.add.image(this.width / 2, this.height / 2, 'SpecialistBackground').setDisplaySize(this.width, this.height);

        // Create the chatbox
        this.createChatBox();

        // Show the first specialist message right when the scene is created
        this.showSpecialistMessage();
    }

    createChatBox() {
        let rectHeight = this.height / 4;
        let rectMargin = 0.1 * this.width;

        // Create the chat box at the bottom of the screen
        this.chatBox = new ChatBox(this, rectMargin, this.height - rectHeight, this.width - 2 * rectMargin, rectHeight, ChatDropdownInput);

        // Listen for player input using an arrow function to maintain the `this` context
        this.chatBox.chatController.addListener(this);
    }

    showSpecialistMessage() {
        const prompt = this.gameTree.getHead().getPrompt()

        // Add the specialist's message to the chat without triggering input event handling
        this.chatBox.chatController.addMessage({ sender: 'Specialist', message: prompt });

        // After the specialist's message, switch to player turn and show options
        this.showPlayerOptions();  // Show player options after the specialist finishes
    }

    showPlayerOptions() {
        this.actions = this.gameTree.getPossibleActions()
        // Set the player options in the dropdown input
        this.chatBox.chatInput.setOptions(this.actions.map((action) => action.getMessage()));
    }

    newMessage(message) {
        if (message.sender === 'Player') {
            const selectedAction = this.actions.find((action) => action.getMessage() == message.message)
            if (selectedAction) {
                this.gameTree.applyAction(selectedAction)
                // Show the next specialist's message after the player's message
                this.showSpecialistMessage();  // Call showSpecialistMessage after player's choice
            } else {
                console.error('No Selection Action found')
            }
        }
    }

    update() {
        // Ensure the game state stays updated
    }
}
