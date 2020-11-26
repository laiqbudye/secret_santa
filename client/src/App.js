import './App.css';
import Register from './components/Register';
import Alert from './components/Alert';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Alert />
        <Register />
      </div>
    </GlobalProvider>
  );
}

export default App;
