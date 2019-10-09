import { mockSessionsDataRef } from '../firebase';

export const TIMED_SESSIONS = 'TIMED_SESSIONS';
export const FETCH_TIMED_SESSIONS_BEGIN = 'FETCH_TIMED_SESSIONS_BEGIN';
export const FETCH_TIMED_SESSIONS_SUCCESS = 'FETCH_TIMED_SESSIONS_SUCCESS';
export const FETCH_TIMED_SESSIONS_FAILURE = 'FETCH_TIMED_SESSIONS_FAILURE';

export function timedSessions(sessionTime, task = undefined, timestampStart) {
    return {
        type: 'TIMED_SESSIONS',
        sessionTime,
        task,
        timestampStart,
    }
}

export function fetchTimedSessions() {
    return (dispatch) => {
        dispatch(fetchTimedSessionsBegin())
        mockSessionsDataRef.once('value').then((snapshot) => {
            console.log(snapshot.val());
            dispatch(fetchTimedSessionsSuccess(snapshot.val()));
        })
        /*
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(res => {
                if (res.error) {
                    throw(res.error);
                }
                setTimeout(() => {
                    dispatch(fetchTimedSessionsSuccess(res));
                }, 2000)

                return res;
            })
            .catch(error => {
                dispatch(fetchTimedSessionsFailure(error));
            })
            */
    }
}

export function fetchTimedSessionsBegin() {
    return {
        type: 'FETCH_TIMED_SESSIONS_BEGIN',
        
    }
}

export function fetchTimedSessionsSuccess(sessions) {
    return {
        type: 'FETCH_TIMED_SESSIONS_SUCCESS',
        sessions
    }
}

export function fetchTimedSessionsFailure() {
    return {
        type: 'FETCH_TIMED_SESSIONS_FAILURE'
    }
}