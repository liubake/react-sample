import React from 'react';
import Header from './Header.react';
import Button from './Button.react';
import CollectionRenameForm from './CollectionRenameForm.react';
import CollectionExportForm from './CollectionExportForm.react';

export default class CollectionControls extends React.Component{
  constructor(props) {
    super(props); 
    // Set up initial state
    this.state = { name: 'new', isEditingName: false };
    // Functions must be bound manually with ES6 classes
    this.getHeaderText = this.getHeaderText.bind(this);
    this.setCollectionName = this.setCollectionName.bind(this);
    this.toggleEditCollectionName = this.toggleEditCollectionName.bind(this); 
  };

  setCollectionName (name) {
    this.setState({ name: name, isEditingName: false });
  };

  toggleEditCollectionName () {
    this.setState({ isEditingName: !this.state.isEditingName });
  };

  getHeaderText () {
    let numberOfTweetsInCollection = this.props.numberOfTweetsInCollection;
    let text = numberOfTweetsInCollection;
    text+=numberOfTweetsInCollection === 1?' tweet in your':' tweets in your';
    return (
      <span>
        {text} <strong>{this.state.name}</strong> collection
      </span>
    );
  };

  render () {
    return this.state.isEditingName?
    (
      <CollectionRenameForm name={this.state.name}
        onChangeCollectionName={this.setCollectionName}
        onCancelCollectionNameChange={this.toggleEditCollectionName} />
    ):
    (
      <div>
        <Header text={this.getHeaderText()} />    
        <Button label="Rename collection" handleClick={this.toggleEditCollectionName} />   
        <Button label="Empty collection" handleClick={this.props.onRemoveAllTweetsFromCollection} />   
        <CollectionExportForm htmlMarkup={this.props.htmlMarkup} />
      </div>
    );
  }
}