export const IS_TICKING = 'IS_TICKING';
export const SESSIONS_COMPLETED = 'SESSION_COMPLETE';
export const INPUT_TOGGLE = 'INPUT_TOGGLE';

export function isTicking(bool = false) {
    return {
        type: 'IS_TICKING',
        bool
    }
}

export function sessionComplete(sessionTime, task = undefined, timestamp) {
    return {
        type: 'SESSIONS_COMPLETED',
        sessionTime,
        task,
        timestamp

    }
}

export function inputToggle(bool) {
    return {
        type: 'INPUT_TOGGLE',
        bool
    }
}