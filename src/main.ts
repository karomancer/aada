import * as three from 'three'

import Relationship from './Relationship'
import PeopleTracker from './PeopleTracker'

const relationship = new Relationship()

var animate = function () {
    requestAnimationFrame( animate );
    relationship.render()
};

animate()

// const peopleTracker = new PeopleTracker()