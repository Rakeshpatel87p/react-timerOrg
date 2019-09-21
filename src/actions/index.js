export const IS_TICKING = 'IS_TICKING';
export const TIMED_SESSIONS = 'SESSION_COMPLETE';
export const INPUT_TOGGLE = 'INPUT_TOGGLE';

export function isTicking(bool = false) {
    return {
        type: 'IS_TICKING',
        bool
    }
}

export function timedSessions(sessionTime, task = undefined, timestampStart) {
    console.log({sessionTime, task, timestampStart});
    return {
        type: 'TIMED_SESSIONS',
        sessionTime,
        task,
        timestampStart,
    }
}

export function inputToggle(bool) {
    return {
        type: 'INPUT_TOGGLE',
        bool
    }
}