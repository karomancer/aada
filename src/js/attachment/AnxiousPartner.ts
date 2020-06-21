import * as three from "three";

import Partner from './Partner'

import { AttachmentType } from './types'
import { Vector2 } from "three";

const THRESHOLD = 0.4

export default class AnxiousPartner extends Partner {
    public isSecure = (positionOfPartner: THREE.Vector3) => {
        return positionOfPartner.distanceTo(this.ring.position) < THRESHOLD
    }

    public setState(state: AttachmentType) {
        this.state = state
        switch (state) {
            case AttachmentType.INSECURE:
                // Bug in typescript type definitions
                (this.ring.material as any).color.setHex(0xFF0000);
            case AttachmentType.LOADING:
                break;
            case AttachmentType.NEUTRAL:
                break;
            case AttachmentType.SECURE:
                (this.ring.material as any).color.setHex(0x59FF00);
                break;
        }
    }
}