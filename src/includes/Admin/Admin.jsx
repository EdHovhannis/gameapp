import React from 'react';
import styles from './Admin.module.css';
import { Button } from './../../components/Button/button'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { removeaction } from './../../actions/systemactions';
import NavBar from './../../components/Navbar/NavBar';
import Block from './../../components/Block/Block';

const Admin = (props) => {
    const games = useSelector(state => state.games);
    const dispatch = useDispatch()

    const deleteHandler = (e) => {
        const id = e.target.id
        dispatch(removeaction(id)) 
        window.location.reload()
    }

    return (
        <> 
            <NavBar role="Админ-панель" direction="Выйти" route="/" />
            <div className={styles.create}>
                <div>
                    <span>Игры</span>
                </div>
                <div>
                    <Button primary="primary" onClick={() => props.history.push("/admin/create")}> Создать игру </Button>
                </div>
            </div>
            <Block games={games} deleteHandler={deleteHandler} route="/admin_gamedetails" location={props.location}/>
        </>
    );
}

export default Admin;
