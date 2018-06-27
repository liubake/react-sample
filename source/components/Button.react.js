import React from 'react';

let buttonStyle = {
  margin: '10px 10px 10px 0'
};

export default class Button extends React.Component{
  render () {
    return (
      <button
        className="btn btn-default"
        style={buttonStyle}
        onClick={this.props.handleClick}>{this.props.label}</button>
    );
  }
}