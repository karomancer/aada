import * as three from 'three'

export function normalizeCoord(event: MouseEvent) {
    return new three.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1)
}