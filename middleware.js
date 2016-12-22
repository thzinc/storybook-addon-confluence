var fetch = require('node-fetch');

module.exports = function buildConfluenceMiddleware(rootUri, username, password) {
  return function(router) {
    router.get('/confluence/spaces/:space/pages/:title', (req, res) => {
      var url = rootUri + '/rest/api/content?expand=body.view&spaceKey=' + encodeURIComponent(req.params.space) + '&title=' + encodeURIComponent(req.params.title);

      var options = {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        }
      };

      fetch(url, options)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          if (json && json.results && json.results.length) {
            res.send('<html><head><base href="' + rootUri + '"/></head><body>' + json.results[0].body.view.value + '</body></html>');
          }

          res.end();
        });
    });
  }
}