import * as three from "three";

import AnxiousPartner from './AnxiousPartner'
import AvoidantPartner from './AvoidantPartner'

import { State } from './types'

export default class Relationship {
  private scene: three.Scene;
  private camera: three.Camera;
  private renderer: three.WebGLRenderer;
  private mouse: three.Vector3

  private AA: AnxiousPartner
  private DA: AvoidantPartner

  constructor() {
    this.setupScene()

    this.AA = new AnxiousPartner(State.LOADING, this.scene)
    this.DA = new AvoidantPartner(State.LOADING, this.scene)

    this.setupListeners()
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
    
    this.mouse = new three.Vector3( 0, 0, 0.5 );
  }

  private setupListeners = () => {
    document.addEventListener('mousemove', (e: MouseEvent) => {
        const {clientX, clientY}  = e
        this.mouse.x = ( clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( clientY / window.innerHeight ) * 2 + 1;
        // mouse.unproject( camera );
        this.AA.updatePosition(this.mouse.x, this.mouse.y)
        this.checkCloseness()
    })
  }

  private checkCloseness = () => {
    const aaPosition = this.AA.getMarker().position
    const daPosition = this.DA.getMarker().position

    this.AA.setState(this.AA.isSecure(daPosition) ? State.SECURE : State.INSECURE)
    this.DA.setState(this.DA.isSecure(aaPosition) ? State.SECURE : State.INSECURE)
  }

  private addMarkers = () => {
      this.scene.add(this.AA.getMarker())
      this.scene.add(this.DA.getMarker())
  }

  public render() {
      this.addMarkers()
      this.renderer.render(this.scene, this.camera)
  }

}
