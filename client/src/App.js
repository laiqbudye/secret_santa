import './App.css';
import Alert from './components/Alert';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Alert />
      </div>
    </GlobalProvider>
  );
}

export default App;
