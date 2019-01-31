let socket = io();

socket.on( 'connect', function() {
  console.log( 'Connected to server.' );
});

socket.on( 'disconnect', function() {
  console.log( 'Disconnected from server.' );
});

socket.on( 'newMessage', function( message ) {
  console.log( 'newMessage:', message );

  let li = jQuery( '<li></li>');
  li.text( `${ message.from }: ${ message.text }`);

  jQuery( '#messages' ).append( li );
});

socket.on( 'newLocationMessage', function( message ) {
  let li = jQuery( '<li></li>' );
  let a = jQuery( '<a target="_blank">My Current Location</a>' );

  li.text( `${message.from}: `);
  a.attr( 'href', message.url );
  li.append( a );
  jQuery( '#messages' ).append( li );
});

jQuery( '#message-form' ).on( 'submit', function( event ) {
  event.preventDefault();

  socket.emit( 'createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});

let locationButton = jQuery( '#send-location');
locationButton.on( 'click', function () {
  console.log( "Clicked Send Location." );
  if ( !navigator.geolocation ) {
    return alert( "Geolocation not supported by your browser." );
  }
  // grab the user's geolocation
  navigator.geolocation.getCurrentPosition( function( position ) {
    console.log( "CurrentPosition(): ", position.coords );
    socket.emit( 'createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert( "Unable to fetch location." );
  });
});
