import React, {Component, Fragment} from 'react'
import {Score} from '../../../../../components'
import moment from 'moment'
import './commentItem.less'

export default class App extends Component {

    renderImgs = (comment_pics = []) => {
        if (comment_pics.length) {
            return (
                <div className="img-content">
                    {
                        comment_pics.map((item, index) => {
                            let src = item.url;
                            return (
                                <img key={index} src={src} className='img-item' alt=''/>
                            )
                        })
                    }
                </div>
            )
        }

    };

    renderTags = comment_labels => {
        return comment_labels.map(item => item.content + '，');
    };

    formatTime = time => {
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
    };

    render() {
        let {data} = this.props;
        return (
            <Fragment>
                <div className="comment-item">
                    <div className="left">
                        <img alt='' className="avatar"
                             src={data.user_pic_url || 'http://xs01.meituan.net/waimai_i/img/default-avatar.c4e0230d.png'}/>
                    </div>
                    <div className="right">
                        <div className="right-top">
                            <p className="nickname">{data.user_name}</p>
                            <div className="comment-time">{this.formatTime(data.comment_time)}</div>
                        </div>
                        <div className="right-middle">
                            <div className="star-and-time">
                                <div className="star-content"><Score score={data.order_comment_score}/></div>
                                <div className="send-time">{data.ship_time + '分钟送达'}</div>
                            </div>
                            <div className="comment-text">{data.comment}</div>
                        </div>
                        <div className="right-bottom">
                            {this.renderImgs(data.comment_pics)}
                            {data.praise_food_tip ? <div className="like-info">{data.praise_food_tip}</div> : null}
                            {data.comment_labels.length ?
                                <div className="tag-info">{this.renderTags(data.comment_labels)}</div> : null}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}