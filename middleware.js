const fetch = require('node-fetch')
const tranform = require('./transformer')

module.exports = function buildConfluenceMiddleware(rootUri, username, password) {
  return function(router) {
    router.get('/confluence/spaces/:space/pages/:title', (req, res) => {
      const url = rootUri + '/rest/api/content?expand=body.view&spaceKey=' + encodeURIComponent(req.params.space) + '&title=' + encodeURIComponent(req.params.title)

      const options = {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
        }
      }

      fetch(url, options)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          if (json && json.results && json.results.length) {
            Buffer.from(json.results[0].body.view.value)
              .pipe(tranform(rootUri))
              .pipe(res)
          }
          else {
            res.end()
          }
        })
    })
  }
}