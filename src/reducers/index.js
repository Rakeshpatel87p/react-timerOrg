import { combineReducers } from 'redux'
import timedSessions from './timedSessions';
import workSessions from './workSessions';

export default combineReducers({
    timedSessions,
    workSessions
})