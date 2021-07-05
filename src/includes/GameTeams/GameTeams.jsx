import React, { useEffect, useState } from 'react';
import styles from './GameTeams.module.css';
import { useSelector } from 'react-redux';
import NavBar from './../../components/Navbar/NavBar';

const GameTeams = (props) => { 
    
    const games = useSelector(state => state.games)
    const [teams, setTeams] = useState(null)
    useEffect(() => {
        const key = props.match.params.key.split("*")[1]
        const t = games.filter(x => x.titleTrim === key)
        return setTeams(t)
    }, [games, props.match.params.key]);

    return (
        <> 
            <NavBar role="Участник" direction="Назад" route="/participant" />
            <div>
                <ul className={styles.games}>
                    {
                        teams && teams.map(x =>
                            <li key={Math.random()} className={styles.games_details}>
                                <span className={styles.gameTitle} onClick={() => props.history.push(`/team_game/${x.team + "*" + x.titleTrim}`)}>Команда&nbsp;{x.team}</span>
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    );
}

export default GameTeams;
