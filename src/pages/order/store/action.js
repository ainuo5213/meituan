import {fromJS} from 'immutable'
import {types} from "./index"
import {getData} from '../../../api/request'

export const getOrderData = () => {
    return async dispatch => {
        let data = await getData('/mock/orders.json');
        dispatch({
            type: types.GET_ORDER_DATA,
            orderList: fromJS(data.digestlist)
        })
    }
};