import * as three from "three";
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

import AnxiousPartner from './AnxiousPartner'
import AvoidantPartner from './AvoidantPartner'

import { AttachmentType } from './types'
import Partner from "./Partner";

const startingX = 0.3

export default class Relationship {
  private scene: three.Scene;
  private camera: three.Camera;
  private renderer: three.WebGLRenderer;

  private AA: AnxiousPartner
  private DA: AvoidantPartner
  private partners: Array<Partner>

  constructor(scene: three.Scene, camera: three.Camera, renderer: three.WebGLRenderer) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    this.setupPartners()
    this.setupMovementSystem()
  }

  private setupPartners = () => {
    this.AA = new AnxiousPartner(AttachmentType.LOADING, this.scene)
    const {x: aaX, y: aaY} = this.AA.getRing().position

    this.DA = new AvoidantPartner(AttachmentType.LOADING, this.scene)
    const {x: daX, y: daY} = this.DA.getRing().position

    this.partners = [this.AA, this.DA]
  }

  private setupMovementSystem = () => {
    const controls = new DragControls([this.AA.getMarker(), this.DA.getMarker()], this.camera, this.renderer.domElement );
    controls.addEventListener( 'drag', this.checkCloseness)
  }

  private checkCloseness = () => {
    const aaPosition = this.AA.getRing().position
    const daPosition = this.DA.getRing().position

    this.AA.setState(this.AA.isSecure(daPosition) ? AttachmentType.SECURE : AttachmentType.INSECURE)
    this.DA.setState(this.DA.isSecure(aaPosition) ? AttachmentType.SECURE : AttachmentType.INSECURE)
  }

  private addMarkers = () => {
      this.scene.add(this.AA.getMarker())
      this.scene.add(this.DA.getMarker())
  }

  public render() {
      this.addMarkers()
      this.renderer.render(this.scene, this.camera)
  }

  public updatePosition = (x: number, y: number, indexOfPartner: number) => {
    if(this.partners[indexOfPartner]) {
      this.partners[indexOfPartner].updatePosition(x, y)
      this.checkCloseness()
    }
  }
}
