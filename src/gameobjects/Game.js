import Inventory from "./Inventory";
import { GAME_DATA } from "../data";

export class Action {
    message;
    stressScore;
    diagnosticScore

    constructor({ message, stressScore, diagnosticScore }) {
        this.message = message
        this.stressScore = stressScore
        this.diagnosticScore = diagnosticScore
    }

    getMessage() {
        return this.message;
    }

    apply() {
        const inventory = Inventory.getInstance();
        inventory.stressScore += this.stressScore;
        inventory.diagnosticScore += this.diagnosticScore;
    }
}

export class Node {
    static #nodes = {};

    constructor({ id, prompt, scene }) {
        this.id = id
        this.prompt = prompt
        this.scene = scene
    }

    getPrompt() {
        return this.prompt
    }

    getScene() {
        return this.scene
    }

    static getOrCreate({ id, prompt, scene }) {
        if (!(id in Node.#nodes)) {
            Node.#nodes[id] = new Node({ id, prompt, scene })
        }
        return Node.#nodes[id];
    }
}

export class GameTree {
    static #instance;

    constructor() {
        this.visited = []
        // Node instance
        this.state = null;
        // Map: fromNode -> [{action, toNode}]
        this.edges = {}
        this.edges2 = {}
        this.initializeGameTree()
    }

    initializeGameTree() {
        if (GameTree.#instance) {
            throw new Error("GameTree already initialized");
        }
        const head = Node.getOrCreate({ id: "0", ...GAME_DATA.nodes["0"] })
        this.setHead(head)
        for (const fromNodeId in GAME_DATA.edges) {
            const fromNodeData = GAME_DATA.nodes[fromNodeId];
            const fromNode = Node.getOrCreate({ id: fromNodeId, ...fromNodeData });
            GAME_DATA.edges[fromNodeId].forEach(edge => {
                // for each to Node
                const toNodeId = edge.to
                const toNodeData = GAME_DATA.nodes[toNodeId];
                const toNode = Node.getOrCreate({ id: toNodeId, ...toNodeData });
                edge.actions.forEach(action => {
                    // for each action leading to toNode
                    action = new Action(action)
                    this.addEdge({ fromNode, toNode, action })
                })
            })
        }
    }

    setHead(node) {
        // call initially to set the start node
        if (this.state != null) {
            throw new Error('Only call setHead once on initialization')
        }
        this.state = node;
    }

    getHead() {
        return this.state;
    }

    getPossibleActions() {
        return this.getEdges().map((edge) => edge.action);
    }

    getEdges() {
        if (!this.state || !(this.state.id in this.edges)) {
            return [];
        }
        return this.edges[this.state.id]
    }

    applyAction(action) {
        const edges = this.getEdges();
        if (!action in edges.map((edge) => edge.action)) {
            throw new Error(`Invalid action chosen. Action: ${action}, edges: ${edges}, head: ${this.state}`);
        }
        this.visited.push(this.state);
        this.state = edges.find((edge) => edge.action == action).toNode;
        action.apply();
    }

    addEdge({ fromNode, toNode, action }) {
        if (fromNode.id in this.edges) {
            this.edges[fromNode.id].push({ action, toNode });
        } else {
            this.edges[fromNode.id] = [{ action, toNode }];
        }
    }

    static getInstance() {
        if (!GameTree.#instance) {
            GameTree.#instance = new GameTree();
        }
        return GameTree.#instance;
    }
}
