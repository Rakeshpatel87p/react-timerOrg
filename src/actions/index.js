import { rakeshWorkSessions } from '../firebase';

export const IS_TICKING = 'IS_TICKING';
export const INPUT_TOGGLE = 'INPUT_TOGGLE';
export const WRITE_TASK_DB_BEGIN = 'WRITE_TASK_DB_BEGIN';
export const WRITE_TASK_DB_SUCCESS = 'WRITE_TASK_DB_SUCCESS';
export const WRITE_TASK_DB_FAILURE = 'WRITE_TASK_DB_FAILURE';


export function isTicking(bool = false) {
    return {
        type: 'IS_TICKING',
        bool
    }
}

export function inputToggle(bool) {
    return {
        type: 'INPUT_TOGGLE',
        bool
    }
}

export function writeTaskToDb() {
    return (dispatch) => {
        dispatch(writeTaskDbBegin());
        rakeshWorkSessions().set({
            sessionTime: "test",
            task: "test"
        })
        dispatch(writeTaskDbSuccess())

    }
}

export function writeTaskDbBegin() {
    return {
        type: 'WRITE_TASK_DB_BEGIN'
    }
}

export function writeTaskDbSuccess() {
    return {
        type: 'WRITE_TASK_DB_SUCCESS'
    }
}

export function writeTaskDbFailure(err) {
    return {
        type: 'WRITE_TASK_DB_FAILURE',
        err
    }
}