// import logo from './logo.svg';
import './App.css';
// import LineChart from './LineChart';

// // 1. Initialising the genotype frequencies
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

// 2. 
// let p;
// let q = 0.5;
// let N = 100000;
// const generations = 100;
// const simulations = 10;
// const data = [];
// const pop_sizes = [];

// //Calculate the next Generation using a generic next generation function to demonstrate genetic drift
// const next_generation = (simulation_array, current_N) => {
//   const draws = 2 * current_N;
//   let a1 = 0;
//   let a2 = 0;
//   for (let i = 0; i < draws; i++) {
//     if (Math.random() <= p) {
//       a1 += 1;
//     } else {
//       a2 += 1;
//     }
//   }
//   //Calculate the new allele frequencies
//   p = a1 / draws;
//   q = a2 / draws
//   simulation_array.push(p);
// }

// //Calling the next generation function to create a new generation 1000x
// const simulation = (simulation_index) => {
//   p = 0.5;
//   let pop_size;
//   for (let i = 0; i < generations; i++) {
//     //Implementing the bottleneck for every 10th gen(i % 10)
//     if (i % 10 === 9) {
//       pop_size = 10;
//     } else {
//       pop_size = N;
//     }

//     pop_sizes.push(pop_size);
//     next_generation(data[simulation_index], pop_size);
//     console.log(`The value of p and q in generation ${i} is ${round_number(p, 4)} and ${round_number(q, 4)}`);
//   }
// }

// //Using a loop to call the simulation function 10x
// for (let i = 0; i < simulations; i++) {
//   data.push([]);
//   simulation(i);
// }

// //Calculate the harmonic mean of these set of numbers(population sizes) using a function
// const effective_pop_size = (all_pop_sizes) => {
//   let denominator = 0;
//   //Iterate over all the elements of the array provided in the argument and add the inverse of all the items to the denominator
//   for (let i = 0; i < all_pop_sizes.length; i++) {
//     let inverse_element = 1 / all_pop_sizes[i];
//     denominator += inverse_element;
//   }
  
//   return Math.round(all_pop_sizes.length / denominator);
// }

// //The effective population size
// const Ne = effective_pop_size(pop_sizes);
// console.log(`Ne is ${Ne}`);


//-------------------------------

// // 3. Coin Flipper Demonstration
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

//4. (Generating DNA Sequences) Implementing the idea of having multiple dna sequences that changes over time due to random mutation
const no_of_sequences = 100;
const sequence_length = 20;
const original_dna_sequence = [];
//The sequences array is a 2 dimensional array which contains a set of arrays which all contain identical 20-base long dna sequences. They are all identical because we don't want genetic variation
const sequences = []; //Population: which is basically a 2-D array that holds a 100 other sequences which are also arrays and each sequence belongs to a simplified person
const no_of_generations = 100;
const mutation_rate = 0.0001; //Per base and generation

const bases = ['A', 'G', 'C', 'T'];

//To generate the first generation/Population of a 100 people(100 dna sequences)
const generate_first_generation = () => {
  generate_first_sequence();
  for (let i = 0; i < no_of_sequences; i++) {
      //Return a copy of the original array using slice method and push into the sequences array
    sequences.push(original_dna_sequence.slice()); 
  }
}

//To generate the first original dna sequence 20bases long
const generate_first_sequence = () => {
  for (let i = 0; i < sequence_length; i++) {
    original_dna_sequence.push(generate_random_base(""));
  }
}

//Returns a random base(A, G, C, T) using math random(returns a number btw 0 and 1 but not including 1) and math floor(to round down) to generate the index which will be used to access a random base.
const generate_random_base = (current_base) => {
  let new_base;
  do {
    const index = Math.floor(Math.random() * 4);
    new_base = bases[index];
  } while (new_base === current_base);
  return new_base;
}

const print_sequences = (title) => {
  console.log(title)
  for (let i = 0; i < no_of_sequences; i++) {
    print_sequence(sequences[i]);
  }
  console.log("")
}

const print_sequence = sequence => {
  let sequence_string = ""
  for (let i = 0; i < sequence.length; i++) {
    sequence_string += sequence[i];
  }
  console.log(sequence_string)
}

//change the bases in those dna strings with a certain rate called mutation rate i.e introduce some random modifications in those dna sequences, using a 3 fold nested loop in a function
const run_generations = () => {
  for (let i = 0; i < no_of_generations; i++) {
    //Each generation, go through all the sequences and within each sequence, go through all the bases and occasionally change a random base.
    for (let ii = 0; ii < sequences.length; ii++) {
      //Going through each sequence
      for (let iii = 0; iii < sequences[ii].length; iii++) {
        //going through each base to change a base randomly
        //This should happen with a certain rate/probability which is the mutation rate that is 1 in 10000
          if (Math.random() < mutation_rate) {
            sequences[ii][iii] = generate_random_base(sequences[ii][iii]); //accessing the element of a 2-D array
          } 
      }
    }
  }
};

const N = 100
let p;
const simulations = 100000;
let fixations_of_mutants = 0;
let generations_that_went_to_fixation = 0

const next__generation = () => {
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
  p = a1 / draws 
}

const run_until_fixation = () => {
  p = 1 / (2 * N); //freq of one single a1 allele at the beginning
  let generation_no = 0; //To keep track of the number of generations in each simulation run
  //If p = 0 or 1, it means that either the a1 has been lost and a2 has gone into fixation or vice versa
  do {
    next__generation();
    generation_no += 1;
  } while (p > 0 && p < 1);
  //How often p goes to 1 i.e fixation
  if (p === 1) {
    fixations_of_mutants += 1;
    generations_that_went_to_fixation = generations_that_went_to_fixation + generation_no
  }
}

for (let i = 0; i < simulations; i++) {
  run_until_fixation();  
}
// console.log(`${fixations_of_mutants / simulations} is the fraction of simulations or prob that a1 has gone to fixation which is mathematically 0.005`)
//generations_that_went_to_fixation is the sum of all generations that was spent in oly those simulations where p === 1
console.log(`${generations_that_went_to_fixation / fixations_of_mutants} is the average no of generations it takes for the a1 allele to go to fixation and the expected average is 2N`)

// generate_first_generation();
// print_sequences(`Generaion 0`);
// run_generations();
// print_sequences(`After ${no_of_generations} generations`);


// const legend = ["Eff. Population Size:", Ne, "Generations:", generations]

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      <LineChart data={data} x_label="Generation" y_label="p" legend_values={legend}/> */}
    </div>
  );
}

export default App;
