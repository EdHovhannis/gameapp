
import { CREATE_GAME, GAMING, NUMBER_MAKE } from '../constants/systemconstants';

export const createreducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_GAME:
            const data = [...state, action.payload]
            localStorage.setItem('gameItems', JSON.stringify(data))
            return data
        default:
            return state;
    }
}
export const playingreducers = (state = [], action) => {
    switch (action.type) {
        case GAMING: 
            return action.payload;
        default:
            return state;
    }
}
export const numberReducer = (state = 0, action) => {
    switch (action.type) {
        case NUMBER_MAKE: 
            return action.payload;
        default:
            return state;
    }
}
