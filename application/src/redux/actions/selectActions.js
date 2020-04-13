import {
    SELECT_ORDER,
    SELECT_ORDER_CLEAR,
    SELECT_ORDER_COMPLETE,
    SELECT_ORDER_DELETE,
    SELECT_ORDER_FAIL
} from './select.types';
import { SERVER_IP } from '../../private';

const EDIT_ORDER_URL = `${SERVER_IP}/api/edit-order`;
const DELETE_ORDER_URL = `${SERVER_IP}/api/delete-order`;

const editOrderFail = (email, token) => {
    return {
        type: SELECT_ORDER_FAIL,
        payload: {
            email,
            token,
        }
    }
};

const editOrderComplete = (response) => {
    return {
        type: SELECT_ORDER_COMPLETE,
        payload: {
            response
        }
    }
};

export const editOrder = (order) => {
    return (dispatch) => {
        fetch(EDIT_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(response => {
                if (response.success) {
                    dispatch(editOrderComplete(response));
                }
            })
    };
};

export const selectedOrderDelete = (order) => {
    return (dispatch) => {
        fetch(DELETE_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id: order._id,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(response => {
                if (response.success) {
                    dispatch(editOrderComplete(response));
                }
            })
    };
};

export const selectOrderClear = () => {
    return {
        type: SELECT_ORDER_CLEAR,
        payload: null,
    }
};


export const selectOrder = (order) => {
    console.log('select order', order);
    return {
        type: SELECT_ORDER,
        payload: order,
    }
};
