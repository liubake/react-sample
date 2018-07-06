import React from 'react';
import Tweet from './Tweet.react.js';

let listStyle = {
  padding: '0'
};

let listItemStyle = {
  listStyle: 'none',
  display: 'inline-block' 
};

export default class TweetList extends React.Component{
  constructor(props) {
    super(props); 
    // Functions must be bound manually with ES6 classes
    this.getListOfTweetIds = this.getListOfTweetIds.bind(this);
    this.getTweetElement = this.getTweetElement.bind(this);
  };

  getListOfTweetIds () {
    return Object.keys(this.props.tweets);
  };

  getTweetElement (tweetId) {
    let tweet = this.props.tweets[tweetId];
    let handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;
    let tweetElement=handleRemoveTweetFromCollection?(<Tweet tweet={tweet} onImageClick={handleRemoveTweetFromCollection} />):(<Tweet tweet={tweet} />);
    return <li style={listItemStyle} key={tweet.id}>{tweetElement}</li>;
  };

  render () {
    let tweetElements = this.getListOfTweetIds().map(this.getTweetElement);
    return (
      <ul style={listStyle}>
        {tweetElements}
      </ul>
    ); 
  }
}