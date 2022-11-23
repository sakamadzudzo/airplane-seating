// const os = require('os');
// const EOL = os.EOL;
// const chalk = require('chalk');
import { EOL } from 'os';
import { red, blue, green, yellow, bold } from 'colorette';

const LEGEND = [
    `${green('■')} Window`,
    `${red('■')} Middle`,
    `${blue('■')} Aisle`,
    `${yellow('■')} Empty`,
];

var seats = [];
var totalRows = 0;
var totalCols = 0;
var seatedPassengers = [];

function getSeatColor(seatArrangement) {
    seatArrangement.forEach(seatBatch => {
        totalCols = totalCols + seatBatch[0];
        const currMax = seatBatch[1];
        if (currMax > totalRows) {
            totalRows = currMax;
        }
    });

    var batchNum = 0;
    var collOffset = 0;
    var seatCount = 1;
    var color = '';
    for (let row = 1; row < totalRows; row++) {
        for (let col = 1; col <= totalCols; col++) {
            if (batchNum < seatArrangement.length) {
                if (row <= seatArrangement[batchNum][1]) {
                    if (col > seatArrangement[batchNum][0] + collOffset) {
                        collOffset = collOffset + seatArrangement[batchNum][0];
                        batchNum++;
                    } else {
                    }
                    if (batchNum === 0) {
                        // console.log("rCol:", seatArrangement[batchNum][0] + collOffset, " for col:", col, " seat:", seatCount);
                        if (col <= seatArrangement[batchNum][0] + collOffset) {
                            if (col % (seatArrangement[batchNum][0] + collOffset) === 1) {
                                color = 'W';
                            }
                            if (col % (seatArrangement[batchNum][0] + collOffset) === 0) {
                                color = 'A';
                            }
                            if (col % (seatArrangement[batchNum][0] + collOffset) !== 1 && col % (seatArrangement[batchNum][0] + collOffset) !== 0) {
                                color = 'M';
                            }
                        }
                    } else if (batchNum < seatArrangement.length - 1) {
                        if (col <= (seatArrangement[batchNum][0] + collOffset)) {
                            if (col % (seatArrangement[batchNum][0] + collOffset) === 1) {
                                color = 'A';
                            }
                            if (col % (seatArrangement[batchNum][0] + collOffset) === 0) {
                                color = 'A';
                            }
                            if (col % (seatArrangement[batchNum][0] + collOffset !== 1) && col % (seatArrangement[batchNum][0] + collOffset) !== 0) {
                                color = 'M';
                            }
                        }
                    } else if (batchNum === seatArrangement.length - 1) {
                        if (col % (seatArrangement[batchNum][0] + collOffset) === 1) {
                            color = 'A';
                        }
                        if (col % (seatArrangement[batchNum][0] + collOffset) === 0) {
                            color = 'A';
                        }
                        if (col % (seatArrangement[batchNum][0] + collOffset) !== 1 && col % (seatArrangement[batchNum][0] + collOffset) !== 0) {
                            color = 'M';
                        }
                    }
                }
            }
            let seat = { seatNumber: seatCount, color: color, passenger: yellow('■■') };
            seats.push(seat);
            seatCount++;
        }
        batchNum = 0;
        collOffset = 0;
    }
}

function seatPassengers(passengersCount) {
    var passenger = 1;
    seats.filter(seat => { if (seat.color === 'A') { return seat } }).forEach(seat => {
        if (passenger <= passengersCount) {
            seat.passenger = blue(passenger.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }));
            passenger++;
        }
    })
    seats.filter(seat => { if (seat.color === 'W') { return seat } }).forEach(seat => {
        if (passenger <= passengersCount) {
            seat.passenger = green(passenger.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }));
            passenger++;
        }
    })
    seats.filter(seat => { if (seat.color === 'M') { return seat } }).forEach(seat => {
        if (passenger <= passengersCount) {
            seat.passenger = red(passenger.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }));
            passenger++;
        }
    })
}

function printSeatingArrangment() {
    let row = 1;
    let batchNum = 0;
    let rowPrint = '';
    console.log(`${EOL}🡑 Cockpit This Way 🡑${EOL}`);
    var seatCount = 0;
    new Array(totalRows).fill(0).forEach(function (row, r) {
        let countedCols = 1;
        new Array(totalCols).fill(0).forEach(function (col, c) {
            if (r >= seatArrangement[batchNum][1]) {
                rowPrint = rowPrint + "|——|";
            } else {
                rowPrint = rowPrint + "|" + seats[seatCount].passenger + "|";
                seatCount++;
            }
            if (countedCols === seatArrangement[batchNum][0]) {
                batchNum++;
                countedCols = 0;
                rowPrint = rowPrint + "    ";
            }
            countedCols++;
        });
        console.log(rowPrint);
        rowPrint = '';
        batchNum = 0;
    });
    console.log(`${EOL}${bold('Legend')}`);
    console.log(LEGEND.join('\t'));
    console.log(EOL);
}

// if (!module.parent) {
const args = process.argv;
if (args.length !== 4) {
    console.error(`Usage: node seating.js <seat_layout> <passengers_count>${EOL}Example: node seating.js "[[3,2],[4,3],[2,3],[3,4]]" "30"`);
    process.exit(1);
}

// break if args exist
// try {
const seatArrangement = JSON.parse(args[2]);
const passengersCount = parseInt(args[3], 10);
getSeatColor(seatArrangement);
seatPassengers(passengersCount);
printSeatingArrangment();
    // console.log(passengersCount);
    // } catch (err) {
    //     if (err instanceof SyntaxError) {
    //         console.error('Error parsing seat layout configuration. Please make sure it is valid JSON!');
    //     } else if (err instanceof TypeError) {
    //         console.error('Invalid passenger count. Please make sure it is a valid integer!');
    //     } else {
    //         console.error(err);
    //     }
    //     process.exit(1);
    // }
// }