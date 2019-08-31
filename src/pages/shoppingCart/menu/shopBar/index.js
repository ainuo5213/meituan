import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {action} from '../../store'
import './shopBar.less'

const mapStateToProps = state => ({
    showChooseContent: state.getIn(['shop', 'showChooseContent']),
    food_spu_tags: state.getIn(['shop', 'food_spu_tags']),
    poi_info: state.getIn(['shop', 'poi_info'])
});

const mapDispatchToProps = dispatch => ({
    changeShowChoose(flag) {
        dispatch(action.changeShowChoose(flag))
    },
    addSelectItem(curIndex, index) {
        dispatch(action.addSelectFood(curIndex, index))
    },
    minusSelectItem(curIndex, index) {
        dispatch(action.minusSelectFood(curIndex, index))
    },
    clearChooseItem() {
        dispatch(action.clearChooseItem())
    },
});

@connect(mapStateToProps, mapDispatchToProps)
class ShopBar extends Component {

    getTotalPrice = () => {
        // 需要总价格，已经选了的foods，选的商品数量
        let {food_spu_tags} = this.props;
        let new_food_spu_tags = food_spu_tags.toJS();
        let totalPrice = 0;
        let selectedNumber = 0;
        let selectedFoods = [];

        for (let i = 0; i < new_food_spu_tags.length; i++) {
            let spus = new_food_spu_tags[i].spus;
            for (let j = 0; j < spus.length; j++) {
                let chooseCount = spus[j].chooseCount;
                if (chooseCount > 0) {
                    selectedNumber += chooseCount;
                    selectedFoods.push(spus[j]);
                    totalPrice += chooseCount * spus[j].min_price
                }
            }
        }
        return {
            totalPrice,
            selectedFoods,
            selectedNumber
        }
    };

    clearCar = () => {
        this.props.clearChooseItem()
    };


    openChooseContent = () => {
        let {showChooseContent, changeShowChoose} = this.props;
        changeShowChoose(!showChooseContent)
    };

    renderChooseItem = data => {
        return data.map((item, index) => {
            return (
                <div className="choose-item" key={index}>
                    <div className="item-name">{item.name}</div>
                    <div className="price">¥{item.min_price * item.chooseCount}</div>
                    <div className="select-content">
                        <div onClick={() => this.minusSelectItem(item)} className="minus"/>
                        <div className="count">{item.chooseCount}</div>
                        <div onClick={() => this.addSelectItem(item)} className="plus"/>
                    </div>
                </div>
            )
        })
    };

    minusSelectItem = item => {
        const {index} = item;
        this.props.minusSelectItem(index.curIndex, index.index)
    };

    addSelectItem = item => {
        const {index} = item;
        this.props.addSelectItem(index.curIndex, index.index)
    };

    render() {
        let data = this.getTotalPrice();
        let shipping_fee = this.props.poi_info.toJS().shipping_fee; // 配送费
        return (
            <Fragment>
                <div className="shop-bar">
                    {this.props.showChooseContent ?
                        <div className="choose-content">
                            <div className="content-top">
                                <div onClick={() => this.clearCar()} className="clear-car">清空购物车</div>
                            </div>
                            {this.renderChooseItem(data.selectedFoods)}
                        </div> : null
                    }
                    <div className="bottom-content">
                        <div onClick={() => this.openChooseContent()} className="shop-icon">
                            {data.selectedNumber > 0 ? <div className="dot-num">{data.selectedNumber}</div> : null}
                        </div>
                        <div className="price-content">
                            <p className="total-price">¥{data.totalPrice}</p>
                            <p className="other-price">另需配送&nbsp;¥{shipping_fee}</p>
                        </div>
                        <div className="submit-btn">去结算</div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ShopBar