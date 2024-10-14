import { Action, Outcome } from "./Action";
import { Inventory } from "./Inventory";

export class Game {
    // Game Graph
    constructor(initialAction) {
        this.performedActions = []
        this.inventory = new Inventory()
        this.head = initialAction;
    }

    nextActions() {
        return this.head.nextActions;
    }

    performAction(actionId) {
        const nextActions = this.nextActions()
        if (!actionId in nextActions) {
            throw new Error('Invalid action ID(s) provided.');
        }
        const nextAction = nextActions.find((action) => action.actionId === actionId)
        this.performedActions.push(this.head)
        this.head = nextAction
        this.head.apply(this.inventory)
    }
}

const dummyOutcome = new Outcome('Action completed', 10, 20, 30)
const initialAction = new Action('First Action', dummyOutcome)
const action2_1 = new Action('Action 2.1', dummyOutcome)
const action2_2 = new Action('Action 2.2', dummyOutcome)
const action2_3 = new Action('Action 2.3', dummyOutcome)
initialAction.addNextAction(action2_1)
initialAction.addNextAction(action2_2)
initialAction.addNextAction(action2_3)
const action3_1 = new Action('Action 3.1', dummyOutcome)
const action3_2 = new Action('Action 3.2', dummyOutcome)
const action3_3 = new Action('Action 3.3', dummyOutcome)
action2_1.addNextAction(action3_1)
action2_2.addNextAction(action3_2)
action2_3.addNextAction(action3_3)

export const testGame = new Game(initialAction)
