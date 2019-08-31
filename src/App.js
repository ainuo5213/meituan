import React, {Component, Fragment} from 'react'
import {pageRoute} from './route'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <Router>
                    <Switch>
                        {
                            pageRoute.map((item, index) => {
                                return (
                                    <Route key={index} path={item.pathname}
                                           render={props => <item.component {...props}/>}/>
                                )
                            })
                        }
                        <Redirect exact from='/' to='/index'/>
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}