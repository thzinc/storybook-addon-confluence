Confluence integration with Storybook
=====================================

This addon for [storybook](https://storybooks.js.org) ([source](https://github.com/storybooks/storybook)) enables you to add Atlassian Confluence pages to your stories.

Usage
-----

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

Thanks
======

Thanks to [@bendrucker](https://github.com/bendrucker) for [absoluteify](https://github.com/bendrucker/absoluteify), which provided a great reference for using the trumpet package to convert relative paths in HTML into absolute paths.
