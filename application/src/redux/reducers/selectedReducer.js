import {SELECT_ORDER, SELECT_ORDER_CLEAR, SELECT_ORDER_COMPLETE, SELECT_ORDER_FAIL} from "../actions/select.types";


const INITIAL_STATE = { order: null, success: false };

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SELECT_ORDER:
            return { ...state, order: action.payload.order };
        case SELECT_ORDER_COMPLETE:
            return { ...state, success: true };
        case SELECT_ORDER_FAIL:
            return { ...state, success: false };
        case SELECT_ORDER_CLEAR:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
}
