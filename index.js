var React = require('react');
var addons = require('@kadira/storybook-addons').default;
var constants = require('./constants');

module.exports = {
  WithConfluencePage: WithConfluencePage,
  confluencePageDecorator: confluencePageDecorator
};

function WithConfluencePage(props) {
  var channel = addons.getChannel();

  channel.emit(constants.ADD_PAGE_EVENT, {
    space: props.space,
    title: props.title
  });

  return props.children;
}

function confluencePageDecorator(space, title) {
  return function(story) {
    var props = {
      space: space,
      title: title
    };

    return React.createElement(WithConfluencePage, props, story());
  };
}
