import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import Slider from 'react-slick'
import {action} from '../store'
import './category.less'
import {Loading} from "../../../components";

class Category extends Component {

    componentDidMount() {
        this.getData();
    }

    getData () {
        const {fetchData, categoryList} = this.props;
        if (categoryList.toJS().length) {
            return
        }
        fetchData()
    }

    handleClick = (item) => {
        console.log(item)
    };


    renderItems = (item) => {
        if (item) {
            return item.map((item, index) => {
                return (
                    <div key={index} className='category-item' onClick={() => {this.handleClick(item)}}>
                        <img src={item.url} alt="" className='item-icon'/>
                        <p>{item.name}</p>
                    </div>
                )
            })
        }
    };

    renderDot = (len) => {
        const {activeIndex} = this.props;
        let dots = [];
        for (let i = 0; i < len; i++) {
            dots.push(<li key={i} className={'dot' + (activeIndex === i ? ' active' : '')}/>)
        }
        return dots
    };

    getSliderPage = (newCategoryList) => {
        let newCategoryLists = [], len = newCategoryList.length;
        const {totalPage} = this.props;
        let page = Math.ceil(len / totalPage);
        for (let i = 0; i < page; i++) {
            let newCategoryListItem = newCategoryList.splice(0, totalPage);
            newCategoryLists.push(newCategoryListItem)
        }
        return newCategoryLists
    };

    renderContainers = () => {
        let {categoryList, changeActiveIndex} = this.props;
        let newCategoryLists = this.getSliderPage(categoryList.toJS());
        const settings = {
            afterChange: index => {
                changeActiveIndex(index)
            }
        };
        if (newCategoryLists.length > 1) {
            return (
                <Fragment>
                    <Slider {...settings}>
                        {
                            newCategoryLists.map((item, index) => {
                                return (
                                    <div className="category-content clearFix"
                                         key={index}>
                                        {this.renderItems(item)}
                                    </div>
                                )
                            })
                        }
                    </Slider>
                    <div className="item-dot">
                        <ul>
                            {
                                this.renderDot(newCategoryLists.length)
                            }
                        </ul>
                    </div>
                </Fragment>
            )
        } else if (newCategoryLists.length === 1){
            return (
                <div className="category-content clearFix">
                    {this.renderItems(newCategoryLists[0])}
                </div>
            )
        } else {
            return <Loading/>
        }
    };

    render() {
        return (
            <Fragment>
                {this.renderContainers()}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    categoryList: state.getIn(['index', 'categoryList']),
    totalPage: state.getIn(['index', 'totalPage']),
    activeIndex: state.getIn(['index', 'activeIndex'])
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        dispatch(action.getHeaderData())
    },
    changeActiveIndex(index) {
        dispatch(action.changeIndex(index))
    }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category)