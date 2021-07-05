import React from 'react';
import { Button } from './../../components/Button/button';
import styles from './Nav.module.css';

const Nav = (props) => { 
    return (
        <div className={styles.nav}>
            <nav>
                <Button primary="primary" onClick={()=>props.history.push("/admin")}>Я администратор</Button>
                <Button primary="primary" onClick={()=>props.history.push("/participant")}>Я участник</Button>
            </nav>
        </div>
    );
}

export default Nav;
