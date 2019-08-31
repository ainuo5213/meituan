import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {action} from '../../pages/shoppingCart/store'
import './navHeader.less'

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    setNavHeaderHeight(height) {
        dispatch(action.setNavHeaderHeight(height))
    }
});

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class NavHeader extends Component {
    goBack() {
        this.props.history.replace(this.props.target)
    }

    componentDidMount() {
        let height = this.header.offsetHeight;
        this.props.setNavHeaderHeight(height)
    }

    render() {
        return (
            <Fragment>
                <div className="nav-header" ref={el => this.header = el}>
                    <div className="back-icon" onClick={() => {
                        this.goBack()
                    }}>
                    </div>
                    <h4 className="title">{this.props.title}</h4>
                </div>
            </Fragment>
        )
    }
}

export default NavHeader