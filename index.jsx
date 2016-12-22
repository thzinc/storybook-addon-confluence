import addons from '@kadira/storybook-addons'; // eslint-disable-line import/no-extraneous-dependencies
import { ADD_PAGE_EVENT } from './constants';

export default function WithConfluencePage(props) {
  const channel = addons.getChannel();
  const { children, space, title } = props;

  channel.emit(ADD_PAGE_EVENT, { space, title });

  return children;
}
