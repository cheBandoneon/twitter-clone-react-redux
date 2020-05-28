import React from 'react';
import './pageHeader.scss';

export const PageHeaderComponent = (props) => {

    return(
        <div className = "page-header">
            <h2 className = "page-header__title">{props.pageTitle}</h2>
        </div>
    )
}