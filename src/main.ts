import * as three from 'three'

import Relationship from './js/attachment/Relationship'
import PeopleTracker from './js/PeopleTracker'

const relationship = new Relationship()

var animate = function () {
    requestAnimationFrame( animate );
    relationship.render()
};

animate()

const setupPeopleTracker = () => {
    const peopleTracker = new PeopleTracker(relationship.updatePosition)
}

setupPeopleTracker()
