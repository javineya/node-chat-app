/************
  ES6 Classes
************/

class Users {
  // add a constructor function to initialize class
  constructor() {
    // use 'this' so we don't update all Person objects
    this.users = [];
  }

  addUser ( id, name, room ) {
    let user = { id, name, room };
    this.users.push( user );

    return user;
  }

  getUser ( id ) {
    return this.users.filter(( user ) => user.id === id )[0];
  }

  removeUser ( id ) {
    // return removed user
    let user = this.getUser( id );

    if ( user ) {
      this.users = this.users.filter(( user ) => user.id !== id );
    }

    return user;
  }

  getUserList ( room ) {
    let users = this.users.filter(( user ) => user.room === room);
    let namesArray = users.map(( user ) => user.name );

    return namesArray;
  }
};

module.exports = { Users };
