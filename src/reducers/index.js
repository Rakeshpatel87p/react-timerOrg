import { IS_TICKING, INPUT_TOGGLE } from '../actions'
import { combineReducers } from 'redux'

export function isTicking(state = {}, action) {
    switch(action.type) {
        case IS_TICKING :
            console.log(action.bool);
            return state

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