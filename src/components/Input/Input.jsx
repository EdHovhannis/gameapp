import React from 'react';
import styles from './Input.module.css';
import cn from 'classnames';


const Input = (props) => {
    return (
        <>
            <input {...props} type={props.type||"text"} className={cn({
                [styles.style_1]: props.way===1,
                [styles.style_2]: props.way===2,
            })} />   
        </>
    );
}

export default Input;
