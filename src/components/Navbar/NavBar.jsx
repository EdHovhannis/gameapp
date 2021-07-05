import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({role, direction, route }) => {
    return (
        <div className={styles.nav}>
                <div>
                    <span>{role}</span>
                </div>
                <div>
                    <NavLink className={styles.out} exact to={route}>{direction}</NavLink>
                </div>
        </div>
    );
}

export default NavBar;
