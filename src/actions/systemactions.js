import { CREATE_GAME, FINISH_GAME, DELETE_GAME, GAMING, NUMBER_MAKE } from '../constants/systemconstants';

export const creategameaction = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_GAME, payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const finishgameaction = (name) => {
    return async (dispatch, getState) => {
        const { games } = getState();
        const data = games.map(x => x.team + x.titleTrim === name ? { ...x, status: false } : x);
        localStorage.removeItem('gameItems');
        localStorage.setItem('gameItems', JSON.stringify(data));
        try {
            dispatch({
                type: FINISH_GAME, payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const removeaction = (name) => {
    return async (dispatch, getState) => {
        const { games } = getState();
        const data = games.filter(x => x.team + x.titleTrim !== name); 
        localStorage.removeItem('gameItems');
        localStorage.setItem('gameItems', JSON.stringify(data));
        try {
            dispatch({
                type: DELETE_GAME, payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const playingactions = (data, path) => {
    return async (dispatch, getState) => { 
       const allGames = getState().games; 
       const changed = allGames.map(x => x.team+x.titleTrim===path? {...x, resources: x.resources.map(p=>p&&{...p,coal:data.coal, metal:data.metal}) } : x );
       localStorage.removeItem('gameItems');
       localStorage.setItem('gameItems', JSON.stringify(changed));
       try {
           dispatch({
               type: GAMING, payload: changed
           })
       } catch (error) {
           console.log(error);
       }
    }
}
export const numaction = (id) => {
    return async dispatch => {  
       try {
           dispatch({
               type: NUMBER_MAKE, payload: id
           })
       } catch (error) {
           console.log(error);
       }
    }
}