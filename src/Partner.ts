import * as three from 'three'
import { State } from './types'

const DIAMETER = 100


export default class Partner {
    protected state: State
    protected ring: three.Mesh
    protected marker: three.Group

    constructor(state: State, scene: three.Scene) {
        this.state = state || State.LOADING

        const torus = new three.TorusGeometry(0.12, 0.014, 25, 25, Math.PI * 7/4);
        torus.rotateZ(Math.PI/8)
        const torusMaterial = new three.MeshStandardMaterial({
            color: 0xffff00,
            roughness: 0,
            metalness: 1,
            envMap: this.createEnvMap()
        });
        const sphere = new three.SphereGeometry(0.037, 12, 8)
        sphere.translate(0.12, 0, 0)
        // const sphereMaterial = new three.MeshBasicMaterial({ color: '0xfff'})
        const sphereMaterial = this.createGlow()

        const glow = new three.Mesh(sphere, sphereMaterial)
        const ring = new three.Mesh(torus, torusMaterial);

        this.marker = new three.Group()
        this.ring = ring

        this.marker.add(ring)
        this.marker.add(glow)

        // this.marker.rotateX(three.MathUtils.degToRad(90))  
    }

    private createEnvMap = () => {
        const loader = new three.CubeTextureLoader();
        loader.setPath( 'src/textures/cubemap/' );
        return loader.load( [
            'px.png', 'nx.png',
            'py.png', 'ny.png',
            'pz.png', 'nz.png'
        ] );

    }

    private createGlow = () => {
        return new three.ShaderMaterial( 
            {
                uniforms: 
                { 
                    "c":   { value: 1 }, 
                    "p":   { value: 1.4 },
                    glowColor: { value: new three.Color(0xffff00) },
                },
                vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
                side: three.FrontSide,
                blending: three.AdditiveBlending,
                transparent: true,
        }   );
    }

    public isSecure = (positionOfPartner: three.Vector3): boolean => {
        return true;
    }

    public updatePosition(x: number, y: number) {
        this.ring.position.x = x
        this.ring.position.y = y
    }

    public getMarker() {
        return this.marker
    }

    public getRing() {
        return this.ring
    }

    public setState(state: State) {
        this.state = state
    }
}