import {fromJS} from 'immutable'
import {types} from './index'

let defaultState = fromJS({
    orderList: []
});

export default function orderReducer(state = defaultState, action) {
    switch (action.type) {
        case types.GET_ORDER_DATA:
            return state.merge({
                orderList: action.orderList
            });
        default:
            return state
    }
}