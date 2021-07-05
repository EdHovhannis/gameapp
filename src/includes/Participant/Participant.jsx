import React from 'react';
import { useSelector } from 'react-redux';  
import NavBar from './../../components/Navbar/NavBar';
import Block from './../../components/Block/Block';

const Participant = (props) => {
    const games = useSelector(state=>state.games)
    return (
        <> 
            <NavBar role="Участник" direction="Выйти" route="/" />
            <h2 style={{ marginLeft: "1rem" }}>Выбор игры</h2>
            <Block games={games} route="/participant_gamedetails" location={props.location}/>
        </>
    );
}

export default Participant;
