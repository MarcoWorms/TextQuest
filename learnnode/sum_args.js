'use strict'

let args = process.argv;
let sum = 0;

args.forEach(
    arg => {
        if (!isNaN(arg)) {
            sum += Number(arg)
        };
    }
)

console.log(sum)