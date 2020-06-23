import * as three from "three";

import { GameStateType } from './types'
import Relationship from "../attachment/Relationship";
import PeopleTracker from "../PeopleTracker";

export class GameState {
    public type: GameStateType
    private nextState: GameState
    private previousState: GameState

    protected relationship: Relationship
    protected peopleTracker: PeopleTracker

    constructor(relationship: Relationship, peopleTracker: PeopleTracker) {
        this.relationship = relationship
        this.peopleTracker = peopleTracker
    }

    public render() { 
        var animate = () => {
            requestAnimationFrame( animate );
            this.relationship.render()
        };
        
        animate()
        
        const setupPeopleTracker = () => {
            const peopleTracker = new PeopleTracker(this.relationship.updatePosition)
        }
    }

    public getNextState() {
        return this.nextState
    }
    public getPrevState() {
        return this.previousState
    }
}

export default class StateManager {
    private state: GameState

    private scene: three.Scene;
    private camera: three.Camera;
    private renderer: three.WebGLRenderer;

    private relationship: Relationship
    private peopleTracker: PeopleTracker

    constructor() {
        this.setupScene()
        this.relationship = new Relationship(this.scene, this.camera, this.renderer)
        this.peopleTracker = new PeopleTracker(this.relationship.updatePosition)
        this.state = new GameState(this.relationship, this.peopleTracker)
    }

    private setupScene = () => {
        // Set up scene and camera
        this.scene = new three.Scene();
        this.camera = new three.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.01,
          10
        );
        this.camera.position.z = 1;
        
        // Set up renderer
        this.renderer = new three.WebGLRenderer
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild(this.renderer.domElement );
        
        this.scene.add(new three.AmbientLight(0xfff))
      }
    
    public start = () => {
        this.state.render() 
    }
}