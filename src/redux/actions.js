import {
    GET_ASTEROID_DATA,
    FETCH_ASTEROIDS_ERROR,
    FETCH_ASTEROIDS_SUCCESS,
    LOADING,
} from './actionTypes';

export const fetchData = () => {
    apiKey = process.env.REACT_APP_NASA_API_KEY;
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key==${apiKey}`;
    dispatch(loading(true));
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });

    try {
        const data = await resp.json();
        dispatch(fetchAsteroidsSuccess(data));
        dispatch(loading(false));
    }
    catch (err) {
        dispatch(fetchAsteroidsError(err));
        dispatch(loading(false));
    }
}

export const fetchAsteroidsSuccess = asteroids => ({
    type: FETCH_ASTEROIDS_SUCCESS,
    asteroids: asteroids,
})

export const fetchAsteroidsError = err => ({
    type: FETCH_ASTEROIDS_ERROR,
    error: err,
})

export const getAsteroidData = asteroid => ({
    type: GET_ASTEROID_DATA,
    asteroid: asteroid,
})

export const loading = loading => ({
    type: LOADING,
    loading: loading,
})