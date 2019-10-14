import { combineReducers } from 'redux'
import clockStatus from './countdownStatus';
import timedSessions from './timedSessions';
import workSessions from './workSessions';

export default combineReducers({
    clockStatus,
    timedSessions,
    workSessions
})