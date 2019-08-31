import React, {Fragment} from 'react'
import './header.less'
import SearchBar from './search'


/**
 * 顶部header
 */
export default function Header() {
    return (
        <Fragment>
            <div className="header">
                <SearchBar/>
                <img src="//xs01.meituan.net/waimai_i/img/bannertemp.e8a6fa63.jpg" className="banner-img" alt=""/>
            </div>
        </Fragment>
    )
}
