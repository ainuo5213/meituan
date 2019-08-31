import React, {Component, Fragment} from 'react'
import {NavLink, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import './shopingCart.less'
import {route} from './route'
import NavHeader from "../../components/navHeader"
import {action} from './store'

const mapStateToProps = state => ({
    tabs: state.getIn(['shop', 'tabs']),
    title: state.getIn(['shop', 'title']),
    showChooseContent: state.getIn(['shop', 'showChooseContent'])
});
const mapDispatchToProps = dispatch => ({
    getData() {
        dispatch(action.getFoodData())
    },
    changeShowChoose(flag) {
        dispatch(action.changeShowChoose(flag))
    },
    setTabHeight(height) {
        dispatch(action.setTabHeight(height))
    }
});

@connect(mapStateToProps, mapDispatchToProps)
class ShoppingCart extends Component {

    async componentWillMount() {
        this.props.getData()
    }

    componentDidMount() {
        let height = this.tab.offsetHeight;
        this.props.setTabHeight(height)
    }

    renderTabs = () => {
        const {tabs} = this.props;
        const newTabs = tabs.toJS();
        return newTabs.map((newTab, index) => {
            return <NavLink key={newTab.key} activeClassName="active" className="tab-item"
                            to={'/shop/' + newTab.key}>{newTab.name}</NavLink>
        });
    };

    closeChooseContent = () => {
        let {showChooseContent, changeShowChoose} = this.props;
        changeShowChoose(!showChooseContent)
    };

    render() {
        return (
            <Fragment>
                <div className="detail">
                    <NavHeader title={this.props.title} target='/index'/>
                    <div className="tab-bar" ref={el => this.tab = el}>
                        {
                            this.renderTabs()
                        }
                    </div>
                    {
                        route.map((item, index) => {
                            return (
                                <Route key={index} path={item.pathname}
                                       render={props => <item.component {...props} />}/>
                            )
                        })
                    }
                </div>
                {this.props.showChooseContent ? <div className="mask" onClick={this.closeChooseContent}/> : null}
            </Fragment>
        )
    }
}

export default ShoppingCart