import React from 'react';
import styles from './Error.module.css';
import cn from 'classnames';

export const Error = (props) => {
    const fn = () => {
        return props.setRevers(!props.reverse)
    }
    switch (props.tag) {
        case "h2":
            return (
                <h2 className={cn(styles.error, {
                    [styles.error_1] : props.error_1 
                })}>
                    <span>{props.children}</span>
                    {props.info ? <span onClick={fn}>&#10006;</span> : <span></span>}
                </h2>
            );
        case "h3":
            return (
                <h3 className={cn(styles.error, {
                    [styles.error_2] : props.error_2 
                })}>
                    <span>{props.children}</span>
                    {props.info ? <span onClick={fn}>&#10006;</span> : <span></span>}
                </h3>
            );
        case "h4":
            return (
                <h4 className={cn(styles.error, {
                    [styles.error_3] : props.error_3 
                })}>
                    <span>{props.children}</span>
                    {props.info ? <span onClick={fn}>&#10006;</span> : <span></span>}
                </h4>
            );
        default:
            return (<h4 className={cn(styles.defaultErr)}>
                <span>{props.children}</span>
                {props.info ? <span onClick={fn}>&#10006;</span> : <span></span>}
            </h4> );
    }

}


