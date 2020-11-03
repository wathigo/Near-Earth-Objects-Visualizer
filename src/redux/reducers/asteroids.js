import { FETCH_ASTEROIDS_ERROR, FETCH_ASTEROIDS_SUCCESS, GET_ASTEROID_DATA, LOADING } from '../actionTypes';

const initialState = {
    asteroids: [],
    asteroid: {},
    error: null,
    loading: false,
  };

  export default function(state=initialState, action) {
      switch(action.type) {
          case FETCH_ASTEROIDS_SUCCESS: {
              return {
                  ...state,
                  asteroids: action.asteroids,
              }
          }

          case FETCH_ASTEROIDS_ERROR: {
              return {
                  ...state,
                  error: action.error,
              }
          }

          case GET_ASTEROID_DATA: {
              return {
                  ...state,
                  asteroid: action.asteroid,
              }
          }

          case LOADING: {
              return {
                  ...state,
                  loading: action.loading,
              }
          }

          default:
              return state;
      }
  }