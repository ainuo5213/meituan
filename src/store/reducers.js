import {combineReducers} from 'redux-immutable'
import {indexReducer} from '../pages/index/store'
import {orderReducer} from '../pages/order/store'
import {shopReducer} from '../pages/shoppingCart/store'

export default combineReducers({
    index: indexReducer,
    order: orderReducer,
    shop: shopReducer
})

