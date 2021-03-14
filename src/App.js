import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

import Map from './components/Map';
import SearchList from './components/SearchList';
function App() {
  return (
    <div data-testid="container" className="App">
      <Header />
      <SearchList />
      <Map />
      <Footer />
    </div>
  );
}

export default App;
