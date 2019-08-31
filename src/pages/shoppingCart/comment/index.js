import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {action} from '../store'
import {Score} from '../../../components'
import CommentList from './commentList'
import './comment.less'
import BScroll from "better-scroll";

const mapStateToProps = state => ({
    comments_data: state.getIn(['shop', 'comments_data']),
    navHeight: state.getIn(['shop', 'navHeight']),
    tabHeight: state.getIn(['shop', 'tabHeight']),
});

const mapDispatchToProps = dispatch => ({
    getCommentData() {
        dispatch(action.getCommentData())
    }
});

@connect(mapStateToProps, mapDispatchToProps)
class Comment extends Component {
    componentWillMount() {
        this.props.getCommentData();
    }

    state = {
        height: 0
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            height: document.documentElement.clientHeight - nextProps.navHeight - nextProps.tabHeight
        }, () => {
            this.initScroll()
        });
    }


    componentWillUnmount() {
        this.commentScroll.destroy()
    }

    initScroll = () => {
        if (!this.commentScroll) {
            this.commentScroll = new BScroll('.comment')
        }
    };

    render() {
        let data = this.props.comments_data.toJS();
        console.log(this.props.navHeight + this.props.tabHeight)
        return (
            <Fragment>
                <div className="comment" style={{height: this.state.height, paddingBottom: `${this.props.navHeight + this.props.tabHeight})`}}>
                    <div className="comment-inner">
                        <div className="comment-score">
                            <div className="mail-comment-score">
                                <div className="mail-score">{data.comment_score}</div>
                                <div className="mail-text">商家评价</div>
                            </div>
                            <div className="other-score-content">
                                <div className="taste-score">
                                    <div className="taste-text">口味</div>
                                    <div className="taste-star-wrap">
                                        <Score score={data.food_score}/>
                                    </div>
                                    <div className="taste-score-text">{data.food_score}</div>
                                </div>
                                <div className="package-score">
                                    <div className="package-text">包装</div>
                                    <div className="package-star-wrap"><Score score={data.pack_score}/></div>
                                    <div className="package-score-text">{data.pack_score}</div>
                                </div>
                                <div className="send-score-content">
                                    <div className="send-score">{data.delivery_score}</div>
                                    <div className="send-text">商家评价</div>
                                </div>
                            </div>
                        </div>
                        <CommentList/>
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default Comment