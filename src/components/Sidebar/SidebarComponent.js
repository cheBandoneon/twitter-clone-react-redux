import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.svg';
import './sidebar.scss';

export const SidebarComponent = () => {

    return (
       <aside className = "twitter-main-sidebar">
           <ul className="twitter-sidebar-menu">
               <li><img className="site-logo" src={logo}></img></li>
                <li><Link to={"/"}>Home</Link></li> 
                <li><Link to={"/explore"}>Explore</Link></li>
           </ul>
       </aside>
    )
}