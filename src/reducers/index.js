import { IS_TICKING, INPUT_TOGGLE } from '../actions'
import { combineReducers } from 'redux'

export function isTicking(state = {}, action) {
    console.log(action)
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

export function inputToggle(state = {}, action) {
    switch(action.type) {
        case INPUT_TOGGLE :
            return state
        default:
            return state
    }
}

export default combineReducers({
    isTicking,
    inputToggle
})