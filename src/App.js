import './App.css';
import ProductsList from './Components/ProductsList/ProductsList';

function App() {
  return (
    <div className="App">
      <header>
        <img className="header-logo" alt="header-icon" src="./nykaa_logo.svg" />
      </header>
      <ProductsList />
    </div>
  );
}

export default App;
