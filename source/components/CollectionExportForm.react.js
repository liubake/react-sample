import React from 'react';

let formStyle = { display: 'inline-block' };

export default class CollectionExportForm extends React.Component{
  render() {
    return (
      <form action="http://codepen.io/pen/define" method="POST" target="_blank" style={formStyle}>
        <input type="hidden" name="data" value={this.props.htmlMarkup} />
        <button type="submit" className="btn btn-default">Export as HTML</button>
      </form>
    );
  }
}