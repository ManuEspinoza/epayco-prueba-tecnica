import React from 'react';
import classes from './NavBar.module.css';
import NavItems from '../NavItems/NavItems';

const navBar = ( props ) => (
    <header className={classes.NavBar}>
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
);

export default navBar;