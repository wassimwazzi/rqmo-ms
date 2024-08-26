import Player from '../gameobjects/Player.js';
import Doctor from '../gameobjects/Doctor.js';
import background from '../assets/background.png';
import button from '../assets/button.png';
// import healthcard from '../assets/healthcard.png';
import dude from '../assets/dude.png';
import doctor from '../assets/doctor.png';
import Phaser from 'phaser';

export default class SpecialistScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SpecialistScene' });
    }

    preload() {
        this.load.image('background', background);
        this.load.image('button', button);
        // this.load.image('healthcard', healthcard); 
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('doctor', doctor, { frameWidth: 32, frameHeight: 48 }); 
    }

    create() {
        
        this.add.image(300, 150, 'background').setDisplaySize(600, 300); 

        
        this.player = new Player(this, 50, 250); 

        
        this.doctor = new Doctor(this, 300, 250); 

        
        this.physics.add.collider(this.player.sprite, this.doctor.sprite, this.doctor.startConversation.bind(this.doctor), null, this);

        
        this.cursors = this.input.keyboard.createCursorKeys();

        
        this.dialogueText = this.add.text(30, 10, 'Welcome to the clinic!', {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: 540 },
        });

        
        this.createActionButtons();
        this.hideActionButtons();

        
        this.score = 0;
        this.scoreText = this.add.text(500, 10, 'Score: 0', { fontSize: '16px', fill: '#fff' });

        
        this.createDocumentation();
    }

    createActionButtons() {
        const actions = ['Physical Test', 'Blood Test', 'Refer Specialist', 'Refer Family Doctor', 'Social Support'];
        const buttonYStart = 60; 
        const buttonSpacing = 20; 

        this.actionButtons = actions.map((action, index) => {
            const button = this.add.text(450, buttonYStart + index * buttonSpacing, action, {
                fontSize: '12px',
                fill: '#000',
                backgroundColor: '#ffffff',
                padding: { x: 5, y: 2 },
                borderRadius: 3,
            }).setInteractive();

            button.on('pointerdown', () => {
                this.handleAction(action);
            });

            return button;
        });
    }

    hideActionButtons() {
        this.actionButtons.forEach(button => button.setVisible(false));
    }

    showActionButtons() {
        this.actionButtons.forEach(button => button.setVisible(true));
    }

    handleAction(action) {
        let dialogue = '';
        switch (action) {
            case 'Physical Test':
                dialogue = 'Doctor: I will schedule you for a physical test.';
                this.player.addToInventory('physical test');
                this.updateScore(10);
                break;
            case 'Blood Test':
                dialogue = 'Doctor: Let’s order some blood tests.';
                this.player.addToInventory('blood test');
                this.updateScore(15);
                break;
            case 'Refer Specialist':
                dialogue = 'Doctor: I’m referring you to a specialist.';
                this.player.addToInventory('specialist referral');
                this.updateScore(20);
                break;
            case 'Refer Family Doctor':
                dialogue = 'Doctor: I’ll refer you back to your family doctor.';
                this.player.addToInventory('family doctor referral');
                this.updateScore(5);
                break;
            case 'Social Support':
                dialogue = 'Doctor: I’ll connect you with a rare disease support organization.';
                this.player.addToInventory('social support referral');
                this.updateScore(10);
                break;
            default:
                dialogue = 'Doctor: How can I help you today?';
                break;
        }
        this.dialogueText.setText(dialogue);
        this.player.showInventory(); 
        this.hideActionButtons(); 
    }

    createDocumentation() {
        const diseases = [
            { name: 'Rare Disease 1', description: 'Description of rare disease 1.' },
            { name: 'Rare Disease 2', description: 'Description of rare disease 2.' },
        ];

        let y = 100;
        diseases.forEach((disease) => {
            this.add.text(10, y, `${disease.name}: ${disease.description}`, {
                fontSize: '10px',
                fill: '#fff',
                wordWrap: { width: 280 },
            });
            y += 40; 
        });
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);
    }

    update() {
        this.player.update(this.cursors);
        this.doctor.update();
    }
}
