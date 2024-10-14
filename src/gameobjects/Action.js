// TODO: improve the design when more concrete game logic is decided

export class Outcome {
    constructor(message, stressScore, diagnosticScore, points) {
        this.message = message
        this.stressScore = stressScore
        this.diagnosticScore = diagnosticScore
        this.points = points
    }
}

export class Action {
    static id = 1

    constructor(prompt, outcome) {
        this.prompt = prompt
        this.outcome = outcome
        this.actionId = Action.id
        Action.id += 1
        this.nextActions = []
    }

    addNextAction(nextActionNode) {
        this.nextActions.push(nextActionNode);
    }

    apply(inventory) {
        inventory.stressScore += this.outcome.stressScore
        inventory.diagnosticScore += this.outcome.stressScore
        inventory.points += this.outcome.points
    }
}
