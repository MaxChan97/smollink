import './App.css';
// imports for routing
import { Route, Switch } from 'react-router-dom';
// page imports
import ShortenURL from './pages/ShortenURL';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ShortenURL} />
      </Switch>
    </div>
  );
}

export default App;
