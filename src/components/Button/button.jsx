import React from 'react';
import styles from './button.module.css';
import cn from 'classnames';

export const Button = (props) => {
    return (
        <>
            <button className={cn(styles.button, {
                [styles.primary]: props.primary,
                [styles.green]: props.green,
                [styles.red]: props.red,

            })} {...props}>{props.children} </button>
        </>
    );
}


