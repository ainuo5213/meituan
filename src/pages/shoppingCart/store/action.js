import {fromJS} from 'immutable'
import {types} from './index'
import {getData} from "../../../api/request";

export const getFoodData = () => {
    return async dispatch => {
        let data = await getData('/mock/food.json');
        let title = data.poi_info.name;
        let food_spu_tags = data.food_spu_tags;
        let poi_info = data.poi_info;
        dispatch({
            type: types.GET_SHOP_INFO,
            title,
            poi_info: fromJS(poi_info),
            food_spu_tags: fromJS(food_spu_tags),
            food_data: fromJS({data})
        })
    }
};

export const getCommentData = () => {
    return async dispatch => {
        let comments_data = await getData('/mock/comments.json');
        dispatch({
            type: types.GET_COMMENT_DATA,
            comments_data: fromJS(comments_data)
        });
    }
};

export const getRestaurantData = () => {
    return async dispatch => {
        let restaurant_data = await getData('/mock/restaurant.json');
        dispatch({
            type: types.GET_RESTAURANT_DATA,
            restaurant_data: fromJS(restaurant_data)
        })
    }

};

export const setNavHeaderHeight = height => ({type: types.SET_NAV_HEADER_HEIGHT, height});

export const setTabHeight = height => ({type: types.SET_TAB_HEIGHT, height});

export const changeIndex = index => ({type: types.CHANGE_INDEX, curIndex: index});

export const addSelectItem = index => ({type: types.ADD_SELECT_ITEM, index});

export const minusSelectItem = index => ({type: types.MINUSS_ELECT_ITEM, index});

export const changeShowChoose = flag => ({type: types.CHANGE_SHOW_CHOOSE, flag});

export const addSelectFood = (curIndex, index) => ({type: types.ADD_SELECT_FOOD, curIndex, index});

export const minusSelectFood = (curIndex, index) => ({type: types.MINUS_SELECT_FOOD, curIndex, index});

export const clearChooseItem = () => ({type: types.CLEAR_CHOOSE_ITEM});