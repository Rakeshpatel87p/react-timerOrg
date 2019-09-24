import { IS_TICKING, TIMED_SESSIONS} from '../actions/'

export default function clockStatus(state = {}, action) {
    switch(action.type) {
        case IS_TICKING :
            return {
                ...state,
                isTicking: action.bool
            }
        case TIMED_SESSIONS : 
            return [
                state
            ]
        
        default: 
            return state
    }
}