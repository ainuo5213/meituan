import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {Score} from '../../../../components'
import './shop.less'

@withRouter
class Shop extends Component {
    /**
     * 渲染品牌
     * @param brandType
     * @returns {*}
     */
    renderBrand = (brandType) => {
        if (brandType) {
            return <div className="brand brand-pin">品牌</div>
        } else {
            return <div className="brand brand-new">新店</div>
        }
    };
    /**
     * 是否是美团专送
     * @param type
     * @returns {*}
     */
    renderSpecialDis = (type) => {
        if (type) {
            return <div className="item-special">美团专送</div>
        }
    };
    /**
     * 渲染店铺活动
     * @param data
     * @returns {*}
     */
    renderOthers = (data) => {
        let discounts = data.discounts2;
        if (discounts.length) {
            return (
                discounts.map((item, index) => {
                    return (
                        <div className="other-infos" key={index}>
                                <img src={item.icon_url} className='other-tag' alt=""/>
                            <div className="other-content">{item.info}</div>
                        </div>
                    )
                })
            )
        }
    };
    goToShop = (id) => {
        this.props.history.push('/shop/menu')
    };

    render() {
        const {itemData} = this.props;
        return (
            <Fragment>
                <div className="item-content scale-1px" onClick={() => {
                    this.goToShop(itemData.id)
                }}>
                    <img src={itemData.pic_url} className='item-img' alt=""/>
                    {this.renderBrand(itemData.brand_type)}
                    <div className="item-info-content">
                        <p className="item-title">{itemData.name}</p>
                        <div className="item-desc clearFix">
                            <div className="item-score"><Score score={itemData.wm_poi_score}/></div>
                            <div className="item-count">月售{itemData.month_sale_num}份</div>
                            <div className="item-distance">&nbsp;{itemData.distance}</div>
                            <div className="item-time">{itemData.mt_delivery_time}&nbsp;|</div>
                        </div>
                        <div className="item-price">
                            <div className="item-dis-price">{itemData.min_price_tip}</div>
                            {this.renderSpecialDis(itemData.delivery_type)}
                        </div>
                        <div className="item-others">
                            {this.renderOthers(itemData)}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Shop