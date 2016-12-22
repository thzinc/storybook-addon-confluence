var addons = require('@kadira/storybook-addons').default;
var ADD_PAGE_EVENT = require('./constants').ADD_PAGE_EVENT;

module.exports = function WithConfluencePage(props) {
  var channel = addons.getChannel();

  channel.emit(ADD_PAGE_EVENT, {
    space: props.space,
    title: props.title
  });

  return props.children;
}
