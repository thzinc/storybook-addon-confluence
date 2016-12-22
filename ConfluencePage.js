var React = require('react');
var ADD_PAGE_EVENT = require('./constants').ADD_PAGE_EVENT;

module.exports = React.createClass({
  propTypes: {
    channel: React.PropTypes.object,
    api: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      text: ''
    };
  },

  componentDidMount: function() {
    const { channel, api } = this.props;
    channel.on(ADD_PAGE_EVENT, x => this.onAddPage(x.space, x.title));

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => this.onAddPage());
  },

  componentWillUnmount: function() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel } = this.props;
    channel.removeListener(ADD_PAGE_EVENT, this.onAddPage);
  },

  onAddPage: function(space, title) {
    if (space && title) {
      const url = `/confluence/spaces/${encodeURIComponent(space)}/pages/${encodeURIComponent(title)}`;
      fetch(url)
        .then(response => response.text())
        .then(text => this.setState({ text }));
    } else {
      this.setState({ text: '' });
    }
  },

  render: function() {
    const { text } = this.state;

    return React.createElement('div', null,
      React.createElement('div', { dangerouslySetInnerHTML: { __html: text }}));
  }
});
