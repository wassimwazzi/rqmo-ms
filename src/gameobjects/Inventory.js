export class Inventory {
    constructor(name = 'Player', diagnosticScore=0, stressScore=0,points=0) {
        this.name = name
        this.diagnosticScore = diagnosticScore
        this.stressScore = stressScore
        this.points = points
    }
}