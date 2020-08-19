import * as three from 'three'

export interface DetectedObjectManagerProps {
    constructor: (scene: three.Scene, camera: three.Camera, renderer: three.WebGLRenderer) => void
    render: () => void
    updatePosition: (x: number, y: number, index: number) => void
}