import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './item.less'

class Item extends Component {

    renderMore = (data, index) => {
        return (
            <div className="product-item" key={index}>
                <span>...</span>
                <div className="product-pay">
                    总计{data.product_count}个菜，实付￥<span className='total-price'>{data.total}</span>
                </div>
            </div>
        )
    };

    renderNormal = (item, index) => {
        return (
            <div className="product-item" key={index}>
                {item.product_name}
                <div className="product-count">x{item.product_count}</div>
            </div>
        )
    };

    renderProduct = (data) => {
        let list = data.product_list;
        list.push({'type': 'more'});
        return list.map((item, index) => {
            if (item.type === 'more') {
                return this.renderMore(data, index)
            } else {
                return this.renderNormal(item, index)
            }
        });
    };

    renderComment = data => {
        let evaluation = !data.is_comment;
        if (evaluation) {
            return (
                <div className="evaluation">
                    <div className="evaluation-btn">评价</div>
                </div>
            )
        }

    };

    render() {
        const {itemData} = this.props;
        return (
            <Fragment>
                <div className="order-item">
                    <div className="order-item-inner">
                        <img src={itemData.poi_pic} alt="" className="item-img"/>
                        <div className="item-right">
                            <div className="item-top">
                                <p className="order-shop one-line">{itemData.poi_name}</p>
                                <div className="arrow"/>
                                <div className="order-state">{itemData.status_description}</div>
                            </div>
                            <div className="item-bottom">
                                {this.renderProduct(itemData)}
                            </div>
                        </div>
                    </div>
                    {this.renderComment(itemData)}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    orderList: state.getIn(['order', 'orderList'])
});
const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item)