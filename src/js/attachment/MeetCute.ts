import * as three from 'three'

import { ObjectManager } from '../types'

import Circle from './Circle'

import { Person } from '../PeopleTracker'


export default class MeetCute extends ObjectManager {
    private people: Array<Person>
    private Player1: Circle
    private Player2: Circle

    constructor(scene: three.Scene, camera: three.Camera, renderer: three.WebGLRenderer) {
        super(scene, camera, renderer)
        this.setupCircles()
    }

    private setupCircles = () => {
        this.Player1 = new Circle(this.scene)
        this.Player2 = new Circle(this.scene)
    }

    private addPlayers = () => {
        this.scene.add(this.Player1.getMarker())
        this.scene.add(this.Player2.getMarker())
    }

    public render = () => {
        this.addPlayers()
        debugger
    }

}