import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';

import Renderer from '../components/renderer';

import { fetchData } from '../redux/actions';


function App(props) {
  const { fetchAsteroids, asteroids: { loading, asteroids } } = props;
  useEffect(() => {
    fetchAsteroids()
  }, [fetchAsteroids]);
  return (
    <div className='App'>
      { loading ? <CircularProgress /> : <Renderer asteroids={asteroids === undefined ? {} : asteroids.near_earth_objects} />}
    </div>
  )
}

const mapStateToProps = (state => state);

const mapDispatchToProps = dispatch => ({
  fetchAsteroids: () => dispatch(fetchData())
})

App.propTypes = {
  fetchAsteroids: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
