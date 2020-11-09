import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import NavBar from '../../components/Nav/NavBar/NavBar';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <NavBar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;