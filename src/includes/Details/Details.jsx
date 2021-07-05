import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Details.module.css';
import { Button } from './../../components/Button/button';
import cn from 'classnames';  
import { Error } from './../../effects/Error/Error';
import Select from './../../components/Input/Select';
import { finishgameaction } from '../../actions/systemactions';
import NavBar from './../../components/Navbar/NavBar';
import { Buyings, MarketPrice, Summary, Etalon } from '../../components/Tables/Tables';
import { Chart } from './../../components/Chart/Chart';
import { numaction } from './../../actions/systemactions';

const Details = (props) => {
    const allgames= useSelector(state => state.games);
    const g = useSelector(state => state.pseudo);
    const games = g.length?g:allgames;
    const dispatch = useDispatch()
    const [game, setGame] = useState(null);
    const [compareGames, setcompareGames] = useState(null);
    const [keyword, setKeyword] = useState(null);

    useEffect(() => {
        setGame(games.find(x => x.team + "*" + x.titleTrim === props.match.params.key));
        setcompareGames(games.filter(x => x.team + "*" + x.titleTrim !== props.match.params.key))
    }, [games, props.match.params.key]);

    const finishGame = (e) => {
        const name = e.target.name;
        dispatch(finishgameaction(name))
        props.history.push("/admin")
        window.location.reload()
    }
    const keyWordhandler = (e) => {
        setKeyword(e.target.value)
        dispatch(numaction(0))
    }
    return (
        <>
            <NavBar role={game && game.title} direction="Назад" route="/admin" />
            {
                games.length < 2 ?
                    <Error> Если количество игр меньше чем два, то для сравнении таблицы не доступны. </Error>
                    :
                    <>
                        {
                            game && <>
                                <div className={styles.info}>
                                    <div>
                                        <em>Игра:</em>&nbsp;&nbsp;<span>"{game && game.title}"</span>&nbsp;&nbsp;
                                        <span>Сравнить с </span>

                                        <Select way={1} onChange={keyWordhandler}>
                                            {
                                                compareGames && Array.from(new Set(compareGames.map(x => x.team))).map(x => <option key={x} value={x}> Команда {x} </option>)
                                            }
                                        </Select>

                                    </div>
                                    <div>
                                        {
                                            game && <span className={cn({
                                                [styles.active]: game.status,
                                                [styles.finished]: !game.status,
                                            })}>{game.status ? "Активная" : "Завершена"}</span>
                                        }
                                    </div>
                                    <div>
                                        {game.status && <Button red="red" onClick={finishGame} name={game.team + game.titleTrim}>Завершить игру</Button>}
                                    </div>
                                </div>
                                <div className={cn(styles.table_group_1)}>
                                    <Buyings games={games} game={game} compareGames={compareGames} keyword={keyword} />
                                    <Summary games={games} game={game} compareGames={compareGames} keyword={keyword} />
                                    <MarketPrice />
                                </div> 
                                <div className={cn(styles.table_group_2)} >
                                    <div>
                                        <Etalon />
                                    </div>
                                    <div>
                                        <h3 style={{ textAlign: "center" }}>Выручка</h3>
                                        {!game.resources[0].coal === 0 && game.resources[1].metal === 0 ? <Error> Если в текущей игре отсутствует ресурсы, то диаграмма недоступна. </Error> : <Chart games={games} game={game} compareGames={compareGames} keyword={keyword} />}
                                    </div>
                                </div>
                                <div style={{ height: 200 }}></div>
                            </>
                        }
                    </>
            }
        </>
    );
}

export default Details;
