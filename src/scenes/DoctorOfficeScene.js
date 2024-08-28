import Phaser from 'phaser';
import doctorImage from '../assets/images/doctor.png';
import patientImage from '../assets/images/patient.png';
import officeImage from '../assets/images/office.png';
import ToggleButton from '../gameobjects/Button.js';

export default class DoctorOfficeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DoctorOfficeScene' });
    }

    preload() {
        // Load images
        this.load.image('doctor', doctorImage);
        this.load.image('patient', patientImage);
        this.load.image('office', officeImage);
    }

    create() {
        // Get the width and height of the game canvas
        const { width, height } = this.sys.game.config;

        // Add the office background and scale it to fit the screen
        const office = this.add.image(width / 2, height / 2, 'office');
        office.setDisplaySize(width, height);

        // Add the doctor sprite
        this.doctor = this.add.sprite(150, height - 150, 'doctor').setScale(0.3).setInteractive();

        // Add the patient sprite
        this.patient = this.add.sprite(width - 150, height - 150, 'patient').setScale(0.15).setInteractive();

        // Create inventory (starting with healthcare card)
        this.inventory = ['Healthcare Card'];
        this.inventoryText = this.add.text(10, 10, 'Inventory: ' + this.inventory.join(', '), { font: '18px Arial', fill: '#ffffff' });

        // Dialogue box and options
        this.dialogueText = this.add.text(100, 50, '', { font: '20px Arial', fill: '#fff', wordWrap: { width: 600 } });
        this.options = [];

        // Start the dialogue with the patient
        this.startDialogue();
        this.createToggleSceneButton()
    }

    createToggleSceneButton() {
        this.switchButton = new ToggleButton(
            this,
            0,
            75,
            'Change Scene',
            { fontSize: '20px', fill: '#ffffff', backgroundColor: '#000000', padding: { x: 10, y: 5 }, borderRadius: 5 },
            () => this.scene.switch('SpecialistScene') // callback function to switch scenes
        );
    }

    startDialogue() {
        this.showDialogue("Welcome to the doctor's office. How can I assist you today?", [
            { text: "Send out for physical tests", action: () => this.addToInventory('Physical Test Request') },
            { text: "Order blood tests", action: () => this.addToInventory('Blood Test Request') },
            { text: "Refer to a specialist", action: () => this.addToInventory('Specialist Referral') },
            { text: "Refer to social support/rare disease organizations", action: () => this.addToInventory('Support Referral') },
            { text: "View documentation on diseases", action: () => this.viewDocumentation() }
        ]);
    }

    showDialogue(text, options) {
        this.dialogueText.setText(text);

        // Clear previous options
        this.options.forEach(option => option.destroy());
        this.options = [];

        // Display new options
        options.forEach((option, index) => {
            const optionText = this.add.text(100, 150 + (index * 40), option.text, { font: '18px Arial', fill: '#00ff00' }).setInteractive();

            optionText.on('pointerdown', () => {
                this.clearDialogue();
                option.action();
            });

            this.options.push(optionText);
        });
    }

    clearDialogue() {
        this.dialogueText.setText('');
        this.options.forEach(option => option.destroy());
        this.options = [];
    }

    addToInventory(item) {
        this.inventory.push(item);
        this.inventoryText.setText('Inventory: ' + this.inventory.join(', '));
        this.showDialogue('The ' + item + ' has been added to your inventory.', [
            { text: "Continue", action: () => this.startDialogue() }
        ]);
    }

    viewDocumentation() {
        this.showDialogue("Here is the documentation on various diseases.", [
            { text: "Continue", action: () => this.startDialogue() }
        ]);
    }

    update() {
        // Update logic if needed
    }
}
