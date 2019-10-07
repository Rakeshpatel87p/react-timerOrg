import { combineReducers } from 'redux'
import clockStatus from './countdownStatus';
import timedSessions from './timedSessions';

export default combineReducers({
    clockStatus,
    timedSessions
})