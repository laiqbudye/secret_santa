import './App.css';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
      </div>
    </GlobalProvider>
  );
}

export default App;
