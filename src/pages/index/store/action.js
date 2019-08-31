import {types} from './index'
import {getData} from '../../../api/request'
import {fromJS} from "immutable";

export const changeTabClass = className => ({type: types.CHANGE_TAB_CLASS, activeKey: className});

export const changeIndex = index => ({type: types.CHANGE_INDEX, activeIndex: +index});

export const getHeaderData = () => {
    return async dispatch => {
        let data =  await getData('/mock/head.json');
        dispatch({
            type: types.GET_HEAD_DATA,
            data: fromJS(data.primary_filter)
        })
    }
};

export const getShopData = () => {
    return async dispatch => {
        let data =  await getData('/mock/shops.json');
        dispatch({
            type: types.GET_SHOP_LIST,
            data: fromJS(data.poilist)
        })
    }
};