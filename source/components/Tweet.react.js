import React from 'react';
import PropTypes from 'prop-types';

let imageStyle = {
  maxHeight: '400px',
  border: '1px solid #fff',
  boxShadow: '0px 1px 1px 0px #aaa' 
};

let tweetStyle = { 
  margin: '10px',
  width: '300px',
  height: '400px',
  position: 'relative',
  display: 'inline-block',
};
 
export default class Tweet extends React.Component{
  constructor(props) {
    super(props); 
    // Functions must be bound manually with ES6 classes
    this.handleImageClick = this.handleImageClick.bind(this);
  };

  handleImageClick () {
    let tweet = this.props.tweet;
    let onImageClick = this.props.onImageClick;
    onImageClick && onImageClick(tweet);
  };

  render () {
    let tweet = this.props.tweet;
    let tweetMediaUrl = tweet.media[0].url;
    return (
      <div style={tweetStyle}>
        <img src={tweetMediaUrl} onClick={this.handleImageClick} style={imageStyle} />
      </div>
    );
  }
}

Tweet.propTypes = { 
  tweet: function(properties, propertyName, componentName) {
    var tweet = properties[propertyName];
    if (!tweet) {
      return new Error('Tweet must be set.');
    }
    if (!tweet.media) {
      return new Error('Tweet must have an image.');
    }
  },
  onImageClick: PropTypes.func
}