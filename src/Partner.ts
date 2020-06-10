import * as THREE from 'three'
import { State } from './types'


export default class Marker {
    public state: State
    
    marker: THREE.Mesh

    constructor(state: State, scene: THREE.Scene) {
        this.state = state || State.LOADING

        var geometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.01, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        
        this.marker = new THREE.Mesh( geometry, material );
        this.marker.rotateX(THREE.MathUtils.degToRad(90))        
    }

    public updatePosition(x: number, y: number) {
        this.marker.position.x = x
        this.marker.position.y = y
    }

    public getMarker() {
        return this.marker
    }

    private setState(state: State) {
        switch (state) {
            case State.INSECURE:
                debugger
                break;
            case State.LOADING:
                break;
            case State.NEUTRAL:
                break;
            case State.SECURE:
                break;
        }
    }
}