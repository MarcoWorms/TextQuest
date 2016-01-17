'use strict'

let argPath = process.argv[2];

let fs = require('fs')

let syncBuffer = fs.readFileSync(argPath)

let splitBuffer = syncBuffer.toString().split('\n')

console.log(splitBuffer.length-1)