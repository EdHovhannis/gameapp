import React, { useState } from 'react';
import styles from './Create.module.css';
import { Button } from './../../components/Button/button';
import Select from './../../components/Input/Select';
import Input from './../../components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { creategameaction } from './../../actions/systemactions';
import { Error } from './../../effects/Error/Error';
import NavBar from './../../components/Navbar/NavBar';


const Create = (props) => {
    const options = [
        { value: "1", name: "Комманда 1" },
        { value: "2", name: "Комманда 2" },
        { value: "3", name: "Комманда 3" },
        { value: "4", name: "Комманда 4" },
        { value: "5", name: "Комманда 5" }
    ]
    const games = useSelector(state => state.games)
    const [isFull, setFull] = useState(false);
    const [message, setErrmes] = useState(false);

    const dispatch = useDispatch();
    const [data, setData] = useState({
        title: "",
        titleTrim: "",
        team: "",
        status: true,
        resources: [
            {
                coal: 0,
                metal: 0
            }
        ]
    });

    const datapicker = (event) => {
        setFull(false);
        setData({
            ...data, [event.target.id]: event.target.value
        });
    }

    const createHandler = (event) => {
        event.preventDefault();
        if (data.title.trim() === "") {
            setFull(true);
            setErrmes("Добавьте название");
            return false;
        }
        if (data.team === "") {
            setFull(true);
            setErrmes("Добавьте команду");
            return false;
        }
        const d = { ...data, titleTrim: data.title.toLowerCase().split(" ").join("").toString() };
        const check = games.find(x => x.team === data.team && x.title === data.title);
        if (check) {
            setFull(true);
            setErrmes("Игра с такой коммандой уже существует");
            return false;
        }
        dispatch(creategameaction(d));
        setData({
            title: "",
            titleTrim: "",
            team: "",
            status: "Активная",
            resources: [
                {
                    coal: 0,
                    metal: 0
                }
            ]
        });
        props.history.push("/admin");
        return;
    }
    return (
        <>
            <NavBar role="Создание игры" direction="Назад" route="/admin" />
            <div className={styles.create}>
                <form onSubmit={createHandler}>
                    {
                        !isFull ? <h3>Новая игра</h3> : <Error info={true} tag="h4" error_3="error_3" setRevers={setFull} reverse={isFull}>{message}</Error>
                    }
                    <div>
                        <label htmlFor="title">Название</label>
                        <Input way={1} id="title" onChange={datapicker} value={data.title} />
                    </div>
                    <div>
                        <label htmlFor="team">Команды</label>
                        <Select way={1} id="team" onChange={datapicker} defaultValue="0">
                            <option value="0" disabled>Выберите команду</option>
                            {
                                options.map(x => <option key={x.name} value={x.value}>{x.name}</option>)
                            }
                        </Select>
                    </div>
                    <div>
                        <Button green="green" onClick={() => props.history.push("/admin/create")}> Создать игру </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Create;
