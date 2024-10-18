import { ChatBox, ChatDropdownInput } from '../gameobjects/Chat';
import background from '../assets/background.png';
import dude from '../assets/dude.png';
import Phaser from 'phaser';
import doctor from '../assets/doctor.png';
import { SceneData } from './SceneData';

export default class SpecialistScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpecialistScene' });
        this.currentDialogueIndex = 0;  // Track the current dialogue
        this.isPlayerTurn = false;  // Start with specialist's turn (false = specialist, true = player)
        this.isPlayerInput = false;  // Flag to indicate if it's the player's input
    }

    preload() {
        this.load.image('SpecialistBackground', background);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('doctor', doctor, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        // Access the scene data directly from the JavaScript object
        this.currentScene = SceneData.scenes.find(scene => scene.sceneName === 'Specialist Office');

        if (!this.currentScene) {
            console.error('Specialist Office scene not found in sceneData.');
            return;
        }

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
        this.chatBox.chatController.addListener({
            newMessage: (message) => {
                if (this.isPlayerInput && message.sender === 'Player') {
                    this.newMessage(message);
                }
            }
        });
    }

    showSpecialistMessage() {
        const currentDialogue = this.currentScene.dialogueTree[this.currentDialogueIndex];
        if (currentDialogue && currentDialogue.specialist) {
            const specialistMessage = currentDialogue.specialist;
            console.log('Showing specialist message:', specialistMessage);

            // Temporarily set isPlayerInput to false to avoid triggering newMessage
            this.isPlayerInput = false;

            // Add the specialist's message to the chat without triggering input event handling
            this.chatBox.chatController.addMessage({ sender: 'Specialist', message: specialistMessage });

            // After the specialist's message, switch to player turn and show options
            this.time.delayedCall(500, () => {
                this.isPlayerTurn = true;
                this.isPlayerInput = true;  // Re-enable player input
                this.showPlayerOptions();  // Show player options after the specialist finishes
            });
        } else {
            console.error('No specialist message available at index:', this.currentDialogueIndex);
        }
    }

    showPlayerOptions() {
        const currentDialogue = this.currentScene.dialogueTree[this.currentDialogueIndex];
        if (currentDialogue && currentDialogue.playerOptions) {
            const playerOptions = currentDialogue.playerOptions.map(option => option.text);
            console.log('Showing player options:', playerOptions);

            // Set the player options in the dropdown input
            this.chatBox.chatInput.setOptions(playerOptions);
        } else {
            console.error('No player options available at index:', this.currentDialogueIndex);
        }
    }

    newMessage(message) {
        // Ensure we only handle player messages once and isPlayerInput flag is set to true
        if (message.sender === 'Player' && this.isPlayerTurn && this.isPlayerInput) {
            // Get the current dialogue and selected option
            const currentDialogue = this.currentScene.dialogueTree[this.currentDialogueIndex];
            const selectedOption = currentDialogue.playerOptions.find(option => option.text === message.message);

            if (selectedOption) {
                console.log('Player chose:', selectedOption.text);

                // Temporarily set isPlayerInput to false to prevent recursion
                this.isPlayerInput = false;

                // Add player's message to the chat box without triggering a new message event
                this.chatBox.chatController.addMessage({ sender: 'Player', message: selectedOption.text });

                // Now it's the specialist's turn to respond
                this.isPlayerTurn = false;
                this.currentDialogueIndex += 1;

                // Show the next specialist's message after the player's message
                this.time.delayedCall(1000, () => {
                    this.showSpecialistMessage();  // Call showSpecialistMessage after player's choice
                });
            }
        }
    }

    update() {
        // Ensure the game state stays updated
    }
}
