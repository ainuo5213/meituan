import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import './menuItem.less'
import {action} from '../../store'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    addSelectItem(index) {
        dispatch(action.addSelectItem(index))
    },
    minusSelectItem(index) {
        dispatch(action.minusSelectItem(index))
    }
});

@connect(mapStateToProps, mapDispatchToProps)
class MenuItem extends Component {
    minusSelectItem = index => {
        this.props.minusSelectItem(index)
    };

    addSelectItem = index => {
        this.props.addSelectItem(index)
    };

    render() {
        let {data, _index} = this.props;
        return (
            <Fragment>
                <div className="menu-item">
                    <img className="img" src={data.picture} alt=''/>
                    <div className="menu-item-right">
                        <p className="item-title">{data.name}</p>
                        <p className="item-desc two-line">{data.description}</p>
                        <p className="item-zan">{data.praise_content}</p>
                        <p className="item-price">¥{data.min_price}<span className="unit">/{data.unit}</span></p>
                    </div>
                    <div className="select-count">
                        {data.chooseCount > 0 ?
                            <div onClick={() => this.minusSelectItem(_index)} className="minus"/> : null}
                        {data.chooseCount > 0 ? <div className="count">{data.chooseCount}</div> : null}
                        <div onClick={() => this.addSelectItem(_index)} className="plus"/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default MenuItem