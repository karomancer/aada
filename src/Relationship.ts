import * as three from "three";

import Partner from "./Partner";

import { State } from './types'

export default class Relationship {
  scene: three.Scene;
  camera: three.Camera;
  renderer: three.WebGLRenderer;
  mouse: three.Vector3

  AA: Partner
  DA: Partner

  constructor() {
    this.setupScene()

    this.AA = new Partner(State.LOADING, this.scene)
    this.DA = new Partner(State.LOADING, this.scene)

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
    })
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
