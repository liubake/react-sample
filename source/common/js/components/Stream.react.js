import React from 'react';
import Header from './Header.react';
import StreamTweet from './StreamTweet.react';
import FetchStreamClient from './FetchStreamClient';

export default class Stream extends React.Component{
  constructor(props) {
    super(props); 
    // Set up initial state
    this.state = { tweet: null };
    // Functions must be bound manually with ES6 classes
    this.handleNewTweet = this.handleNewTweet.bind(this);
  };

  handleNewTweet (tweet) {
    this.setState({ tweet: tweet });
  };
  
  componentDidMount () {
    FetchStreamClient.startFetch(this.handleNewTweet);
  };

  componentWillUnmount () {
    FetchStreamClient.stopFetch();
  };

  render () {
    let tweet = this.state.tweet;
    return tweet?(
      <StreamTweet tweet={tweet} onAddTweetToCollection={this.props.onAddTweetToCollection} />
    ):(
      <Header text="Waiting for public photos from Twitter..." />
    );
  };
}