import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import CommentItem from './commentItem'

const mapStateToProps = state => ({
    comments_data: state.getIn(['shop', 'comments_data']),
});

const mapDispatchToProps = dispatch => ({});

@connect(mapStateToProps, mapDispatchToProps)
class CommentList extends Component {

    renderList = () => {
        const {comments_data} = this.props, new_comments_data = comments_data.toJS();
        let comments = new_comments_data.comments;
        if (new_comments_data && comments) {
            return comments.map((item, index) => {
                return <CommentItem key={index} data={item}/>
            });
        }
    };

    state = {
        height: 0,
    };

    render() {
        return (
            <Fragment>
                <div className="comment-wrapper">
                    <div className="comment-list">
                        {this.renderList()}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CommentList