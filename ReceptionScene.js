import Phaser from 'phaser';
import receptionist from '../assets/images/receptionist_gen.png';
import officeReception from '../assets/images/officeReception.png';
import ToggleButton from '../gameobjects/Button.js';

export default class ReceptionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ReceptionScene' });
    }

    preload() {
        this.load.html("form", "../form.html");

        // Load images
        this.load.image('receptionist', receptionist);
        this.load.image('officeReception', officeReception);
    }

    create() {
        // Get the width and height of the game canvas
        const { width, height } = this.sys.game.config;

        // Add the office background and scale it to fit the screen
        const office = this.add.image(width / 2, height / 2, 'officeReception');
        office.setDisplaySize(width, height);

        // Add the receptionist sprite
        this.receptionist = this.add.sprite(width - 75, height - 75, 'receptionist').setScale(0.15).setInteractive();

        // Create inventory 
        this.inventory = ['At the reception of doctor\'s office'];
        this.inventoryText = this.add.text(10, 10, 'Inventory: ' + this.inventory.join(', '), { font: '18px Arial', fill: 'red' });

        // Dialogue box and options
        this.dialogueText = this.add.text(100, 50, '', { font: '20px Arial', fill: 'blue', wordWrap: { width: 600 } });
        this.options = [];

        // Start the dialogue with the receptionist
        this.startDialogue();
        // this.getPatientName();
        this.createToggleSceneButton()
    }

    createToggleSceneButton() {
        this.switchButton = new ToggleButton(
            this,
            0,
            230,
            'Enter name',
            { fontSize: '20px', fill: '#ffffff', backgroundColor: '#000000', padding: { x: 10, y: 5 }, borderRadius: 5 },
            () => this.scene.switch('DoctorOfficeScene') // callback function to switch scenes
        );
    }

    startDialogue() {
        this.showDialogue("Hi! \nSo you are experiencing concerning symptoms? \nLet me get you to Dr. Amazing' schedule...", []);
        
       
    }

    getPatientName(){
        this.nameInput = this.add.dom(640, 360).createFromCache("form");
        this.message = this.add.text(75,140, "What did you say your name is again?",{ 
            color: "green",
            fontSize: 20,
            fontStyle: "bold"
        }).setOrigin(0);

        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.returnKey.on("down", event => {
            let name = this.nameInput.getChildByName("name");
            if(name.value != "") {
                this.message.setText("Hello, " + name.value);
                name.value = "";
            }
        });
       
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