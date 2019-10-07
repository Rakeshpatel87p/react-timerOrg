import { IS_TICKING } from '../actions/'

export default function clockStatus(state = {}, action) {
    switch(action.type) {
        case IS_TICKING :
            return {
                ...state,
                isTicking: action.bool
            }
        
        default: 
            return state
    }
}