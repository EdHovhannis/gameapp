import React from 'react';
import styles from './Block.module.css';
import { Error } from './../../effects/Error/Error';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const Block = (props) => {
    switch (props.location.pathname) {
        case "/admin":
            return (
                <div>
                    <ul className={styles.block}>
                        {
                            props.games.length === 0
                                ?
                                <Error tag="h3" error_2="error_2" info={false}>Еще нет активных игр</Error>
                                :
                                props.games.map(x =>
                                    <li key={Math.random()} className={styles.block_details}>
                                        <NavLink className={styles.blockTitle} to={props.route + `/${x.team + "*" + x.titleTrim}`}>{x.title}</NavLink>
                                        <span className={cn({
                                            [styles.finished]: !x.status,
                                            [styles.active]: x.status
                                        })}>{x.status ? "Активная" : "Завершена"}</span>
                                        {!x.status && <span className={styles.trash_icon} id={x.team + x.titleTrim} onClick={props.deleteHandler}>&#10006;</span>}
                                        {props.games.length === 1 && <span className={styles.trash_icon} id={x.team + x.titleTrim} onClick={props.deleteHandler}>&#10006;</span>}
                                    </li>
                                )
                        }
                    </ul>
                </div>
            );
        case "/participant":
            return (
                <div>
                    <ul className={styles.block}>
                        {
                            props.games.length === 0
                                ?
                                <Error tag="h3" error_2="error_2" info={false}>Еще нет активных игр</Error>
                                :
                                props.games.map(x =>
                                    <li key={Math.random()} className={styles.block_details}>
                                        {
                                            x.status ?
                                                <NavLink className={styles.blockTitle} to={props.route + `/${x.team + "*" + x.titleTrim}`}>{x.title}</NavLink>
                                                :
                                                <NavLink className={styles.blockTitle} to="#">{x.title}</NavLink>
                                        }
                                        <span className={cn({
                                            [styles.finished]: !x.status,
                                            [styles.active]: x.status
                                        })}>{x.status ? "Активная" : "Завершена"}</span>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            )
        default:
            return <></>;
    }

}

export default Block;
