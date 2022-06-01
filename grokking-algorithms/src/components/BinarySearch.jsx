import React, { Component } from 'react';

class BinarySearchPage extends Component {
  binarySearch = (array, item) => {
    let min = 0;
    let max = array.length - 1;
    while (min <= max) {
      let average = Math.floor((max + min) / 2);
      let hunch = array[average];
      if (hunch === item) {
        return `O item ${hunch} está no index ${average}`;
      } else if (hunch >  item) {
        max = average - 1;
      } else {
        min = average + 1;
      }
    }
  }
  render() {
    return (
      <div>
        <h1>Pesquisa Binária</h1>
      </div>
    );
  }
}

export default BinarySearchPage;