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
  binaryIterationCount: 0,
  simpleIterationCount: 0,
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

      let { hunch, binaryIterationCount } = this.state;

      if (hunch === item) {
        this.setState({ 
          hunch: item, 
          color: true, 
          binaryIterationCount: binaryIterationCount + 1,
        });
        await wait(700);
        return;
      } else if (hunch > item) {
        this.setState({ max: average - 1, binaryIterationCount: binaryIterationCount + 1 });
        await wait(700);
      } else {
        this.setState({ min: average + 1, binaryIterationCount: binaryIterationCount + 1 });
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
      const { simpleIterationCount } = this.state;
      if (array[i] === item) {
        this.setState({ 
          simpleHunch: array[i],
          simpleColor: i,
          simpleIterationCount: simpleIterationCount + 1,
         });
        await wait(700);
        return;
      } else {
        this.setState({ simpleHunch: array[i], simpleIterationCount: simpleIterationCount + 1 });
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
      binaryIterationCount,
      simpleIterationCount,
    } = this.state;
    return (
      <>
      <img className="background" src="https://wallpaper.dog/large/20394426.jpg" alt="background"/>
      <div className="binary-body">
        <h2>Pesquisa Binária</h2>
        <h3>O que é?</h3>
        <p>A pesquisa binária é um algoritmo utilizado para econtrar um valor em um array.
          Para que o algoritmo funcione, é necessário que o array esteja ordenado. A princípio,
          o elemento 0 e o elemento N são selecionados, afim de conseguir se obter o valor do "meio"
          do array. Logo, (N + 0) / 2 = posição média. Comparamos, então, o valor da posição média com
          o elemento que estamos buscando. Caso esse elemento possua um valor maior do que o elemento médio, sabemos que ele está na metade "superior" do array (daí vem a importância do Array
          estar ordenado). Dessa forma, conseguimos, com uma única iteração excluir METADE do array.
          Essa é a mágica da pesquisa binária. Quanto maior for o Array que estamos iterando, mais
          elementos serão elimitados por cada iteração. Isso acontece porque a pesquisa binária funciona
          em tempo logarítimico. Veja os gráficos abaixo e entenda a diferença:
        </p>
        <div className="bigO-container">
        <img className="bigO" src="https://lh4.googleusercontent.com/HTj2Ri2kXpmYdnLVJB4pGk7fnv_XpYwNWTtGGo4vCu9F2vYm6LeFST-q_fRYkcmRN9vrMtsh4-WK0Tx-F_fOaKHYAGrKkELBfitbe0qeJlmnZ7Rir7ikW9YFc_QqjXY_McJrNyX7" alt="tempos de execução de algoritmos"/>
        </div>
        <p>A notação "big O" serve para descrever o comportamento limitante de uma função (nesse caso um algoritmo) quando o seu valor tende ao infinito. em outras palavras, é uma forma de medir o quanto um algoritmo é eficiente. Ele leva em consideração o pior cenário de execução (no caso de uma pesquisa simples, onde os elementos são checados de um por um, o pior cenário é quando o elemento escolhido é o último elemento do array). Na imagem, a pesquisa binária se enquadra na curva amarela. Percebe-se que, mesmo quando se aumenta muito o número de elementos em um array, o tempo de execução aumenta em uma escala infinitamente menor. Vamos ver como isso funciona na prática? Utilize o esquema montado abaixo que comparada os tempos de busca da pesquisa binária vs pesquisa simples. Divirta-se explodindo sua mente!</p>
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
        <p>Número de iterações da pesquisa binária: { binaryIterationCount }</p>
        <p>Obs: A pesquisa binária realiza as ações de pegar os valores mínimo, máximo, média e fazer a comparação em uma única iteração!</p>
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
        <p>Número de iterações da pesquisa simples: { simpleIterationCount }</p>
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
      </>
    );
  }
}

export default BinarySearchPage;
