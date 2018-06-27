import React from 'react';
import ReactDOM from 'react-dom';
import Tweet from './Tweet.react';
import Header from './Header.react';

export default class StreamTweet extends React.Component{
  constructor(props) {
    super(props); 
    // Set up initial state
    this.state = {
      headerText: null,
      numberOfCharactersIsIncreasing: null     
    };
  };

  componentWillMount () {
    console.log('[Snapterest] StreamTweet: 2. Running componentWillMount()');  
    this.setState({
      numberOfCharactersIsIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    });
    window.snapterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayedTweets: 1
    };
  };
  
  componentDidMount () {
    console.log('[Snapterest] StreamTweet: 3. Running componentDidMount()');   
    let componentDOMRepresentation = ReactDOM.findDOMNode(this);
    window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
    window.snapterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML;
  };

  componentWillReceiveProps (nextProps) {
    console.log('[Snapterest] StreamTweet: 4. Running componentWillReceiveProps()');
    let currentTweetLength = this.props.tweet.text.length;
    let nextTweetLength = nextProps.tweet.text.length;
    let isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength);
    let headerText=isNumberOfCharactersIncreasing?'Number of characters is increasing':'Latest public photo from Twitter';
    this.setState({ 
      headerText: headerText,
      numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing });
    window.snapterest.numberOfReceivedTweets++;
  };

  shouldComponentUpdate (nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 5. Running shouldComponentUpdate()');  
    return (nextProps.tweet.text.length > 1);
  };

  componentDidUpdate (prevProps, prevState) {
    console.log('[Snapterest] StreamTweet: 7. Running componentDidUpdate()');  
    window.snapterest.numberOfDisplayedTweets++;
  };

  componentWillUnmount () {
    console.log('[Snapterest] StreamTweet: 8. Running componentWillUnmount()');
    delete window.snapterest;
  };

  render () {
    console.log('[Snapterest] StreamTweet: Running render()');  
    return (
      <section>
        <Header text={this.state.headerText} />
        <Tweet tweet={this.props.tweet} onImageClick={this.props.onAddTweetToCollection} />
      </section>
    ); 
  }
}