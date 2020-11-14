import React from 'react';
import {Router} from "./Router";
import {NavLink} from "react-router-dom";

export const Layout = () => {
    return (
        <div className={'Layout'}>
            <div className="Layout__nav">
                <div className="Layout__nav_logo">
                    <h1>React shop</h1>
                </div>
                <div className="Layout__nav_menu">
                    <div className="menuItem">
                        <NavLink to={'/'} exact>
                            Shop
                        </NavLink>
                    </div>
                    <div className="menuItem">
                        <NavLink to={'/information'}>
                            Information
                        </NavLink>
                    </div>
                    <div className="menuItem">
                        {/*About page need here*/}
                        <NavLink to={'/information'}>
                            About
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="Layout__content">
                <Router />
            </div>
        </div>
    )
};