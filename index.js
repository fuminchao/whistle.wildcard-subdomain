const dns = require('dns');

const cached = {};

function resolveName(tokens) {

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

    //console.log(req.originalReq.ruleValue);

    resolveName(req.headers['host'].split('.')).then(([name, ip]) => {

      res.end(JSON.stringify({
        rules: '**.' + name + ' host://' + ip
      }));
    }).catch((err) => res.end());
  });
};
