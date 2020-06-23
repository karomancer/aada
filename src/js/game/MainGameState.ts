import {GameStateType} from './types' 
import { GameState } from './StateManager'

export default class MainGameState extends GameState {
    public static type = GameStateType.PLAYING
}