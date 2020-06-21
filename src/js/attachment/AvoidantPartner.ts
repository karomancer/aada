import * as three from "three";
import * as OBJLoader from 'three-obj-loader';

import Partner from './Partner'

import { AttachmentType } from './types'

const THRESHOLD = 0.8

export default class AvoidantPartner extends Partner {
    private growWings = () => {
        const loader = new OBJLoader(three);

        console.log('did not fail')

        // loader.load(
        //     // resource URL
        //     '../../assets/icon/threed/helicopter.obj',
        //     // called when resource is loaded
        //     function ( object ) {
          
        //       this.scene.add( object );
          
        //     },
        //     // called when loading is in progresses
        //     function ( xhr ) {
          
        //       console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          
        //     },
        //     // called when loading has errors
        //     function ( error ) {
          
        //       console.log( 'An error happened' );
          
        //     }
        //   );
    }

    public isSecure = (positionOfPartner: THREE.Vector3) => {
        return positionOfPartner.distanceTo(this.ring.position) > THRESHOLD
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