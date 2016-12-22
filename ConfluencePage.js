var React = require('react');
var constants = require('./constants');

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
    this.props.channel.on(constants.ADD_PAGE_EVENT, x => this.onAddPage(x.space, x.title));

    // Clear the current notes on every story change.
    this.stopListeningOnStory = this.props.api.onStory(() => this.onAddPage());
  },

  componentWillUnmount: function() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    this.props.channel.removeListener(constants.ADD_PAGE_EVENT, this.onAddPage);
  },

  onAddPage: function(space, title) {
    if (space && title) {
      var url = '/confluence/spaces/' + encodeURIComponent(space) + '/pages/' + encodeURIComponent(title);
      fetch(url)
        .then(response => response.text())
        .then(text => this.setState({ text }));
    } else {
      this.setState({ text: '' });
    }
  },

  render: function() {
    return React.createElement('div', null,
      React.createElement('div', { dangerouslySetInnerHTML: { __html: this.state.text }}));
  }
});
