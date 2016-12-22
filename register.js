var React = require('react');
var addons = require('@kadira/storybook-addons').default;
var ConfluencePage = require('./ConfluencePage');
var constants = require('./constants');

addons.register(constants.PREFIX, (api) => {
  addons.addPanel(constants.PANEL, {
    title: 'Confluence',
    render: function() {
      return React.createElement(ConfluencePage, {
        channel: addons.getChannel(),
        api: api
      });
    }
  });
});
