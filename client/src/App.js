import './App.css';
import { GlobalProvider } from './context/GlobalState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing } from './components/Landing';

function App() {
  return (
    <GlobalProvider>
      <Router>

        <Switch>
          <Route exact path='/' component={Landing}></Route>
          <Route exact path='/:empId/:token' component={Landing}></Route>
        </Switch>

      </Router>
    </GlobalProvider>
  );
}

export default App;
