import { EOL } from 'os';
import { red, white, green, yellow, bold } from 'colorette';

const LEGEND = [
    `${green('■')} Window`,
    `${red('■')} Middle`,
    `${white('■')} Aisle`,
    `${yellow('■')} Empty`,
];

var seats = [];
var totalRows = 0;
var totalCols = 0;

function seatPassengers(passengersCount) {
    var passenger = 1;
    seats.filter(seat => { if (seat.color === 'A') { return seat } }).forEach(seat => {
        if (passenger <= passengersCount) {
            seat.passenger = white(passenger.toLocaleString('en-US', {
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

function printSeatingArrangment(seatArrangement) {
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

function getSeatColor(seatArrangement) {
    seatArrangement.forEach(seatBatch => {
        totalCols = totalCols + seatBatch[0];
        const currMax = seatBatch[1];
        if (currMax > totalRows) {
            totalRows = currMax;
        }
    });

    let batchNum = 0;
    var seatCount = 0;
    let color = '';
    let seat = '';
    new Array(totalRows).fill(0).forEach(function (row, r) {
        let countedCols = 1;
        new Array(totalCols).fill(0).forEach(function (col, c) {
            if (r >= seatArrangement[batchNum][1]) {
            } else {
                if (c === 0 || c === totalCols - 1) {
                    color = "W";
                    seat = { seatNumber: seatCount, color: color, passenger: yellow('■■') };
                    seats.push(seat);
                } else if (countedCols !== 1 && countedCols !== seatArrangement[batchNum][0]) {
                    color = 'M';
                    seat = { seatNumber: seatCount, color: color, passenger: yellow('■■') };
                    seats.push(seat);
                } else {
                    color = 'A';
                    seat = { seatNumber: seatCount, color: color, passenger: yellow('■■') };
                    seats.push(seat);
                }
                seatCount++;
            }
            if (countedCols === seatArrangement[batchNum][0]) {
                batchNum++;
                countedCols = 0;
            }

            countedCols++;
        });
        batchNum = 0;
    });
}

const args = process.argv;
if (args.length !== 4) {
    console.error(`Usage: node seating.js <seat_layout> <passengers_count>${EOL}Example: node seating.js "[[3,2],[4,3],[2,3],[3,4]]" "30"`);
    process.exit(1);
}

try {
    const seatArrangement = JSON.parse(args[2]);
    const passengersCount = parseInt(args[3], 10);
    getSeatColor(seatArrangement);
    seatPassengers(passengersCount);
    printSeatingArrangment(seatArrangement);
} catch (err) {
    if (err instanceof SyntaxError) {
        console.error('Error parsing seat layout configuration. Please make sure it is valid JSON!');
    } else if (err instanceof TypeError) {
        console.error('Invalid passenger count. Please make sure it is a valid integer!');
    } else {
        console.error(err);
    }
    process.exit(1);
}