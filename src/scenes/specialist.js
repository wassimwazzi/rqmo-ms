import Player from '../gameobjects/Player.js';
import Doctor from '../gameobjects/Doctor.js';
import background from '../assets/background.png';
import dude from '../assets/dude.png';
import Phaser from 'phaser';
import doctor from '../assets/doctor.png';

export default class SpecialistScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpecialistScene' });
    }

    preload() {
        this.load.image('background', background);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('doctor', doctor, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(300, 150, 'background').setDisplaySize(600, 300);

        this.player = new Player(this, 50, 250);
        this.doctor = new Doctor(this, 300, 250);

        this.physics.add.collider(this.player.sprite, this.doctor.sprite, this.doctor.startConversation.bind(this.doctor), null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.createChatBox();
        this.createInputField();

        // this.createToggleSceneButton();
    }

    createChatBox() {
        this.chatBox = this.add.rectangle(300, 50, 500, 100, 0x000000).setOrigin(0.5).setAlpha(0.8);
        this.chatText = this.add.text(280, 30, 'Doctor: What are your symptoms?', {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: 460 },
        }).setOrigin(0.5);
    }

    createInputField() {
        // Create an input field
        this.inputField = this.add.dom(300, 300, 'input', {
            type: 'text',
            name: 'symptoms',
            placeholder: 'Enter your symptoms here...',
            style: 'width: 400px; height: 30px; font-size: 16px;'
        }).setOrigin(0.5);

        // Create a submit button
        this.submitButton = this.add.text(300, 140, 'Submit', {
            fontSize: '16px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setOrigin(0.5).setInteractive();

        this.submitButton.on('pointerdown', () => this.handleSubmit());
    }

    handleSubmit() {
        const symptoms = this.inputField.node.value;
        if (symptoms) {
            this.chatText.setText(`Doctor: Thank you for providing your symptoms. You mentioned: ${symptoms}`);
            this.inputField.node.value = ''; // Clear the input field
        } else {
            this.chatText.setText('Doctor: Please enter your symptoms.');
        }
    }

    createToggleSceneButton() {
        this.switchButton = this.add.text(10, 10, 'Change Scene', {
            fontSize: '20px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 },
            borderRadius: 5
        }).setInteractive();

        this.switchButton.on('pointerdown', () => this.scene.switch('DoctorOfficeScene'));
    }

    update() {
        this.player.update(this.cursors);
        this.doctor.update();
    }
}
