import React from 'react';
import addons from '@kadira/storybook-addons'; // eslint-disable-line import/no-extraneous-dependencies
import ConfluencePage from './ConfluencePage';
import { PREFIX } from './constants';

addons.register(`${PREFIX}`, (api) => {
  addons.addPanel(`${PREFIX}/panel`, {
    title: 'Confluence',
    render: () => (
      <ConfluencePage
        channel={addons.getChannel()}
        api={api}
      />
    ),
  });
});
