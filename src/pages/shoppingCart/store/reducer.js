import {fromJS} from 'immutable'
import {shopKey} from '../../../api/config'
import {types} from './index'

let defaultState = fromJS({
    tabs: [
        {
            name: '点菜',
            key: shopKey.menu
        },
        {
            name: '评价',
            key: shopKey.comment
        },
        {
            name: '商家',
            key: shopKey.restaurant
        }
    ],
    title: '',
    food_spu_tags: [],
    food_data: {},
    poi_info: {},
    curIndex: 0,
    comments_data: {},
    restaurant_data: {},
    navHeight: 0,
    tabHeight: 0,
    showChooseContent: false
});

const dealWithSelectItem = function (state, index, type) {
    // 首先要找到左边对应的food_spu_tags
    let food_spu_tags = state.get('food_spu_tags').toJS();
    let curIndex = state.get('curIndex');
    let cur_food_spu_tags = food_spu_tags[curIndex];
    // 然后找到对应的食物列表
    let curFood = cur_food_spu_tags.spus[index];
    if (type === 'add') {
        if (!curFood.chooseCount) {
            curFood.chooseCount = 0
        }
        curFood.chooseCount++;
        if (!curFood.index) {
            curFood.index = {
                'curIndex': curIndex,
                'index': index
            };
        }
    } else {
        curFood.chooseCount--;
    }
    return fromJS(food_spu_tags)
};

const dealWithSelectFood = function (state, curIndex, index, type) {
    let food_spu_tags = state.get('food_spu_tags').toJS();
    let curFood = food_spu_tags[curIndex].spus[index];
    if (type === 'add') {
        curFood.chooseCount += 1
    } else {
        curFood.chooseCount -= 1
    }
    return fromJS(food_spu_tags);
};

const clearChooseItem = function (state) {
    let food_spu_tags = state.get('food_spu_tags'), new_food_spu_tags = food_spu_tags.toJS();
    for (let i = 0; i < new_food_spu_tags.length; i++) {
        let spuses = new_food_spu_tags[i].spus;
        let spuses_len = spuses.length;
        for (let j = 0; j < spuses_len; j++) {
            let curFood = spuses[j];
            if (curFood.chooseCount > 0) {
                curFood.chooseCount = 0
            }
        }
    }
    return fromJS(new_food_spu_tags);
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case types.GET_SHOP_INFO:
            return state.merge({
                title: action.title,
                food_data: action.food_data,
                food_spu_tags: action.food_spu_tags,
                poi_info: action.poi_info
            });
        case types.CHANGE_INDEX:
            return state.set('curIndex', action.curIndex);
        case types.GET_RESTAURANT_DATA:
            return state.set('restaurant_data', action.restaurant_data);
        case types.CLEAR_CHOOSE_ITEM:
            let food_spu_tags_init = clearChooseItem(state);
            return state.set('food_spu_tags', food_spu_tags_init);
        case types.GET_COMMENT_DATA:
            return state.set('comments_data', action.comments_data);
        case types.ADD_SELECT_FOOD:
            let food_spu_tags_add = dealWithSelectFood(state, action.curIndex, action.index, 'add');
            return state.set('food_spu_tags', food_spu_tags_add);
        case types.MINUS_SELECT_FOOD:
            let food_spu_tags_minus_2 = dealWithSelectFood(state, action.curIndex, action.index, 'minus');
            return state.set('food_spu_tags', food_spu_tags_minus_2);
        case types.ADD_SELECT_ITEM:
            let food_spu_tags_plus = dealWithSelectItem(state, action.index, 'add');
            return state.set('food_spu_tags', food_spu_tags_plus);
        case types.MINUSS_ELECT_ITEM:
            let food_spu_tags_minus = dealWithSelectItem(state, action.index, 'minus');
            return state.set('food_spu_tags', food_spu_tags_minus);
        case types.CHANGE_SHOW_CHOOSE:
            return state.set('showChooseContent', action.flag);
        case types.SET_TAB_HEIGHT:
            return state.set('tabHeight', action.height);
        case types.SET_NAV_HEADER_HEIGHT:
            return state.set('navHeight', action.height);
        default:
            return state
    }
}