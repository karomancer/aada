import * as three from 'three'

export class ObjectManager {
    protected scene: three.Scene;
    protected camera: three.Camera;
    protected renderer: three.WebGLRenderer;

    constructor(scene: three.Scene, camera: three.Camera, renderer: three.WebGLRenderer) {
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
    }

    render: () => void
    updatePosition: (x: number, y: number, index: number) => void
}