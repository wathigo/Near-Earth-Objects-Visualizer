import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../App.css';

import Renderer from '../components/renderer';

import { fetchData } from '../redux/actions';


function App(props) {
  console.log(props)
  const { fetchAsteroids, asteroids: { loading } } = props;
  useEffect(() => {
    fetchAsteroids()
  }, [fetchAsteroids]);
  const el = loading ? (
    <CircularProgress />
  ) : (
      <div className="App">
        <Renderer />
      </div>
    )
  return
  (
    { el }
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
