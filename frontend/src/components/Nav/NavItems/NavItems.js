import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = () => (
    <ul className={classes.NavItems}>
        <NavItem link="/register">Registrarse</NavItem>
        <NavItem link="/payment" exact>Realizar pago</NavItem>
        <NavItem link="/balance" >Consultar saldo</NavItem>
        <NavItem link="/add-balance" >Recargar saldo</NavItem>
    </ul>
);

export default navItems;