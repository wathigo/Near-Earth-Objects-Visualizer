import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

import { fetchData } from '../redux/actions';


function App({ fetchAsteroids }) {

  useEffect(() => {
    fetchAsteroids()
  }, [])
  return (
    <div className="App">
      <h1>Hello World</h1>
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
