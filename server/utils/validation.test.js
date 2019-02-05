const expect = require( 'expect' );

const { isRealString } = require( './validation.js' );

describe( 'isRealString', () => {
  it( 'should reject non-string values', () => {
    let result = isRealString( 90 );
    expect( result ).toBe( false ) ;
  });

  it( 'should reject string with only spaces', () => {
    let result = isRealString( '      ' );
    expect( result ).toBe( false );
  });

  it( 'should allow string with non-space characters', () => {
    let result = isRealString( '  Johnny     ' );
    expect( result ).toBe( true );
  });
});
