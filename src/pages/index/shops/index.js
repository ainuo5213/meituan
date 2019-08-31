import React, {Component, Fragment} from 'react'
import './shopList.less'
import {connect} from 'react-redux'
import {action} from '../store'
import Shop from './shop'

/**
 * 附近商家列表
 */
class Shops extends Component {
    componentDidMount() {
        const {getShops, shops} = this.props;
        if (shops.toJS().length) {
            return
        }
        getShops();
    }

    renderItems = () => {
        const {shops} = this.props;
        const newShops = shops.toJS();
        return newShops.map((item, index) => {
            return (
                <Shop key={index} itemData={item}/>
            )
        })
    };

    render() {
        return (
            <Fragment>
                <div className="list-content">
                    <h4 className="list-title">
                        <span className="title-line"/>
                        <span>附近商家</span>
                        <span className="title-line"/>
                    </h4>
                    {this.renderItems()}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    shops: state.getIn(['index', 'shops'])
});

const mapDispatchToProps = dispatch => ({
    getShops() {
        dispatch(action.getShopData())
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Shops)