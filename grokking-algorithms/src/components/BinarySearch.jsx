import React, { Component } from "react";
import "../style.css";
import OptionInput from "./OptionInput";

const ESTADO_INICIAL = {
  hunch: null,
  min: null,
  max: null,
  color: false,
  simpleHunch: null,
  simpleColor: false,
};

class BinarySearchPage extends Component {
  state = {
    ...ESTADO_INICIAL,
    array: [1, 4, 5, 10, 17, 21, 40, 101, 107, 200, 400, 550],
    item: 1,
    btnDisabled: true,
  };

  binarySearch = async (array, item) => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    this.setState({
      min: 0,
      max: array.length - 1,
      color: false,
      btnDisabled: true,
    });

    await wait(1000);

    let { min } = this.state;

    let { max } = this.state;

    while (min <= max) {
      let average = Math.floor((max + min) / 2);

      this.setState({ hunch: array[average] });

      await wait(700);

      let { hunch } = this.state;

      if (hunch === item) {
        this.setState({ hunch: item, color: true });
        await wait(700);
        return;
      } else if (hunch > item) {
        this.setState({ max: average - 1 });
        await wait(700);
      } else {
        this.setState({ min: average + 1 });
        await wait(700);
      }
      if (hunch > item) {
        max = average - 1;
      } else {
        min = average + 1;
      }
      await wait(1000);
    }
  };

  onChange = ({ target }) => {
    this.setState({
      item: parseInt(target.value),
      ...ESTADO_INICIAL,
      btnDisabled: false,
    });
  };

  simpleSearch = async (array, item) => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] === item) {
        this.setState({ simpleHunch: array[i], simpleColor: i });
        await wait(700);
        return;
      } else {
        this.setState({ simpleHunch: array[i] });
        await wait(700);
      }
      await wait(1000);
    }
  };

  render() {
    const {
      array,
      item,
      max,
      min,
      hunch,
      color,
      btnDisabled,
      simpleHunch,
      simpleColor,
    } = this.state;
    return (
      <div>
        <h1>Pesquisa Binária</h1>
        <article className="array-container">
          {array.map((num, index) => {
            if (
              (num === item && index !== min && index !== max) ||
              (color && num === item)
            )
              return (
                <div
                  key={index}
                  className={color ? "bingo item" : "wanted item"}
                >
                  {num}
                </div>
              );
            else if (num === hunch && index !== min && index !== max)
              return (
                <div key={index} className="hunch item">
                  {hunch}
                </div>
              );
            else if (index === min)
              return (
                <div key={index} className="boundaries item">
                  {num}
                </div>
              );
            else if (index === max)
              return (
                <div key={index} className="boundaries item">
                  {num}
                </div>
              );
            else
              return (
                <div key={index} className="item">
                  {num}
                </div>
              );
          })}
        </article>
        <h1>Pesquisa Simples</h1>
        <article className="array-container">
          {array.map((num, index) => {
            if (item === simpleHunch && index === simpleColor)
              return (
                <div key={index} className="item bingo">
                  {num}
                </div>
              );
            else if (num === simpleHunch)
              return (
                <div key={index} className="boundaries item">
                  {num}
                </div>
              );
            else
              return (
                <div key={index} className="item">
                  {num}
                </div>
              );
          })}
        </article>
        <OptionInput valores={array} onChange={this.onChange} item={item} />
        <button
          disabled={btnDisabled}
          onClick={() => {
            this.simpleSearch(array, item);
            this.binarySearch(array, item);
          }}
        >
          Rodar Pesquisa Binária
        </button>
      </div>
    );
  }
}

export default BinarySearchPage;
