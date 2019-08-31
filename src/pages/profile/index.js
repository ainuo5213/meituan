import React, {Component, Fragment} from 'react'
import {ToolBar} from "../../components"
import './profile.less'
export default class App extends Component {
    render() {
        return (
            <Fragment>
                <div className="profile">
                    <div className="profile-header">
                        <img src="http://i.waimai.meituan.com/static/img/default-avatar.png" alt="" className="avatar"/>
                        <p className="nikename">小明&gt;</p>
                    </div>
                    <div className="profile-content">
                        <ul className="profile-items">
                            <li className="profile-address">收货地址管理</li>
                            <li className="profile-discount">商家代金券</li>
                        </ul>
                        <ul className="profile-items">
                            <li className="profile-feedback">意见反馈</li>
                            <li className="profile-question">常见问题</li>
                        </ul>
                        <p className="profile-tel">
                            客服电话：&nbsp;101-097-77
                        </p>
                        <p className="profile-time">
                            服务时间：&nbsp;9:00-23:00
                        </p>
                    </div>
                </div>
                <ToolBar/>
            </Fragment>
        )
    }
}