import React, {Component, Fragment} from 'react'
import './score.less'
export default class App extends Component {
    /**
     * 星级评分
     * @param score
     * @returns {Array}
     */
    renderScore = (score = '') => {
        score = '' + score;
        let scoreArr = score.split('.');
        let fullStar = parseInt(scoreArr[0]); //满星个数
        let halfStar = parseInt(scoreArr[1]) >= 5 ? 1 : 0; //半星个数
        let nullStar = 5 - fullStar - halfStar;//0星个数

        let stars = [];
        for (let i = 0; i < fullStar; i++) {
            stars.push(<div key={i + 'full'} className='star full-star'/>)
        }
        if (halfStar) {
            for (let i = 0; i < halfStar; i++) {
                stars.push(<div key={i + 'half'} className='star half-star'/>)
            }
        }
        if (nullStar) {
            for (let i = 0; i < nullStar; i++) {
                stars.push(<div key={i + 'null'} className='star null-star'/>)
            }
        }
        return stars
    };

    render() {
        return (
            <Fragment>
                {this.renderScore(this.props.score)}
            </Fragment>
        )
    }
}