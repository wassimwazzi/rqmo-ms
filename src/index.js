import Phaser from 'phaser';
import DoctorOfficeScene from './scenes/DoctorOfficeScene';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: DoctorOfficeScene
};

const game = new Phaser.Game(config);
