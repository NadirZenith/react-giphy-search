import React from 'react';
import GiphySearch from './GiphySearch';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
    <div style={styles}>
      <h1>Giphy Search</h1>
      <GiphySearch initialQuery="dog" />
    </div>
);

export default App;
