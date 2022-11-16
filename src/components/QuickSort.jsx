import React from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const INITIAL_STATE = {
  array: [4, 3, 10, 5, 1, 2, 7],
  secondArray: [4, 3, 10, 5, 1, 2, 7],
  arrayOfPivots: [],
  hasBeenQuickSorted: false,
  hasBeenSorted: false,
  comparedValues: [],
  resetDisabled: false,
  orderDisabled: false,
}

class QuickSort extends React.Component {
  state = INITIAL_STATE;

  reset = () => {
    this.setState(INITIAL_STATE);
  }

  simulateRecursion = async (less, greater) => {
    const lessPivot = less[0];
    const greaterPivot = greater[0];
    this.setState((prevState) => ({
      arrayOfPivots: [...prevState.arrayOfPivots, lessPivot, greaterPivot],
    }));
    await wait(1000);
    const less1 = less.slice(1).filter((element) => element < lessPivot);
    const greater1 = less.slice(1).filter((element) => element > lessPivot);
    const less2 = greater.slice(1).filter((element) => element < greaterPivot);
    const greater2 = greater
      .slice(1)
      .filter((element) => element > greaterPivot);
    return {
      lessArray: [...less1, lessPivot, ...greater1],
      greaterArray: [...less2, greaterPivot, ...greater2],
    };
  };

  normalSort = async (array) => {
    const newArray = [...array];
    for (let u = 0; u <= newArray.length - 4; u+= 1){
      for (let i = 0; i < newArray.length; i+= 1) {
        if (newArray[i] > newArray[i + 1]) {
          const position = newArray[i];
          newArray[i] = newArray[i + 1];
          newArray[i + 1] = position;
          this.setState({ secondArray: newArray, comparedValues: [newArray[i], newArray[i + 1]] });
        };
        this.setState({ comparedValues: [newArray[i], newArray[i + 1]] });
        await wait(500);
      };
    }
    this.setState({ hasBeenSorted: true });
    this.setState({ resetDisabled: false });
  };

  quicksort = async (array) => {
    const pivot = array[0];
    this.setState((prevState) => ({
      arrayOfPivots: [...prevState.arrayOfPivots, pivot],
    }));
    await wait(1000);
    const less = array.slice(1).filter((element) => element < pivot);
    const greater = array.slice(1).filter((element) => element > pivot);
    this.setState({ array: [...less, pivot, ...greater] });
    await wait(1000);
    const { lessArray, greaterArray } = await this.simulateRecursion(
      less,
      greater
    );
    this.setState({
      array: [...lessArray, pivot, ...greaterArray],
    });
    await wait(1200);
    this.setState({ hasBeenQuickSorted: true })
  };

  render() {
    const { array, secondArray, 
      arrayOfPivots, hasBeenQuickSorted, comparedValues, hasBeenSorted, resetDisabled, orderDisabled } = this.state;
    return (
      <div className="quick-sort-page">
        <h1 className="quick-sort-text">Algoritmo Quick Sort</h1>
        <h2 className="quick-sort-text">Quick Sort:</h2>
        <div className="quicksort-container">
          {hasBeenQuickSorted
            ? array.map((number, index) => <div key={index} className="all-sorted"><p className="sort-number">{number}</p></div>)
            : array.map((number, index) => {
                if (arrayOfPivots?.includes(number)) {
                  return (
                    <div key={index} className="pivot">
                      <p className="sort-number">{number}</p>
                    </div>
                  );
                }
                return (
                  <div key={index} className="normal-number">
                    <p className="sort-number">{number}</p>
                  </div>
                );
              })}
        </div>
        <h2 className="quick-sort-text">Sort convencional:</h2>
        <div className="quicksort-container">
          {hasBeenSorted ? (
            secondArray.map((number, index) => <div key={index} className="all-sorted"><p className="sort-number">{number}</p></div>)
          ) : (secondArray.map((number, index) =>  (
            <div 
              key={index}
              className={comparedValues.includes(number) ? 'pivot' : 'normal-number'}
            >
              <p className="sort-number">{number}</p>
            </div>
          )))}
        </div>
        <div className="btn-quicksort-container">
          <button
            type="button"
            className="quick-sort-btn"
            disabled={orderDisabled}
            onClick={() => {
              this.setState({resetDisabled: true, orderDisabled: true});
              this.quicksort(array);
              this.normalSort(secondArray);
            }}
          >
            Ordenar com Quick Sort e Sort
          </button>
          <button className="quick-sort-btn" disabled={resetDisabled} onClick={ () => this.reset() }>Resetar</button>
        </div>
      </div>
    );
  }
}

export default QuickSort;

