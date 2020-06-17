import * as three from "three";

import Partner from './Partner'

import { State } from './types'

const THRESHOLD = 0.2

export default class AnxiousPartner extends Partner {
    public isSecure = (positionOfPartner: THREE.Vector3) => {
        const { x, y } = this.ring.position
        console.log({x, partnerX: positionOfPartner.x})
        console.log({y, partnerY: positionOfPartner.y})
        return Math.abs(positionOfPartner.x - x) <= THRESHOLD
            && Math.abs(positionOfPartner.y - y) <= THRESHOLD
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