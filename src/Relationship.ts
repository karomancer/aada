import * as three from "three";
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

import AnxiousPartner from './AnxiousPartner'
import AvoidantPartner from './AvoidantPartner'

import { State } from './types'
import { normalizeCoord } from "./utils";

const startingX = 0.3

export default class Relationship {
  private scene: three.Scene;
  private camera: three.Camera;
  private renderer: three.WebGLRenderer;
  private mouse: three.Vector3

  private AA: AnxiousPartner
  private DA: AvoidantPartner

  constructor() {
    this.setupScene()
    this.setupPartners()
    this.setupMovementSystem()
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
    
    this.scene.add(new three.AmbientLight(0xfff))
  }

  private setupPartners = () => {
    this.AA = new AnxiousPartner(State.LOADING, this.scene)
    const {x: aaX, y: aaY} = this.AA.getRing().position
    this.AA.updatePosition(aaX + startingX, aaY)

    this.DA = new AvoidantPartner(State.LOADING, this.scene)
    const {x: daX, y: daY} = this.DA.getRing().position
    this.DA.updatePosition(daX - startingX, daY)

    // this.AA.getMarker().rotateZ(Math.PI * 1/2)
  }

  private setupMovementSystem = () => {
    const controls = new DragControls([this.AA.getMarker(), this.DA.getMarker()], this.camera, this.renderer.domElement );
    controls.addEventListener( 'drag', this.checkCloseness)
  }

  private checkCloseness = (someVar) => {
    const aaPosition = this.AA.getRing().position
    const daPosition = this.DA.getRing().position

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
