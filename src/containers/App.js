import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

import Renderer from '../components/renderer';

import { fetchData } from '../redux/actions';


function App({ fetchAsteroids }) {

  useEffect(() => {
    fetchAsteroids()
  }, [fetchAsteroids])
  return (
    <div className="App">
      <Renderer />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchAsteroids: () => dispatch(fetchData())
})

App.propTypes = {
  fetchAsteroids: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(App);
