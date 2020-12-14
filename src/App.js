import logo from './logo.svg';
import './App.css';
import LineChart from './LineChart';

// //Initialising the genotype frequencies
// let a1a1 = 0.15;
// let a2a2 = 0.35;
// let a1a2 = 1 - (a1a1 + a2a2);

// //Calculating the allele frequencies based on the genotype frequencies where p = f(A1), q = f(A2)
// const p = a1a1 + (a1a2 / 2);
// const q = 1 - p;

// console.log(`Generation 0 => a1a1: ${a1a1}, a2a2: ${a2a2}, a1a2: ${a1a2}, p: ${p}, q: ${q}`);

//Rounding a number to a specified number of digits after the decimal pt of the value
const round_number = (value, decimals) => {
  const exponent_calculator = Math.pow(10, decimals)
  return Math.round(value * exponent_calculator) / exponent_calculator;
}

// //Calculating the genotype frequencies for the next generations based on the allele frequencies
// const create_next_generation = (generation_number) => {
//   a1a1 = p * p;
//   a1a2 = 2 * p * q;
//   a2a2 = q * q;

//   console.log(`Generation ${generation_number} => a1a1: ${round_number(a1a1, 2)}, a2a2: ${round_number(a2a2, 2)}, a1a2: ${round_number(a1a2, 2)}, p: ${p}, q: ${q}`);
// };
// for(let i = 0; i < 5; i++) {
//   create_next_generation(i + 1);
// };

let p;
let q = 0.5;
const N = 2000;
const generations = 2000;
const data = [];

//Calculate the next Generation using a generic next generation function to demonstrate genetic drift
const next_generation = (simulation_array) => {
  const draws = 2 * N;
  let a1 = 0;
  let a2 = 0;
  for (let i = 0; i < draws; i++) {
    if (Math.random() <= p) {
      a1 += 1;
    } else {
      a2 += 1;
    }
  }
  //Calculate the new allele frequencies
  p = a1 / draws;
  q = a2 / draws
  simulation_array.push(p);
}
//Calling the next generation function to create a new generation 1000x
const simulation = (simulation_index) => {
  p = 0.5;
  for (let i = 0; i < generations; i++) {
    next_generation(data[simulation_index]);
    console.log(`The value of p and q in generation ${i} is ${round_number(p, 4)} and ${round_number(q, 4)}`);
  }
}

//Using a loop to call the simulation function 10x
for (let i = 0; i < 10; i++) {
  data.push([]);
  simulation(i);
}

//-------------------------------

// //Coin Flipper Demonstration
// const repeat = 1000;
// let sum = 0;
// for (let i = 0; i < repeat; i++) {
//   sum = sum + Math.random();  
// }
// const average = sum / repeat;
// console.log(`The average is ${average}`);

// //The probability of throwing 10 coins and resulting to exactly 2 tails 
// const coin_tosser = () => {
//   const coins = 10;
//   let heads = 0;
//   let tails = 0;

//   for (let i = 0; i < coins; i++) {
//     //The fact that each number btw 0 and 1 comes up with equal probability can be used to generate a fair coin i.e equal probability of heads and tails(0.5)
//     if (Math.random() <= 0.5) {
//       heads += 1;
//     } else { 
//       tails += 1;
//     }
//   }

//   if (heads === 8) {
//     return true;
//   } else {
//     return false;
//   }
  
// }
// //Calling the coin tosser function to know how many times 8 heads came up when the coin was tossed 10 times
// // const repeats = 10000000;
// const repeats = 100000;
// let counter = 0;
// for (let i = 0; i < repeats; i++) {
//     const desired_outcome = coin_tosser();
//     if (desired_outcome) {
//       counter += 1;
//     }
// }
// console.log(`Getting 8 heads and 2 tails, ${(counter/repeats) * 100}% of the time`);

//-------------------------------  
const legend = ["Population Size", N, "Generations:", generations]

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
      <LineChart data={data} x_label="Generation" y_label="p" legend_values={legend}/>
    </div>
  );
}

export default App;
