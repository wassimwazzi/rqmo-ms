import Phaser from "phaser";
import background from "../assets/Title_Background.png";

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
  }

  preload() {
    this.load.image("background", background);
    // this.load.image("startButton", "assets/startButton.png"); // Optional start button image
  }

  create() {
    // Add a background
    const bg = this.add.image(300, 150, "background"); // Position at the center of the screen
    bg.setScale(0.3);

    // Replace the button image with a text button
    const newGameButtonBox = this.add.graphics();
    newGameButtonBox.fillStyle(808080, 0.9); // Blue color with 80% opacity
    newGameButtonBox.fillRect(150, 60, 300, 80);

    // Add the title text
    this.titleText = this.add
      .text(300, 100, "RQMO Game", {
        fontSize: "48px",
        fill: "#ffffff",
      })
      .setOrigin(0.5); // Center the text

    const newGameButton = this.add
      .text(300, 200, "New Game", {
        fontSize: "32px",
        fill: "#ffffff",
      })
      .setOrigin(0.5)
      .setInteractive();


    newGameButton.on("pointerdown", () => {
      this.scene.switch("ReceptionScene"); // Starts the game in the 'Doctor Office' scene
    });

    this.tweens.add({
      targets: newGameButton,
      scale: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });
  }
}

export default TitleScene;
