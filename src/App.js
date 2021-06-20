import './App.css';
// imports for routing
import { Route, Switch } from 'react-router-dom';
// page imports
import ShortenURL from './pages/ShortenURL';
import Redirect from './pages/Redirect';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={ShortenURL} />
        <Route exact path='/:alias' component={Redirect} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
