import React from 'react';
import Stream from './Stream.react';
import Collection from './Collection.react';

export default class Application extends React.Component{
  constructor(props) {
    super(props); 
    // Set up initial state
    this.state = { collectionTweets: {} };
    // Functions must be bound manually with ES6 classes
    this.addTweetToCollection = this.addTweetToCollection.bind(this);
    this.removeTweetFromCollection = this.removeTweetFromCollection.bind(this);
    this.removeAllTweetsFromCollection = this.removeAllTweetsFromCollection.bind(this); 
  };

  removeAllTweetsFromCollection () {
    this.setState({
      collectionTweets: {}
    });
  };

  addTweetToCollection (tweet) {
    let collectionTweets = this.state.collectionTweets;
    collectionTweets[tweet.id] = tweet; 
    this.setState({
      collectionTweets: collectionTweets
    }); 
  };

  removeTweetFromCollection (tweet) {
    let collectionTweets = this.state.collectionTweets; 
    delete collectionTweets[tweet.id];
    this.setState({
      collectionTweets: collectionTweets
    }); 
  };

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 text-center">
            <Stream onAddTweetToCollection={this.addTweetToCollection}/>
          </div>
          <div className="col-md-8">
            <Collection tweets={this.state.collectionTweets}
              onRemoveTweetFromCollection={this.removeTweetFromCollection}
              onRemoveAllTweetsFromCollection={this.removeAllTweetsFromCollection} />
          </div>
        </div>
      </div>
    );
  };
}