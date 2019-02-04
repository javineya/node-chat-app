let socket = io();

socket.on( 'connect', function() {
  console.log( 'Connected to server.' );
});

socket.on( 'disconnect', function() {
  console.log( 'Disconnected from server.' );
});

socket.on( 'newMessage', function( message ) {
  let formattedTime = moment( message.createdAt ).format( 'h:mm a' );

  let li = jQuery( '<li></li>');
  li.text( `${ message.from } ${ formattedTime }: ${ message.text }`);

  jQuery( '#messages' ).append( li );
});

socket.on( 'newLocationMessage', function( message ) {
  let li = jQuery( '<li></li>' );
  let a = jQuery( '<a target="_blank">My Current Location</a>' );
  let formattedTime = moment( message.createdAt ).format( 'h:mm a' );

  li.text( `${ message.from } ${ formattedTime }: `);
  a.attr( 'href', message.url );
  li.append( a );
  jQuery( '#messages' ).append( li );
});

jQuery( '#message-form' ).on( 'submit', function( event ) {
  event.preventDefault();
  let messageTextBox = jQuery('[name=message]');

  socket.emit( 'createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    // clear message form after message sent
    messageTextBox.val( '' );
  });
});

let locationButton = jQuery( '#send-location');
locationButton.on( 'click', function () {
  console.log( "Clicked Send Location." );
  if ( !navigator.geolocation ) {
    return alert( "Geolocation not supported by your browser." );
  }
  // disable button while location sending
  locationButton.attr( 'disabled', 'disabled' )
    .text( 'Sending...' );

  // grab the user's geolocation
  navigator.geolocation.getCurrentPosition( function( position ) {
    // re-enable button after location sent
    locationButton.removeAttr( 'disabled' )
      .text( 'Send Location' );
    socket.emit( 'createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr( 'disabled' );
    alert( "Unable to fetch location." );
  });
});
