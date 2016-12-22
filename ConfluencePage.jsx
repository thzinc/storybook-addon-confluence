import React from 'react';
import { ADD_PAGE_EVENT } from './constants';

export default class ConfluencePage extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      text: '',
    };
    this.onAddPage = this.onAddPage.bind(this);
  }

  componentDidMount() {
    const { channel, api } = this.props;
    channel.on(ADD_PAGE_EVENT, x => this.onAddPage(x.space, x.title));

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => this.onAddPage());
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel } = this.props;
    channel.removeListener(ADD_PAGE_EVENT, this.onAddPage);
  }

  onAddPage(space, title) {
    if (space && title) {
      const url = `/confluence/spaces/${encodeURIComponent(space)}/pages/${encodeURIComponent(title)}`;
      fetch(url)
        .then(response => response.text())
        .then(text => this.setState({ text }));
    } else {
      this.setState({ text: '' });
    }
  }

  render() {
    const { text } = this.state;

    /* eslint-disable react/no-danger */
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
    /* eslint-enable react/no-danger */
  }
}

ConfluencePage.propTypes = {
  channel: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  api: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
