import React from 'react';
import Header from './Header.react';
import Button from './Button.react';

let inputStyle = { marginRight: '5px'};

export default class CollectionRenameForm extends React.Component{
  constructor(props) {
    super(props); 
    // Set up initial state
    this.state = { inputValue: this.props.name };
    // Functions must be bound manually with ES6 classes
    this.setInputValue = this.setInputValue.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this); 
    this.handleFormCancel = this.handleFormCancel.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  };

  setInputValue (inputValue) {
    this.setState({ inputValue: inputValue });
  };

  handleInputValueChange (event) {
    let inputValue = event.target.value;
    this.setInputValue(inputValue);
  };

  handleFormSubmit (event) {
    event.preventDefault();
    let collectionName = this.state.inputValue;
    this.props.onChangeCollectionName(collectionName);
  };

  handleFormCancel (event) {
    event.preventDefault();
    let collectionName = this.props.name;
    this.setInputValue(collectionName);
    this.props.onCancelCollectionNameChange();
  };

  componentDidMount () {
    this.refs.collectionName.focus();
  };

  render () {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <Header text="Collection name:" />     
        <div className="form-group">
          <input className="form-control"
            style={inputStyle}
            onChange={this.handleInputValueChange}
            value={this.state.inputValue}
            ref="collectionName" />
        </div>
        <Button label="Change" handleClick={this.handleFormSubmit} />
        <Button label="Cancel" handleClick={this.handleFormCancel} />
      </form>
    ); 
  };
}