import { 
    TIMED_SESSIONS, 
    FETCH_TIMED_SESSIONS_BEGIN, 
    FETCH_TIMED_SESSIONS_SUCCESS, 
    FETCH_TIMED_SESSIONS_FAILURE } from '../actions/timedSessions';

export default function timedSessions(state = {}, action) {
    switch(action.type) {
        case FETCH_TIMED_SESSIONS_BEGIN :
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_TIMED_SESSIONS_SUCCESS :
            console.log(action.sessions);
            return {
                ...state,
                loading: false,
                sessions: action.sessions
            }

        case FETCH_TIMED_SESSIONS_FAILURE:
            return {
                ...state,
                loading: false,
                //error: action.payload.error,
            }
        
        default: 
            return state
    }
}