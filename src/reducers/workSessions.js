import {
    WRITE_TASK_DB_BEGIN,
    WRITE_TASK_DB_SUCCESS,
    WRITE_TASK_DB_FAILURE
} from '../actions';

export default function workSessions(state = {}, action) {
    switch(action.type) {
        case WRITE_TASK_DB_BEGIN : 
            return {
                ...state,
                loading: true
            }
        
        case WRITE_TASK_DB_SUCCESS :
            return {
                ...state,
                loading: false,
                response: action.msg
            }
        
        case WRITE_TASK_DB_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.err
            }

        default: 
            return state
    }
}