import * as three from 'three'

export function normalizeCoord(x: number, y: number) {
    const {clientWidth, clientHeight} = document.querySelector('#webcam')
    return [(x / clientWidth) * 2 - 1, -( y / window.innerHeight) * 2 + 1]
}
