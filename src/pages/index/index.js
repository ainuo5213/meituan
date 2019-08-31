import React, {Fragment, Component} from 'react'
import {ToolBar} from '../../components'
import Header from './header'
import Shops from './shops'
import Category from './category'
import {initScroll, setResize, removeResize, scrollStyle} from '../../api/dom'

export default class Index extends Component {
    state = {
        clientHeight: 0,
        scroll: null
    };

    initScroll = () => {
        let scroll = initScroll('.HCS-wrapper');
        this.setState({scroll})
    };

    componentDidMount() {
        this.initScroll();
        this.setHeight();
    }

    componentWillUnmount() {
        removeResize(() => {
            this.setState({scroll: null, clientHeight: 0})
        });
    }

    setHeight = () => {
        let clientHeight = document.documentElement.clientHeight;
        this.setState({clientHeight});
        setResize((clientHeight) => {
            this.setState({clientHeight});
        });
    };

    render() {
        let {clientHeight} = this.state;
        return (
            <Fragment>
                <div className="HCS-wrapper" style={scrollStyle(clientHeight)}>
                    <div className="HCS-content">
                        <Header/>
                        <Category/>
                        <Shops/>
                    </div>
                </div>
                <ToolBar/>
            </Fragment>
        )
    }
}