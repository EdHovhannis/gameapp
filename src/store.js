import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk";
import { createreducer, playingreducers, numberReducer } from './reducers/systemreducers';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {
    games: localStorage.getItem('gameItems') ? JSON.parse(localStorage.getItem('gameItems')) : []
}

const reducer = combineReducers({
    games: createreducer,
    pseudo: playingreducers,
    numberReducer 
})


const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store
