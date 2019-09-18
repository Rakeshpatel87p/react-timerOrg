export const IS_TICKING = 'IS_TICKING';
export const INPUT_TOGGLE = 'INPUT_TOGGLE';

export function isTicking(bool) {
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