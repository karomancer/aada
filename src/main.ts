import * as three from 'three'

import Relationship from './Relationship'

const relationship = new Relationship()

var animate = function () {
    requestAnimationFrame( animate );
    relationship.render()
};


animate()