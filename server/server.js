// the original way of getting a directory
// console.log( __dirname + '/../public' );
// RESULT: Notice how it goes into /server and then leaves it
// C:\Users\javin\Desktop\CODING\01-Courses\04-Udemy\01-CompleteNodeJSDeveloper\node-chat-app\server/../public


// a better way of doing it to avoid in-n-out jumps; path is node built-in
const path = require( 'path' );
const publicPath = path.join( __dirname, '../public');
// console.log( publicPath );
// RESULT: Notice how it does NOT go into /server at all
// C:\Users\javin\Desktop\CODING\01-Courses\04-Udemy\01-CompleteNodeJSDeveloper\node-chat-app\public

const port = process.env.PORT || 3000;

// load in and configure express
const express = require( 'express' );

// give us a shorthand method of using express
let app = express();

// tell express which folder we're using for our app
app.use( express.static( publicPath ));

// tell express to listen for changes on the server port we set up
app.listen( port, () => {
  console.log( `Server up on port ${ port }.`)
});
