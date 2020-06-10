import * as three from 'three'
import { State } from './types'


export default class Partner {
    protected state: State
    protected marker: three.Mesh

    constructor(state: State, scene: three.Scene) {
        this.state = state || State.LOADING

        var geometry = new three.CylinderGeometry( 0.1, 0.1, 0.01, 32 );
        var material = new three.MeshBasicMaterial( {color: 0xffff00} );
        
        this.marker = new three.Mesh( geometry, material );
        this.marker.rotateX(three.MathUtils.degToRad(90))        
    }

    public isSecure = (positionOfPartner: three.Vector3) => {
        return true;
    }

    public updatePosition(x: number, y: number) {
        this.marker.position.x = x
        this.marker.position.y = y
    }

    public getMarker() {
        return this.marker
    }

    public setState(state: State) {
        this.state = state
    }
}