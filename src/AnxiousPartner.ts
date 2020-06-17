import * as three from "three";

import Partner from './Partner'

import { State } from './types'
import { Vector2 } from "three";

const THRESHOLD = 0.4

export default class AnxiousPartner extends Partner {
    public isSecure = (positionOfPartner: THREE.Vector3) => {
        return positionOfPartner.distanceTo(this.ring.position) < THRESHOLD
    }

    public setState(state: State) {
        this.state = state
        switch (state) {
            case State.INSECURE:
                // Bug in typescript type definitions
                (this.ring.material as any).color.setHex(0xFF0000);
            case State.LOADING:
                break;
            case State.NEUTRAL:
                break;
            case State.SECURE:
                (this.ring.material as any).color.setHex(0x59FF00);
                break;
        }
    }
}