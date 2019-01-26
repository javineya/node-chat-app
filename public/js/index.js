let socket = io();

socket.on( 'connect', function() {
  console.log( 'Connected to server.' );

  // socket.emit( 'createEmail', {
  //   to: 'vanessa@example.com',
  //   text: 'Hey, what up?'
  // });

  socket.emit( 'createMessage', {
    from: 'JesterVae',
    text: 'Works for me!'
  });
});

socket.on( 'disconnect', function() {
  console.log( 'Disconnected from server.' );
});

// socket.on( 'newEmail', function( email ) {
//   console.log( 'New email.', email );
// });

socket.on( 'newMessage', function ( message ) {
  console.log( 'newMessage:', message );
});
