import React from 'react';

let headerStyle = {
  fontSize: '16px',
  fontWeight: '300',
  margin: '20px 10px',
  display: 'inline-block' 
};

export default class Header extends React.Component{
  render() {
    return (
      <h2 style={headerStyle}>{this.props.text}</h2>
    );
  } 
}

Header.defaultProps={ text: 'Default header' }