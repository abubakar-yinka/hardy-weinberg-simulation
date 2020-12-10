import logo from './logo.svg';
import './App.css';

//Initialising the genotype frequencies
let a1a1 = 0.15;
let a2a2 = 0.35;
let a1a2 = 1 - (a1a1 + a2a2);

//Calculating the allele frequencies based on the genotype frequencies where p = f(A1), q = f(A2)
const p = a1a1 + (a1a2 / 2);
const q = 1 - p;

console.log(`Generation 0 => a1a1: ${a1a1}, a2a2: ${a2a2}, a1a2: ${a1a2}, p: ${p}, q: ${q}`);


//Calculating the next generation
a1a1 = p * p;
a1a2 = 2 * p * q;
a2a2 = q * q;

console.log(`Generation 1 => a1a1: ${a1a1}, a2a2: ${a2a2}, a1a2: ${a1a2}, p: ${p}, q: ${q}`);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React.
        </a>
      </header>
    </div>
  );
}

export default App;
