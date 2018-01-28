# Confluence integration with Storybook

This addon for [storybook](https://storybooks.js.org) ([source](https://github.com/storybooks/storybook)) enables you to add Atlassian Confluence pages to your stories.

## Quickstart

### Add middleware

In `.storybook/middleware.js`:

```
var buildConfluenceMiddleware = require('storybook-addon-confluence/middleware');

module.exports = buildConfluenceMiddleware('https://example.atlassian.net/wiki', 'username', 'super-secure_password');

```

### Register add-on

In `.storybook/addons.js`:

```
import '@kadira/storybook/addons';

import 'storybook-addon-confluence/register';
```

### Use in stories

Use `<WithConfluencePage />` element in a story:

```
import { WithConfluencePage } from 'storybook-addon-confluence';

storiesOf('ExampleComponent', module)
  .add('Default', () => (
    <WithConfluencePage space="SPACE" title="Example component">
      <ExampleComponent />
    </WithConfluencePage>
  ));
```

Or use a decorator for all of the stories:

```
import { confluencePageDecorator } from 'storybook-addon-confluence';

storiesOf('ExampleComponent', module)
  .addDecorator(confluencePageDecorator('SPACE', 'Example component'))
  .add('Default', () => <ExampleComponent />);
```

## Building

[![npm](https://img.shields.io/npm/v/storybook-addon-confluence.svg)](https://www.npmjs.com/package/storybook-addon-confluence)

If you're working locally, you can use `npm link` with this and your consuming project to do your work. There's no transpilation or prepublish step, so changes are pretty transparent.

## Code of Conduct

We are committed to fostering an open and welcoming environment. Please read our [code of conduct](CODE_OF_CONDUCT.md) before participating in or contributing to this project.

## Contributing

We welcome contributions and collaboration on this project. Please read our [contributor's guide](CONTRIBUTING.md) to understand how best to work with us.

## License and Authors

[![Daniel James logo](https://secure.gravatar.com/avatar/eaeac922b9f3cc9fd18cb9629b9e79f6.png?size=16) Daniel James](https://github.com/thzinc)

[![license](https://img.shields.io/github/license/thzinc/storybook-addon-confluence.svg)](https://github.com/thzinc/storybook-addon-confluence/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/thzinc/storybook-addon-confluence.svg)](https://github.com/thzinc/storybook-addon-confluence/graphs/contributors)

This software is made available by Daniel James under the MIT license.

Thanks to [@bendrucker](https://github.com/bendrucker) for [absoluteify](https://github.com/bendrucker/absoluteify), which provided a great reference for using the trumpet package to convert relative paths in HTML into absolute paths.