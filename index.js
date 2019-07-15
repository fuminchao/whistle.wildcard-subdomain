const dns = require('dns');
const {URL} = require('url');

const cached = {};

function resolveName(tokens) {
  console.log(tokens);
  const url = tokens.join('.');
  return cached[url] = cached[url] || new Promise((resolve, reject) => {

    if (tokens.length === 0) {
      reject();
    }

    dns.lookup(url, (err, addr) => {
      if (!err) {
        console.log(url + ' => ' + addr);
        resolve([url, addr]);
      } else {
        resolve(resolveName(tokens.slice(1)));
      }
    });
  });
}

exports.rulesServer = (server, options) => {

  server.on('request', (req, res) => {

    res.on('error', function() {});

    resolveName(new URL('http://' + req.headers['host']).hostname.split('.')).then(([name, ip]) => {

      res.end(JSON.stringify({
        rules: '**.' + name + ' host://' + ip
      }));
    }).catch((err) => res.end());
  });
};
