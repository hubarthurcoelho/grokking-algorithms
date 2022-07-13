import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
      <h1>Entendendo Algoritmos</h1>
      <h3>Algoritmos disponíveis:</h3>
      <Link to="/binarySearch" >Pesquisa binária</Link>
      <Link to="/quickSort" >Quick Sort</Link>
      </div>
    );
  }
}

export default Home;