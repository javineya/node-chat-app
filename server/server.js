// the original way of getting a directory
// console.log( __dirname + '/../public' );
// RESULT: Notice how it goes into /server and then leaves it
// C:\Users\javin\Desktop\CODING\01-Courses\04-Udemy\01-CompleteNodeJSDeveloper\node-chat-app\server/../public


// a better way of doing it to avoid in-n-out jumps; .path is node built-in
const path = require( 'path' );
// http is used by express to set up our server; we need it explicitly here
const http = require( 'http' );
const publicPath = path.join( __dirname, '../public');
// console.log( publicPath );
// RESULT: Notice how it does NOT go into /server at all
// C:\Users\javin\Desktop\CODING\01-Courses\04-Udemy\01-CompleteNodeJSDeveloper\node-chat-app\public
const socketIO = require( 'socket.io' );

const { generateMessage } = require( './utils/message.js' );

const port = process.env.PORT || 3000;

// load in and configure express
const express = require( 'express' );

// give us a shorthand method of using express
let app = express();
// use this to allow for socketIO connections to our app
let server = http.createServer( app );
// this is to set up our websocket server
let io = socketIO( server );

// tell express where to find our app
app.use( express.static( publicPath ));

// create event listeners for our websock server to listen for
// listen for a new connection to the app (most popular event)
io.on( 'connection', ( socket ) => {
    console.log( 'New user connected.' );

    socket.emit( 'newMessage', generateMessage( 'Admin', 'Welcome to the chat app!' ));

    socket.broadcast.emit( 'newMessage', generateMessage( 'Admin', 'New user joined.'));

    socket.on( 'createMessage', ( message, callback ) => {
      console.log( message );
      // io.emit() emits to every connection logged in
      io.emit( 'newMessage', generateMessage( message.from, message.text ));

      callback( 'Server sayeth thus.' );
    });
});


// tell express to listen for changes on the server port we set up
server.listen( port, () => {
  console.log( `Server up on port ${ port }.`)
});
