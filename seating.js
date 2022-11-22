// import { EOL } from 'os';
const os = require('os');
const EOL = os.EOL;

// const seatColor = 'W' | 'A' | 'M';
// const seat = { seatNum: 1, color: 'W' };
var seats = [];
var totalRows = 0;
var totalCols = 0;
var totalSeats = 0;
var totalMiddleBatches = 0;
// seats.push(seat);
// console.log(seats);

function getSeatColor(seatArrangement) {
    // console.log("HERE");
    // const startBatch = seatArrangement[0];
    // const endBatch = seatArrangement[seatArrangement.length - 1]
    // const middleBatches = [];
    // for (count = 0; count < seatArrangement.length; count++) {
    //     const currMax = seatArrangement[count][1];
    //     if (currMax > totalRows) {
    //         totalRows = currMax;
    //     }
    //     if (count !== 0 && count !== seatArrangement.length - 1) {
    //         middleBatches.push(seatArrangement[count]);
    //     }
    //     totalCols = totalCols + seatArrangement[count][1];
    //     totalSeats = totalSeats + (seatArrangement[count][0] * seatArrangement[count][1]);
    // }

    // var row = 1;
    // var col = 1;
    // var seat = {};
    // var color = '';
    // var collOffset = 1;
    // for (count = 1; count < totalSeats + 1; count++) {
    //     for (c = 0; c < middleBatches.length; c++) {
    //         if (startBatch[1] > row) {
    //             if (startBatch[0] >= col) {
    //                 console.log("No offset for count: ", count);
    //                 if (col % startBatch[0] === 1) {
    //                     color = 'W';
    //                     break;
    //                 } else if (col % startBatch[0] !== 1 && col % startBatch[0] !== 0) {
    //                     color = 'M';
    //                     break;
    //                 } else if (col % startBatch[0] === 0) {
    //                     color = 'A';
    //                     break;
    //                 }
    //             } else { collOffset = startBatch[0] }
    //         } else if (middleBatches[c][1] > row) {
    //             console.log("col => ", col, " collOffset => ", collOffset, " middleBatches[c][0] => ", middleBatches[c][0], " count => ", count);
    //             if (middleBatches[c][0] >= collOffset) {
    //                 if (col % (middleBatches[c][0] + collOffset) !== 0 || col % (middleBatches[c][0] + collOffset) !== 1) {
    //                     color = 'M';
    //                     break;
    //                 }
    //                 if (col % (middleBatches[c][0] + collOffset) === 0 || col % (middleBatches[c][0] + collOffset) === 1) {
    //                     color = 'A';
    //                     break;
    //                 }
    //             } else { collOffset = middleBatches[c][0] }
    //         } else if (endBatch[1] > row) {
    //             console.log("col => ", col, " collOffset => ", collOffset, " endBatch[0] => ", endBatch[0], " count => ", count);
    //             if (endBatch[0] >= col) {
    //                 if (col % (endBatch[0] + collOffset) === 1) {
    //                     color = 'A';
    //                     break;
    //                 }
    //                 if (col % (endBatch[0] + collOffset) !== 1 && col % (endBatch[0] + collOffset) !== 0) {
    //                     color = 'M';
    //                     break;
    //                 }
    //                 if (col % (endBatch[0] + collOffset) === 0) {
    //                     color = 'W';
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     col++;
    //     seat = { seatNum: count, color: color };
    //     seats.push(seat);
    //     if (col === totalCols) { col = 1; row++; }
    // }

    var rows = [];
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
    for (row = 1; row < totalRows; row++) {
        for (col = 1; col <= totalCols; col++) {
            if (batchNum < seatArrangement.length) {
                if (row <= seatArrangement[batchNum][1]) {
                    if (col > seatArrangement[batchNum][0] + collOffset) {
                        collOffset = collOffset + seatArrangement[batchNum][0];
                        batchNum++;
                    } else {
                    }
                    if (batchNum === 0) {
                        console.log("rCol:", seatArrangement[batchNum][0] + collOffset, " for col:", col, " seat:", seatCount);
                        if (col <= seatArrangement[batchNum][0] + collOffset) {
                            if (col % (seatArrangement[batchNum][0] + collOffset) === 1) {
                                color = 'W';
                            }
                            if (col % (seatArrangement[batchNum][0] + collOffset) === 0) {
                                console.log("HERE for seat ", seatCount);
                                color = 'A';
                            }
                            if (col % (seatArrangement[batchNum][0] + collOffset) !== 1 && col % (seatArrangement[batchNum][0] + collOffset) !== 0) {
                                color = 'M';
                            }
                        }
                    } else if (batchNum === seatArrangement.length - 2) {
                        if (col <= seatArrangement[batchNum][0] + collOffset) {
                            if (col % (seatArrangement[batchNum][0] + collOffset) === 1) {
                                color = 'A';
                            }
                            if (col % (seatArrangement[batchNum][0] + collOffset) === 0) {
                                color = 'W';
                            }
                            if (col % (seatArrangement[batchNum][0] + collOffset !== 1) && col % (seatArrangement[batchNum][0] + collOffset) !== 0) {
                                color = 'M';
                            }
                        }
                    } else if (batchNum === seatArrangement.length - 1) {
                        console.log("offset:", collOffset, "batchNum:", batchNum, "arrays:", seatArrangement.length);
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
            seat = { seatNumber: seatCount, color: color };
            seats.push(seat);
            seatCount++;
        }
        batchNum = 0;
        collOffset = 0;
    }
    // });

    // console.log(seatArrangement);
    // console.log(startBatch);
    // console.log(endBatch);
    // console.log(middleBatches);
    // console.log(totalRows);
    // console.log(totalCols);
    // console.log(totalSeats);
    console.log(seats);

}

if (!module.parent) {
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
    console.log(passengersCount);
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
}