var fetch = require('node-fetch');
var Readable = require('stream').Readable;
var absoluteify = require('absoluteify')

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
            var stream = new Readable();
            stream.push(json.results[0].body.view.value);
            stream.push(null);
            stream
              .pipe(absoluteify(rootUri))
              .pipe(res);
          }

          res.end();
        });
    });
  }
}