import React from 'react';
import { DrawGrid } from "../grids/DrawGrid";
import { UpdateGrid } from "../grids/UpdateGrid";
  
const d = 1; //max mating distance
const grid_length = 100; // A square grid i.e the population will be the area of the grid(100^2 = 10000)
let grid = []; //A 2-D array containing rows
const p = 0.5;
let a1a1 = 0; // A person is represented by a genotype
let a1a2 = 0;
let a2a2 = 0;
let generation_counter = 0;

const init_grid = () => {
    //Initialize a 2-D array
    for (let i = 0; i < grid_length; i++) {
        grid[i] = [];
        for (let ii = 0; ii < grid_length; ii++) {
            const random_no = Math.random();
            if (random_no < p * p) {
                grid[i][ii] = "A1A1"
                a1a1 += 1
            } else if (random_no > 1 - (1 - p) * (1 - p)) {
                grid[i][ii] = "A2A2"
                a2a2 += 1
            }
            else {
                grid[i][ii] = "A1A2"
                a1a2 += 1
            }

        }
    }
    console.log(`a1a1: ${a1a1} a1a2: ${a1a2} a2a2: ${a2a2} are the hardy-weinberg frequencies equilibrium`)
}


const get_random_int = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min; //The correct range btw min and max in integer form and returns it
}

const get_bounded_index = index => {
    let bounded_index = index;
    if (index < 0) {
        bounded_index = index + grid_length;
    }
    if (index >= grid_length) {
        bounded_index = index - grid_length;  
    }
    return bounded_index;
}

//implementing the mating partner function
const pick_mate = (i, ii) => {
    //define the possibe coordinates of the mating partner
    let j = get_random_int(i - d, i + d);
    let jj = get_random_int(ii - d, ii + d);
    j = get_bounded_index(j);
    jj = get_bounded_index(jj);
    return grid[j][jj];
};

//Getting offsprings using Mendelian Genetics Laws
const get_offsprings = (parent1, parent2) => {
    const p1 = parent1;
    const p2 = parent2;  
    if (p1 === "A1A1" && p2 === "A1A1") {
        return "A1A1";
    } else if ((p1 === "A1A1" && p2 === "A1A2") || (p1 === "A1A2" && p2 === "A1A1")) {
        if (Math.random() < 0.5) {
            return "A1A1"
        } else {
            return "A1A2"
        }
    } else if ((p1 === "A1A1" && p2 === "A2A2") || (p1 === "A2A2" && p2 === "A1A1")) {
        return "A1A2";
    } else if (p1 === "A1A2" && p2 === "A1A2") {
        const random_number = Math.random()
        if (random_number < 0.25) {
            return "A1A1"
        } else if(random_number > 0.75) {
            return "A2A2"
        } else {
            return "A1A2"
        }
    } else if ((p1 === "A2A2" && p2 === "A1A2") || (p1 === "A1A2" && p2 === "A2A2")) {
        if (Math.random() < 0.5) {
            return "A2A2"
        } else {
            return "A1A2"
        }
    } else if (p1 === "A2A2" && p2 === "A2A2") {
        return "A2A2";
    }  
}

const print_data = () => {
    a1a1 = 0;
    a1a2 = 0;
    a2a2 = 0;
    for (let i = 0; i < grid_length; i++) {
        for (let ii = 0; ii < grid_length; ii++) {
            if (grid[i][ii] === "A1A1") {
                a1a1 += 1;
            } else if (grid[i][ii] === "A1A2") {
                a1a2 += 1;
            } else {
                a2a2 += 1;
            }
        }
    }
    console.log(`Generation ${generation_counter}: a1a1: ${a1a1} a1a2: ${a1a2} a2a2: ${a2a2}`);
    const N = a1a1 + a1a2 + a2a2;
    const h_o = a1a2 / N;  //Observed heterozgousity
    let p = ((2 * a1a1) + a1a2) / (2 * N);  //Absolute numbers of a1 alleles we have in this population
    const h_e = 2 * p * (1 - p); //The expected heterozygousity under hardy-weinberg equilibrium i.e 2pq
    const F = (h_e - h_o) / h_e;
    //restricting the mating distance will cause a lot of inbreeding and we'll be expecting an F statistic of about 0.3 or higher which is a good measure to the extent in which heterozygousity is reduced
    console.log(`The F statistics is ${F}`);
}

//Implementing the function that gets called in each generations, which goes through each individual(each cell), choose a mating partner for that individual, generate the correct offspring and replace the parent gen with the offspring gen. 
const run_generation = () => {
    let temp_grid = []; //also a 2-D array that's identical to the original grid in the global variable but for the offsprings of the preceeding generation. 
    for (let i = 0; i < grid_length; i++) {
        temp_grid[i] = [];
        for (let ii = 0; ii < grid_length; ii++) {
            const mating_partner = pick_mate(i, ii); //i and ii are the current positions we are in the array on the loop which are gonna be coordinates of the grid
            //Picking offspring based on mendelian inheritance which depends on the 2 genotypes we have here i.e from the current loop position and the mating partner function.
            temp_grid[i][ii] = get_offsprings(grid[i][ii], mating_partner);
        }
    }
    for (let i = 0; i < grid_length; i++) {
        for (let ii = 0; ii < grid_length; ii++) {
            grid[i][ii] = temp_grid[i][ii];
            
        }        
    }
    //Print the data of the current generation
    print_data();
    //Keeping track of the no of generations we currently are
    generation_counter += 1;
}

init_grid();

DrawGrid(grid);

//Using setInterval() method to runs generations and updates grid with delays inbetween
const simulate_and_visualize = () => {
    run_generation();
    UpdateGrid(grid);
}

setInterval(simulate_and_visualize, 10);

// for (let i = 0; i < 100; i++) {
//     run_generation();    
// }

function SpatialModels() {
    return (
        <div>
            
        </div>
    )
}

export default SpatialModels
