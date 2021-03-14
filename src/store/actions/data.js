import axios from 'axios';

import { FETCH_DATA_FAIL, FETCH_DATA_START, FETCH_DATA_SUCCESS } from './actionTypes';

export const fetchDataStart = () => ({ type: FETCH_DATA_START});
export const fetchDataSucces = ( data ) => ({
    type: FETCH_DATA_SUCCESS,
    data
});
export const fetchDataFail = (error) => ({
    type: FETCH_DATA_FAIL,
    error,
})

export const fetchData = () => (dispatch) => {
    dispatch(fetchDataStart());

    axios.get('https://corona.lmao.ninja/v2/countries')
        .then((response) => {
            dispatch(fetchDataSucces(response.data));
        }).catch((error) => {
            dispatch(fetchDataFail(error));
        });
}