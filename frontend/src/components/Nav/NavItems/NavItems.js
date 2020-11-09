import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
    <ul className={classes.NavItems}>
        <NavItem link="/register">Registrarse</NavItem>
        <NavItem link="/payment" exact>Realizar pago</NavItem>
    </ul>
);

export default navItems;