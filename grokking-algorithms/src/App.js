import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import BinarySearchPage from './components/BinarySearch';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Route path="/binarySearch" component={BinarySearchPage} />
      </BrowserRouter>
      <h1>Entendendo Algoritmos</h1>
      <h3>Algoritmos disponíveis:</h3>
      <Link to="/binarySearch">Pesquisa binária</Link>
    </div>
  );
}

export default App;
