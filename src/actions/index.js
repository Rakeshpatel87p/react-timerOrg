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

export function writeTaskDb(session) {
    return (dispatch) => {
        dispatch(writeTaskDbBegin());
        const msg = 'success';
        dispatch(writeTaskDbSuccess(msg));

    }
}

export function writeTaskDbBegin() {
    return {
        type: 'WRITE_TASK_DB_BEGIN'
    }
}

export function writeTaskDbSuccess(msg) {
    return {
        type: 'WRITE_TASK_DB_SUCCESS',
        msg
    }
}

export function writeTaskDbFailure(err) {
    return {
        type: 'WRITE_TASK_DB_FAILURE',
        err
    }
}