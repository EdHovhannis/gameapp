import React, {useEffect, useState}  from 'react';
import styles from './Gaming.module.css';
import NavBar from '../../components/Navbar/NavBar';
import { Etalon, MarketPrice, Playing } from '../../components/Tables/Tables';
import cn from "classnames";
import { GamingChart } from './../../components/Chart/Chart';
import { useSelector } from 'react-redux';
 

const Gaming = (props) => {
    let pseudo = useSelector(state=>state.pseudo)
    let allGames = useSelector(state=>state.games);
    
    const games = pseudo.length ? pseudo : allGames
    
    const [game, setGame] = useState(null)
    const path = props.match.params.key.split("*").join("").toString();
     
    useEffect(() => { 
        setGame(games.find(x=>x.team+x.titleTrim === path))
    }, [games, path]); 
    return (
        <>
            <NavBar role={`Команда`} direction="Назад" route="/participant" />
             <div className={styles.gaming}>
                    <div>
                        <div className={cn(styles.table_group_3)}>
                            <MarketPrice />
                            <Etalon />
                            {game&&<Playing path={path} game={game} />} 
                        </div>
                    </div>
                   {
                       game&& <div>
                        <h3 style={{ textAlign: "center" }}> Выручка </h3>
                          <GamingChart game={game} />
                    </div>
                   }
                    <div style={{ height: 200 }}></div>
                </div> 
        </>
    );
}

export default Gaming;
