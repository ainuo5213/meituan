import React, {Component, Fragment} from 'react'
import $ from 'jquery'
import {connect} from 'react-redux'
import {action} from '../store'
import {findNodeByIndex} from '../../../api/dom'
import './menu.less'
import ShopBar from './shopBar'
import MenuItem from './menuItem'
import BScroll from "better-scroll";

const mapStateToProps = state => ({
    food_spu_tags: state.getIn(['shop', 'food_spu_tags']),
    curIndex: state.getIn(['shop', 'curIndex']),
    navHeight: state.getIn(['shop', 'navHeight']),
    tabHeight: state.getIn(['shop', 'tabHeight']),
});

const mapDispatchToProps = dispatch => ({
    changeIndex(index) {
        dispatch(action.changeIndex(index))
    }
});

@connect(mapStateToProps, mapDispatchToProps)
class Menu extends Component {
    /**
     * 改变左侧的index值，使其高亮
     * @param index
     * @returns {Promise<void>}
     */
    changeIndex = async index => {
        const {changeIndex} = this.props;
        await changeIndex(index);
        const {curIndex} = this.props;
        let correctNode = findNodeByIndex(this.item, curIndex);
        this.bscrollRight.scrollToElement(correctNode, 300, 0, -10)
    };

    state = {
        load: true
    };

    /**
     * 摧毁better-scroll
     */
    componentWillUnmount() {
        this.bscrollLeft.destroy();
        this.bscrollRight.destroy();
    }

    /**
     * 切换页面之后，重新加载better-scroll
     */
    componentDidMount() {
        if (this.props.food_spu_tags.toJS().length) {
            this.initScroll();
        }
    }

    shouldActive = () => {
        const {tabHeight, navHeight} = this.props;
        for (let i = 0; i < $('.scroll-item').length; i++) {
            let top = $('.scroll-item')[i].getBoundingClientRect().top;
            let bottom = $('.scroll-item')[i].getBoundingClientRect().bottom;
            let flag1 = (top > tabHeight + navHeight) && (top < tabHeight + navHeight + this.rightContent.offsetHeight);
            let flag2 = (bottom > tabHeight + navHeight) && (bottom < tabHeight + navHeight + this.rightContent.offsetHeight);
            if (flag1 || flag2) {
                this.props.changeIndex(i);
                return true
            }
        }
        return false;
    };
    /**
     * 初始化better-scroll
     */
    initScroll = () => {
        if (!this.bscrollLeft && !this.bscrollRight && this.props.food_spu_tags.toJS().length) {
            this.bscrollRight = new BScroll('.right-content', {
                probeType: 3
            });
            this.bscrollLeft = new BScroll('.left-bar');
            this.bscrollRight.on('scroll', pos => {
                this.shouldActive()
            })
        }
    };

    /**
     * 外部传入参数调用，直接调用componentDidMount无效
     */
    componentDidUpdate() {
        this.initScroll();
    }

    /**
     * 渲染左边菜单栏
     * @returns {*[] | *}
     */
    renderLeft = () => {
        let data = this.props.food_spu_tags.toJS();
        return data.map((item, index) => {
            let cls = this.props.curIndex === index ? 'left-item active' : 'left-item';
            return (
                <div className={cls} key={index} onClick={() => {
                    this.changeIndex(index)
                }}>
                    <div className="item-text">{item.icon ?
                        <img className="item-icon" src={item.icon} alt=''/> : null}{item.name}</div>
                </div>
            )
        })
    };
    /**
     * 渲染右边食物栏
     * @param spus
     * @returns {*}
     */
    renderRightList = spus => {
        return spus.map((spu, index) => {
            if (!spu.chooseCount) {
                spu.chooseCount = 0;
            }
            return <MenuItem key={index} data={spu} _index={index}/>
        })
    };

    renderRight = () => {
        let {food_spu_tags} = this.props, new_food_spu_tags = food_spu_tags.toJS();
        if (new_food_spu_tags.length) {
            return (
                <div key={2} className="right-list">
                    <div className="right-list-inner" ref={el => this.item = el}>
                        {
                            new_food_spu_tags.map((item, index) => {
                                let title = <p key={1} className="right-title">{item.name}</p>;
                                return (
                                    <div data-index={index} key={index} className="scroll-item">
                                        {
                                            [
                                                title,
                                                this.renderRightList(item.spus)
                                            ]
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    };

    render() {
        return (
            <Fragment>
                <div className="menu-inner">
                    <div className="left-bar">
                        <div className="left-inner-bar" ref={el => this.leftBar = el}>
                            {this.renderLeft()}
                        </div>
                    </div>
                    <div className="right-content" ref={el => this.rightContent = el}>
                        {this.renderRight()}
                    </div>
                    <ShopBar/>
                </div>
            </Fragment>
        )
    }
}

export default Menu