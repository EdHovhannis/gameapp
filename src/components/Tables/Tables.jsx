import React, { useState, useEffect } from 'react';
import { market } from './../../market';
import Input from './../Input/Input';
import { useDispatch } from 'react-redux';
import { playingactions, numaction } from '../../actions/systemactions';

export const Buyings = ({ game, games, compareGames, keyword }) => {

    const [cgame, setCgame] = useState([compareGames[0]]);
    const dispatch = useDispatch()
    useEffect(() => {
        if (keyword) {
            setCgame(compareGames.filter(x => x.team === keyword));
        }
    }, [keyword, games, compareGames]);

    const numberMaker = (id) => {
        dispatch(numaction(id))
   }

    return (
        <table>
            <caption>Закупки</caption>
            <thead>
                <tr>
                    <th>Показатель</th>
                    <th>
                        <em style={{ fontSize: "0.6rem" }}>Игра</em>&nbsp;
                        <span>{game.title}</span>&nbsp;
                        <em style={{ fontSize: "0.6rem" }}>Команда</em>&nbsp;
                        <span>{game.team}</span><em style={{ fontSize: "0.6rem" }}>(текущая)</em>
                    </th>
                    {
                        cgame.map(x =>
                            <th key={Math.random()}>
                                <em style={{ fontSize: "0.6rem" }}>Игра</em>&nbsp;
                                <span>{x.title}</span>&nbsp;
                                <em style={{ fontSize: "0.6rem" }}>Команда</em>&nbsp;
                                <span>{x.team}</span>
                            </th>)
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Уголь</td>
                    <td>{game.resources[0].coal}</td>
                    {
                        cgame.map((x, i) => <td onClick={(p)=>numberMaker(i)} key={Math.random()}>{x.resources[0].coal}</td>)
                    }
                </tr>
                <tr>
                    <td>Железо</td>
                    <td>{game.resources[0].metal}</td>
                    {
                        cgame.map((x, i) => <td onClick={(p)=>numberMaker(i)} key={Math.random()}>{x.resources[0].metal}</td>)
                    }
                </tr>
            </tbody>
        </table>
    );
}

export const Summary = ({ game, games, compareGames, keyword }) => {
    const [cgame, setCgame] = useState([compareGames[0]]);
    const dispatch = useDispatch()
    useEffect(() => {
        if (keyword) {
            setCgame(compareGames.filter(x => x.team === keyword))
        }
    }, [keyword, games, compareGames]);

    const numberMaker = (id) => {
        dispatch(numaction(id))
    }


    return (
        <table>
            <caption>Сводная</caption>
            <thead>
                <tr>
                    <th>Показатель</th>
                    <th>
                        <em style={{ fontSize: "0.6rem" }}>Игра</em>&nbsp;
                        <span>{game.title}</span>&nbsp;
                        <em style={{ fontSize: "0.6rem" }}>Команда</em>&nbsp;
                        <span>{game.team}</span><em style={{ fontSize: "0.6rem" }}>(текущая)</em>
                    </th>
                    {
                        cgame.map(x =>
                            <th key={Math.random()}>
                                <em style={{ fontSize: "0.6rem" }}>Игра</em>&nbsp;
                                <span>{x.title}</span>&nbsp;
                                <em style={{ fontSize: "0.6rem" }}>Команда</em>&nbsp;
                                <span>{x.team}</span>
                            </th>)
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Уголь</td>
                    <td>{game.resources[0].coal}</td>
                    {
                        cgame.map((x, i) => <td onClick={(p)=>numberMaker(i)}  key={Math.random()}>{x.resources[0].coal}</td>)
                    }
                </tr>
                <tr>
                    <td>Железо</td>
                    <td>{game.resources[0].metal}</td>
                    {
                        cgame.map((x, i) => <td onClick={(p)=>numberMaker(i)} id={i} key={Math.random()}>{x.resources[0].metal}</td>)
                    }
                </tr>
            </tbody>
        </table>
    );
}
export const MarketPrice = () => {
    return (
        <table>
            <caption>Рыночная цена</caption>
            <thead>
                <tr>
                    <th>Показатель</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Уголь</td>
                    <td>{market[0].marketprice.coal}</td>
                </tr>
                <tr>
                    <td>Железо</td>
                    <td>{market[0].marketprice.metal}</td>
                </tr>
            </tbody>
        </table>
    );
}
export const Etalon = () => {
    return (
        <table>
            <caption>Эталон</caption>
            <thead>
                <tr>
                    <th>Показатель</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Уголь</td>
                    <td>{market[1].etalon.coal}</td>
                </tr>
                <tr>
                    <td>Железо</td>
                    <td>{market[1].etalon.metal}</td>
                </tr>
            </tbody>
        </table>
    );
}
 
export const Playing = ({ path, game }) => {
    const dispatch = useDispatch()
  
    const [data, setData] = useState({
        coal: game.resources[0].coal,
        metal: game.resources[0].metal
    })
 
    const pickData = (e) => { 
        setData({
            ...data, [e.target.id]: +e.target.value
        })  
    }
    useEffect(() => { 
        dispatch(playingactions(data, path))
    }, [data, path, dispatch]);
    return (
        <table>
            <caption>Закупка</caption>
            <thead>
                <tr>
                    <th>Показатель</th>
                    <th>Цена</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Уголь</td>
                    <td>
                        <Input
                            id="coal"
                            way={2}
                            type="number"
                            value={data.coal}
                            min="0"
                            max="30"
                            style={{ outline: "none" }}
                            onChange={pickData} />
                    </td>
                </tr>
                <tr>
                    <td>Железо</td>
                    <td>
                        <Input
                            id="metal"
                            way={2}
                            type="number"
                            value={data.metal}
                            min="0"
                            max="30"
                            style={{ outline: "none" }}
                            onChange={pickData}  
                            />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}