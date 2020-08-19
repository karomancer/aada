import * as three from 'three'

const DIAMETER = 100


export default class Circle {
    protected marker: three.Group

    constructor(scene: three.Scene) {
        const cylinder = new three.CylinderGeometry(0.12, 0.12, 0.014)
        var material = new three.MeshBasicMaterial( {color: 0xffff00} );

        const cylinderMesh = new three.Mesh(cylinder, material)

        this.marker = new three.Group()
        this.marker.add(cylinderMesh)
    }

    public getMarker() {
        return this.marker
    }
}