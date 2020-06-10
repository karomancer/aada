import * as three from "three";

import Partner from './Partner'

import { State } from './types'

const THRESHOLD = 0.2

export default class AnxiousPartner extends Partner {
    public isSecure = (positionOfPartner: THREE.Vector3) => {
        const { x, y } = this.marker.position
        console.log(positionOfPartner.x - x, positionOfPartner.y - y)
        return Math.abs(positionOfPartner.x - x) <= THRESHOLD
            && Math.abs(positionOfPartner.y - y) <= THRESHOLD
    }

    public setState(state: State) {
        this.state = state
        switch (state) {
            case State.INSECURE:
                this.marker.material = new three.MeshBasicMaterial( {color: 0xFF0000} );
            case State.LOADING:
                break;
            case State.NEUTRAL:
                break;
            case State.SECURE:
                this.marker.material = new three.MeshBasicMaterial( {color: 0x59FF00} );
                break;
        }
    }
}