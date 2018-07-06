import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Header from './Header.react';
import TweetList from './TweetList.react';
import CollectionControls from './CollectionControls.react';

export default class Collection extends React.Component{
  constructor(props) {
    super(props); 
    // Functions must be bound manually with ES6 classes
    this.getListOfTweetIds = this.getListOfTweetIds.bind(this);
    this.getNumberOfTweetsInCollection = this.getNumberOfTweetsInCollection.bind(this);
    this.createHtmlMarkupStringOfTweetList = this.createHtmlMarkupStringOfTweetList.bind(this); 
  };

  getListOfTweetIds () {
    return Object.keys(this.props.tweets);
  };

  getNumberOfTweetsInCollection () {
    return this.getListOfTweetIds().length;
  };

  createHtmlMarkupStringOfTweetList () {
    let htmlString = ReactDOMServer.renderToStaticMarkup(<TweetList tweets={this.props.tweets} />);
    let htmlMarkup = { html: htmlString };
    return JSON.stringify(htmlMarkup);
  };

  render () {
    let numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();
    if (numberOfTweetsInCollection > 0) {
      let tweets = this.props.tweets;
      let htmlMarkup = this.createHtmlMarkupStringOfTweetList();
      let removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;
      let handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;
      return (
        <div>
          <CollectionControls
            numberOfTweetsInCollection={numberOfTweetsInCollection}
            htmlMarkup={htmlMarkup}
            onRemoveAllTweetsFromCollection={removeAllTweetsFromCollection} />
          <TweetList
            tweets={tweets}
            onRemoveTweetFromCollection={handleRemoveTweetFromCollection} />
        </div>
      );
    }
    return <Header text="Your collection is empty" />;
  };
}