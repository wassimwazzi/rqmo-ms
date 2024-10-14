import { Action } from "./Action";
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
