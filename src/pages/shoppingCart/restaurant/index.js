import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import {action} from '../store'
import './restaurant.less'

const mapStateToProps = state => ({
    restaurant_data: state.getIn(['shop', 'restaurant_data'])
});

const mapDispatchToProps = dispatch => ({
    getRestaurantData() {
        dispatch(action.getRestaurantData())
    }
});

@connect(mapStateToProps, mapDispatchToProps)
class Restaurant extends Component {

    componentDidMount() {
        this.props.getRestaurantData();
    }

    renderPayType = discounts => {
        if (discounts && discounts.length) {
            return discounts.map((item, index)=>{
                return <p key={index} className="restaurant-pay-type res-section"><img className="icon" src={item.icon_url} alt=''/>{item.info}</p>
            });
        }
    };

    render() {
        let data = this.props.restaurant_data.toJS();
        return (
            <Fragment>
                <div className="restaurant-content">
                    <div className="restaurant-basic">
                        <div className="restaurant-tel res-section">{data.call_center}</div>
                        <div className="restaurant-addr res-section">
                            <div className="addr-wrap">
                                <div className="addr-name">商家地址：</div>
                                <div className="addr-text">{data.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className="restaurant-basic">
                        <p className="restaurant-send-time res-section">配送时间：{data.shipping_time}</p>
                        <p className="restaurant-send-type res-section">配送服务：{data.delivery_type === 1 ? <span><span className="meituan-send">美团专送</span>提供高质量配送服务</span> : '商家配送'}</p>
                    </div>
                    <div className="restaurant-basic">
                        {this.renderPayType(data.discounts2)}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Restaurant