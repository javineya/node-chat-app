// Jan 1st, 1970 00:00:00
// UTC - Time Zone Independent
// starting point for computer time

// 0 refers to that moment
// positive are moments after
// negative are moments before
// counted in milliseconds


/*

    MOMENT
    The only library for formatting UTC timestamp into
    user-readable code.

    Super simple to use, used in basically every JS project ever.
    Give moment a pattern to get the output you want.

*/
const moment = require( 'moment' );

let date = moment();

console.log( date.format( 'MMM Do, YYYY hh:ss a' ) );
