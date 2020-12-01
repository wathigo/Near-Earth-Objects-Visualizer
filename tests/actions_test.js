import { fetchAsteroidsSuccess, fetchAsteroidsError, getAsteroidData, loading } from '../src/redux/actions';

describe('actions', () => {
    describe(fetchAsteroidsSuccess, () => {
      const sampleData = {
        data: [
          {
            id: '492047209',
            potential_threat: true,
          },
          {
            id: '58369',
            potential_threat: false,
          },
        ],
      };
      it('It should return expected action', () => {
        const expectedAction = {
          type: 'FETCH_ASTEROIDS_SUCCESS',
          asteroids: sampleData,
        };
        expect(fetchAsteroidsSuccess(sampleData)).toEqual(expectedAction);
      });
    });
  
    describe(fetchAsteroidsError, () => {
      it('It should return expected action', () => {
        const expectedAction = {
          type: 'FETCH_ASTEROIDS_ERROR',
          error: 'Failed to fetch!',
        };
        expect(fetchAsteroidsError(expectedAction.error)).toEqual(expectedAction);
      });
    });
  
    describe(getAsteroidData, () => {
      it('It should return expected action', () => {
        const expectedAction = {
          type: 'GET_ASTEROID_DATA',
          asteroid: {
            id: 93920,
            lunar_distance: '38093km',
          },
        };
        expect(getAsteroidData(expectedAction.asteroid)).toEqual(expectedAction);
      });
    });

    describe(loading, () => {
      it('It should return expected action', () => {
        const expectedAction = {
          type: 'LOADING',
          loading: true,
        };
        expect(loading(true)).toEqual(expectedAction);
      });
    });

    // describe(ActionCreators.displayMap, () => {
    //   const value = true;
    //   it('It should return expected action', () => {
    //     const expectedAction = {
    //       type: 'DISPLAY_MAP',
    //       showMap: value,
    //     };
    //     expect(ActionCreators.displayMap(value)).toEqual(expectedAction);
    //   });
    // });
  });