import {types} from './index'
import {fromJS} from 'immutable'
import {toolbarKey} from '../../../api/config'

let defaultState = fromJS({
    tabs: [
        {
            name: '首页',
            key: toolbarKey.index
        },
        {
            name: '订单',
            key: toolbarKey.order
        },
        {
            name: '我的',
            key: toolbarKey.profile
        },
    ],
    shops: [],
    categoryList: [],
    totalPage: 8,
    activeIndex: 0,
    activeKey: toolbarKey.index
});

function Index(state = defaultState, action) {
    switch (action.type) {
        case types.CHANGE_TAB_CLASS:
            return state.set('activeKey', action.activeKey);
        case types.CHANGE_INDEX:
            return state.set('activeIndex', action.activeIndex);
        case types.GET_HEAD_DATA:
            return state.merge({
                'categoryList': action.data
            });
        case types.GET_SHOP_LIST:
            return state.set('shops', action.data);
        default:
            return state;
    }
}

export default Index
