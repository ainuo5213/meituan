import React, {Component, Fragment} from 'react'
import './main.less'
import {action} from '../store'
import {connect} from 'react-redux'
import Item from "../Item";
import {initScroll, setResize, removeResize, scrollStyle} from "../../../api/dom";

class Order extends Component {

    state = {
        scroll: null,
        clientHeight: 0
    };

    /**
     * 设定高度， 获取数据
     */
    componentWillMount() {
        this.fetchData();
        this.setHeight();
    }

    /**
     * 初始化better-scroll
     */
    initScroll = () => {
        let scroll = initScroll('.order-wrapper');
        this.setState({scroll})
    };

    /**
     * 组件渲染成功之后，加载滚动组件
     */
    componentDidMount() {
        this.initScroll();
    }

    setHeight = () => {
        let clientHeight = document.documentElement.clientHeight;
        this.setState({clientHeight});
        setResize((clientHeight) => {
            this.setState({clientHeight});
        });
    };

    /**
     * 切换组件，清除state
     */
    componentWillUnmount() {
        removeResize(() => {
            this.setState({scroll: null, clientHeight: 0})
        });
    }

    /**
     * 获取数据
     */
    fetchData = () => {
        const {getOrderData, orderList} = this.props;
        if (orderList.toJS().length) {
            return
        }
        getOrderData()
    };
    /**
     * 渲染item
     * @returns {*[] | *}
     */
    renderList = () => {
        const {orderList} = this.props;
        if (orderList.toJS().length) {
            let newOrderList = orderList.toJS();
            return newOrderList.map(item => {
                return (
                    <Item key={item.order_id} itemData={item}/>
                )
            })
        }
    };

    render() {
        let {clientHeight} = this.state;
        return (
            <Fragment>
                <div className="order-wrapper" style={scrollStyle(clientHeight)}>
                    <div className="order-inner">
                        <div className="header">订单</div>
                        <div className="order-list">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    orderList: state.getIn(['order', 'orderList'])
});
const mapDispatchToProps = dispatch => ({
    getOrderData() {
        dispatch(action.getOrderData())
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order)