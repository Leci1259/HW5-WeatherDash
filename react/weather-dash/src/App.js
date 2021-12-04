import logo from './logo.svg';
import './App.css';
import Searchbar from './components/searchBar/index';
import Header from './components/header/index';
import Display from './components/currentDisplay';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <aside>
          <Searchbar />
        </aside>
        <Display />
      </main>
    </div>
  );
}

export default App;
