import * as three from "three";
import * as OBJLoader from 'three-obj-loader';

import Partner from './Partner'

import { State } from './types'

const THRESHOLD = 0.4

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
        const { x, y } = this.ring.position
        return Math.abs(positionOfPartner.x - x) >= THRESHOLD
            && Math.abs(positionOfPartner.y - y) >= THRESHOLD
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