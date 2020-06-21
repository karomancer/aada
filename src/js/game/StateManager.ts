import { GameStateType } from './types'

class GameState {
    private type: GameStateType
    private nextState: GameState
    private previousState: GameState

    constructor() {

    }

    public render() { }
    public getNextState() {
        return this.nextState
    }
    public getPrevState() {
        return this.previousState
    }
}

export default class StateManager {
    private state: GameState

    constructor() {

    }
}