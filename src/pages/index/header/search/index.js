import React, {Fragment} from 'react'
import './search.less'

/**
 * 顶部搜索框
 */
export default function Search() {
    return (
        <Fragment>
            <div className="search-bar">
                <div className="bar-loc">
                    <div className="loc-icon"/>
                    <div className="loc-text">郑州市</div>
                </div>
                <div className="search-btn">
                    <p className="place-holder">鸡翅</p>
                </div>
            </div>
        </Fragment>
    )
}