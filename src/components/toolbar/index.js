import React, {Component, Fragment} from 'react'
import './toolbar.less'
import {connect} from 'react-redux'
import {action} from '../../pages/index/store'
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => ({
    tabs: state.getIn(['index', 'tabs']),
    activeKey: state.getIn(['index', 'activeKey']),
});

const mapDispatchToProps = dispatch => ({
    changeTabClass(classNmae) {
        dispatch(action.changeTabClass(classNmae))
    }
});

/**
 * 首页底部菜单栏
 */
//装饰器写法(高阶组件的简单写法)，加入withRouter
@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class Tab extends Component {

    componentDidMount() {
        const {changeTabClass, location} = this.props;
        changeTabClass(location.pathname.slice(1))
    }

    changeTabClass = (activeKey) => {
        const {changeTabClass, history} = this.props;
        history.push(`/${activeKey}`);
        changeTabClass(activeKey)
    };

    renderItems = () => {
        const {tabs, activeKey} = this.props;
        const newTabs = tabs.toJS();
        return newTabs.map((item, index) => {
            let className = item.key + ' tab-item';
            if (item.key === activeKey) {
                className += ' active'
            }
            return (
                <div key={index} className={className} onClick={() => {
                    this.changeTabClass(item.key)
                }}>
                    <div className="tab-icon"/>
                    <div className="tab-name">{item.name}</div>
                </div>
            )
        })
    };

    render() {
        return (
            <Fragment>
                <div className="tab">
                    {this.renderItems()}
                </div>
            </Fragment>
        )
    }
}

export default Tab