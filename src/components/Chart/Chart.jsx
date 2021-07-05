import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import useWindowDimensions from '../../effects/helpers/screensize';
import { market } from './../../market';


export const Chart = ({ games, game, compareGames, keyword }) => {

  const { width: w } = useWindowDimensions();
  const [cgame, setCgame] = useState([compareGames[0]]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (keyword) {
      setCgame(compareGames.filter(x => x.team === keyword));
    }
  }, [keyword, games, compareGames]);

  let n = useSelector(state=>state.numberReducer) 

  useEffect(() => {
    const check = n ? n : 0
    if(cgame.length>1) {
      setNum(check)
    } else {
      setNum(0)
    }
  }, [cgame.length, n, keyword ]);

  const data = [
    {
      name: `Ком-${game.team}(тек.)`,
      уголь: game.resources[0].coal * market[0].marketprice.coal,
      железо: game.resources[0].metal * market[0].marketprice.metal
    },
    {
      name: `Ком-${cgame[num].team}(срав.)`,
      уголь:  cgame[num].resources[0].coal * market[0].marketprice.coal,  
      железо: cgame[num].resources[0].metal * market[0].marketprice.metal  
    },
    {
      name: "Эталон",
      "эталон уголь": market[0].marketprice.coal * market[1].etalon.coal,
      "эталон железо": market[0].marketprice.metal * market[1].etalon.metal
    }
  ]

  const x = data[0]["уголь"];
  const y = data[0]["железо"]; 

  const coal = data[data.length-1]["эталон уголь"];
  const metal = data[data.length-1]["эталон железо"];
  return (
    <BarChart
      width={w < 600 ? 280 : 500}
      height={w < 600 ? 200 : 300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray={data.length+" "+data.length} />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="уголь" fill={ x >= coal ? "#777777" : "#ff0000"} />
      <Bar dataKey="железо" fill={ y >= metal ? "#daa520" : "#ff0000"} />
      <Bar dataKey="эталон уголь" fill="#008000" />
      <Bar dataKey="эталон железо" fill="#00c000" />
    </BarChart>
  );
}

export const GamingChart = ({ game }) => {

  const { width: w } = useWindowDimensions();
  const data = [
    {
      name: `Игра: ${game.title} ком.${game.team} `,
      уголь: game.resources[0].coal * market[0].marketprice.coal,
      железо: game.resources[0].metal * market[0].marketprice.metal
    },
    {
      name: "Эталон",
      "эталон уголь": market[0].marketprice.coal * market[1].etalon.coal,
      "эталон железо": market[0].marketprice.metal * market[1].etalon.metal
    }
  ]
  console.log(market[1].etalon.metal);
  return (
    <BarChart
      width={w < 600 ? 280 : 500}
      height={w < 600 ? 200 : 300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="уголь" fill="#777777" />
      <Bar dataKey="железо" fill="#daa520" />
      <Bar dataKey="эталон уголь" fill="#008000" />
      <Bar dataKey="эталон железо" fill="#00c000" />
    </BarChart>
  );
}
