import Inventory from './Inventory';

export default class ScoreDisplay {
    constructor(scene, x, y, maxScore = 100) {
        this.scene = scene;
        this.inventory = Inventory.getInstance();
        this.maxScore = maxScore; // Set the maximum score for scaling the bar width

        // Stress Score Bar
        this.stressBarBackground = this.scene.add.rectangle(x, y, 200, 20, 0x555555);
        this.stressBar = this.scene.add.rectangle(x - 100, y, this.getBarWidth(this.inventory.stressScore), 20, 0xff0000);
        this.stressLabel = this.scene.add.text(x - 100, y - 10, 'Stress', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1);

        // Diagnostic Score Bar
        this.diagnosticBarBackground = this.scene.add.rectangle(x, y + 40, 200, 20, 0x555555);
        this.diagnosticBar = this.scene.add.rectangle(x - 100, y + 40, this.getBarWidth(this.inventory.diagnosticScore), 20, 0x0000ff);
        this.diagnosticLabel = this.scene.add.text(x - 100, y + 30, 'Diagnostic', { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5, 1);
    }

    getBarWidth(score) {
        return (score / this.maxScore) * 200; // 200 is the width of the background bar
    }

    updateScores() {
        this.stressBar.width = this.getBarWidth(this.inventory.stressScore);
        this.diagnosticBar.width = this.getBarWidth(this.inventory.diagnosticScore);
    }
}
