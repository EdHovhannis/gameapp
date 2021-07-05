import React from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Select = (props) => {
    return (
        <>
           <select {...props} className={cn({
               [styles.style_1]: props.way===1
           })} >
                {props.children}
           </select> 
        </>
    );
}

export default Select;
