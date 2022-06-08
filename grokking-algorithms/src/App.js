import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import BinarySearchPage from './components/BinarySearch';
import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/binarySearch" component={ BinarySearchPage } />
        <Route exact path="/" component={ Home } />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
