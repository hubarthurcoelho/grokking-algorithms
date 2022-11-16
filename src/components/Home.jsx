import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
      <h1>Entendendo Algoritmos</h1>
      <h3>Algoritmos disponíveis:</h3>
      <Link className="links" to="/binarySearch" >Pesquisa binária</Link>
      <Link className="links" to="/quickSort" >Quick Sort</Link>
      </div>
    );
  }
}

export default Home;